import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const json = (status: number, message: string) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const verifyRecaptcha = async (token: string, ip?: string | null) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    return { ok: false, message: "Missing RECAPTCHA_SECRET_KEY." };
  }

  const params = new URLSearchParams();
  params.set("secret", secret);
  params.set("response", token);
  if (ip) {
    params.set("remoteip", ip);
  }

  const response = await fetch(
    "https://www.google.com/recaptcha/api/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    },
  );

  if (!response.ok) {
    return { ok: false, message: "Unable to verify reCAPTCHA." };
  }

  const payload = (await response.json()) as {
    success?: boolean;
    score?: number;
    action?: string;
  };

  if (!payload.success) {
    return { ok: false, message: "reCAPTCHA verification failed." };
  }
  if (payload.action && payload.action !== "contact") {
    return { ok: false, message: "reCAPTCHA action mismatch." };
  }
  if (typeof payload.score === "number" && payload.score < 0.5) {
    return { ok: false, message: "reCAPTCHA score too low." };
  }

  return { ok: true, score: payload.score, action: payload.action };
};

export async function POST(request: Request) {
  let body: {
    fromName?: string;
    fromEmail?: string;
    message?: string;
    recaptchaToken?: string;
  } = {};

  try {
    body = (await request.json()) as typeof body;
  } catch {
    return json(400, "Invalid request.");
  }

  const fromName = String(body.fromName ?? "").trim();
  const fromEmail = String(body.fromEmail ?? "").trim();
  const message = String(body.message ?? "").trim();
  const recaptchaToken = String(body.recaptchaToken ?? "").trim();

  if (!fromEmail || !message || !recaptchaToken) {
    return json(400, "Missing required fields.");
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const recaptcha = await verifyRecaptcha(recaptchaToken, ip);
  if (!recaptcha.ok) {
    return json(400, recaptcha.message ?? "reCAPTCHA verification failed.");
  }

  const region = process.env.AWS_REGION || process.env.SES_REGION || "";
  const fromAddress = process.env.CONTACT_FROM_EMAIL || "";
  const toAddress = process.env.CONTACT_TO_EMAIL || fromAddress;

  if (!region || !fromAddress || !toAddress) {
    return json(500, "Email service is not configured.");
  }

  const ses = new SESClient({ region });
  const subject = "New contact form submission";
  const textBody = `Name: ${fromName || "N/A"}\nEmail: ${fromEmail}\n\nMessage:\n${message}`;
  const htmlBody = `
    <p><strong>Name:</strong> ${fromName || "N/A"}</p>
    <p><strong>Email:</strong> ${fromEmail}</p>
    <p><strong>Message:</strong></p>
    <pre style="font-family: inherit; white-space: pre-wrap;">${message}</pre>
  `;

  try {
    await ses.send(
      new SendEmailCommand({
        Source: fromAddress,
        Destination: { ToAddresses: [toAddress] },
        ReplyToAddresses: [fromEmail],
        Message: {
          Subject: { Data: subject, Charset: "UTF-8" },
          Body: {
            Text: { Data: textBody, Charset: "UTF-8" },
            Html: { Data: htmlBody, Charset: "UTF-8" },
          },
        },
      }),
    );
  } catch (error) {
    const message =
      error instanceof Error && error.message
        ? `SES error: ${error.message}`
        : "Unable to send email.";
    return json(502, message);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

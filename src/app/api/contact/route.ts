const json = (status: number, message: string) =>
  new Response(JSON.stringify({ message }), {
    status,
    headers: { "Content-Type": "application/json" },
  });

const getEmailConfig = () => ({
  serviceId:
    process.env.EMAIL_SERVICE_ID ??
    process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID ??
    "",
  templateId:
    process.env.EMAIL_TEMPLATE_ID ??
    process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID ??
    "",
  publicKey:
    process.env.EMAIL_PUBLIC_KEY ??
    process.env.NEXT_PUBLIC_EMAIL_PUBLIC_KEY ??
    "",
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

  const { serviceId, templateId, publicKey } = getEmailConfig();
  if (!serviceId || !templateId || !publicKey) {
    return json(500, "Email service is not configured.");
  }

  const emailPayload = {
    service_id: serviceId,
    template_id: templateId,
    user_id: publicKey,
    template_params: {
      fromName,
      fromEmail,
      message,
    },
  };

  const emailResponse = await fetch(
    "https://api.emailjs.com/api/v1.0/email/send",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailPayload),
    },
  );

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text().catch(() => "");
    const message = errorText
      ? `Email service error: ${errorText}`
      : "Unable to send email.";
    return json(502, message);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

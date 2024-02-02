export const Header = () => {
  return (
    <header>
      <div
        className="w-full bg-cover bg-center"
        style={{
          height: "40rem",
          backgroundImage:
            "url(https://d1ta48eu7x3n0t.cloudfront.net/header_image.webp)",
          backgroundSize: "cover",
        }}
      >
        <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-10">
          <div className="text-center">
            <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">
              Knights of Zalantha
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

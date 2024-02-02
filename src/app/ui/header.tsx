export const Header = () => {
  return (
    <header>
      <div
        className="w-full bg-cover bg-center"
        style={{
          height: "40rem",
          backgroundImage:
            "url(https://cdn.midjourney.com/08247bbf-ba55-4945-a811-c141998935dd/0_2.webp)",
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

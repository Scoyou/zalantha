export const Footer = () => {
  return (
    <footer className="bg-darkWood border-black border-2 rounded py-3 text-center metamorphous-regular flex flex-col md:flex-row justify-between items-center">
      <div className="md:flex md:items-center">
        <p className="text-amber-100 md:mb-0">© 2023. All rights reserved.</p>
        <p className="text-xs text-amber-100 md:mb-0 md:ml-2">
          Favicon by{" "}
          <a href="https://icons8.com" className="text-amber-100">
            Icons 8
          </a>
        </p>
      </div>
      <div className="flex justify-center items-center md:ml-auto">
        <a
          href="https://www.facebook.com/groups/1575524973263344/"
          className="text-amber-100 mr-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
    </footer>
  );
};

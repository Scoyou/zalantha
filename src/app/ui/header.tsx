export const Header = () => {
    return (
        <header>
            <nav className="bg-amber-100 border-brown-600 border-2 rounded py-3 text-center metamorphous-regular sticky top-0 shadow">
                <ul className="flex justify-center space-x-4">
                    <li><a href="#home" className="text-brown-800 hover:text-amber-600">About</a></li>
                    <li><a href="#about" className="text-brown-800 hover:text-amber-600">History</a></li>
                    <li><a href="#services" className="text-brown-800 hover:text-amber-600">Rules</a></li>
                    <li><a href="#contact" className="text-brown-800 hover:text-amber-600">Contact</a></li>
                    <li><a href="#contact" className="text-brown-800 hover:text-amber-600">Get Started</a></li>
                </ul>
            </nav>

            <div className="w-full bg-cover bg-center" style={{ height: '40rem', backgroundImage: 'url(https://cdn.midjourney.com/08247bbf-ba55-4945-a811-c141998935dd/0_2.webp)', backgroundPosition: '00px -400px', backgroundSize: 'cover' }}>
                <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-50">
                    <div className="text-center">
                        <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Knights of Zalanthia</h1>
                        <button className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm uppercase font-medium rounded hover:bg-blue-500 focus:outline-none focus:bg-blue-500">Get Started</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
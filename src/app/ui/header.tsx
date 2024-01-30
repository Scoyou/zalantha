export const Header = () => {
    return (
        <header>
            <div className="w-full bg-cover bg-center" style={{ height: '40rem', backgroundImage: 'url(https://cdn.midjourney.com/08247bbf-ba55-4945-a811-c141998935dd/0_2.webp)', backgroundPosition: '00px -400px', backgroundSize: 'cover' }}>
                <div className="flex items-center justify-center h-full w-full bg-gray-900 bg-opacity-10">
                    <div className="text-center">
                        <h1 className="text-white text-2xl font-semibold uppercase md:text-3xl">Knights of Zalanthia</h1>
                        <button className="mt-4 px-4 py-2 bg-slate-800 text-amber-100 hover:text-amber-600 text-sm uppercase font-medium rounded focus:shadow-outline">Get Started</button>
                    </div>
                </div>
            </div>
        </header>
    );
}
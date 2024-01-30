
export const NavBar = () => {
    return (
        <nav className="bg-slate-800 border-black border-2 rounded py-3 text-center metamorphous-regular sticky top-0 shadow">
            <ul className="flex justify-center space-x-4">
                <li><a href="/" className="text-amber-100 hover:text-amber-600">Home</a></li>
                <li><a href="/history" className="text-amber-100 hover:text-amber-600">History</a></li>
                <li><a href="/rules" className="text-amber-100 hover:text-amber-600">Rules</a></li>
                <li><a href="/contact" className="text-amber-100 hover:text-amber-600">Contact</a></li>
                <li><a href="/get-started" className="text-amber-100 hover:text-amber-600">Get Started</a></li>
            </ul>
        </nav>
    )
}

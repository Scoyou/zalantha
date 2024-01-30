export const Footer = () => {
    return (
        <footer className="bg-slate-800 border-black border-2 rounded py-3 text-center metamorphous-regular flex flex-col md:flex-row justify-between items-center">
            <p className="text-amber-100 mb-3 md:mb-0">© 2023. All rights reserved.</p>
            <div className="flex justify-center items-center">
                <a href="#" className="text-amber-100 mr-2">Facebook</a>
                <a href="#" className="text-amber-100 mr-2">Twitch</a>
                <a href="#" className="text-amber-100">Instagram</a>
            </div>
        </footer>
    );
}

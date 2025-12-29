
export const Nav = () => {
    return (
        <nav className="fixed top-0 w-full z-50 px-8 py-8 flex justify-between items-center bg-transparent">
            <div className="font-medium text-lg tracking-tighter text-black dark:text-white"><a href="/">GhostLink!</a></div>
            <a href="https://github.com/kazedevs/ghostlink" className="hover:text-black dark:hover:text-white transition-colors">Github</a>
        </nav>
    );
};  
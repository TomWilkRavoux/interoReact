import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
        navigate(`/search?query=${query}`);
        }
    };

    // Fonction pour basculer le menu
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
    };

return (
        <header className="bg-gray-900 text-white p-4 shadow-md w-full">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <Link to={`/`}> <h1 className="text-2xl font-bold text-blue-500">MyMealApp</h1></Link>
            <button
                onClick={handleMenuToggle}
                className="text-white focus:outline-none sm:hidden"
            >
                {isMenuOpen ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16m-7 6h7"
                    />
                    </svg>
                )}

            </button>
            <nav
                className={`${
                isMenuOpen ? "block" : "hidden"
                } sm:flex sm:items-center sm:space-x-6 sm:static sm:bg-transparent sm:p-0 bg-gray-800 p-4 rounded-lg absolute top-16 left-0 right-0 z-50`}
            >
                <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 mr-8">
                    <li><Link to="/" className="px-4 text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700">Home</Link></li>
                    <li><Link to="/categories" className="px-4 text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700">Catégories</Link></li>
                    <li><Link to="/random" className="px-4 text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700">Plat Aléatoire</Link></li>
                </ul>
                <form
                    onSubmit={handleSearch}
                    className="mt-4 sm:mt-0 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-2"
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Rechercher une recette"
                        className="w-full sm:w-64 px-3 py-2 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300">
                        Rechercher
                    </button>
                </form>
            </nav>
        </div>
        </header>
    );
}

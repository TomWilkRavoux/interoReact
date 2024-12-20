import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [query, setQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

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
            <div className="flex justify-between items-center mx-auto px-4">
                <div className="flex justify-start items-center flex-1 flex-shrink-0">
                    <Link to="/">
                        <h1 className="text-2xl font-bold text-blue-500">MyMealApp</h1>
                    </Link>
                </div>
                <button
                    onClick={handleMenuToggle}
                    className="bg-gray-800 text-white focus:outline-none sm:hidden flex-shrink-0"
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
                <div className="hidden sm:flex sm:flex-1 sm:justify-end ">
                    <nav
                        className="hidden sm:flex sm:flex-1 sm:justify-end"
                    >
                        <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 mr-0 sm:mr-8">
                            <li>
                                <Link
                                    to="/"
                                    className="px-4 text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/categories"
                                    className="px-4 text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700"
                                >
                                    Catégories
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/random"
                                    className="px-4 text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700"
                                >
                                    Plat Aléatoire
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:justify-end">
                    <form
                        onSubmit={handleSearch}
                        className="hidden sm:flex mt-4 sm:mt-0 flex-col items-center sm:space-y-2"
                    >
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Rechercher une recette"
                            className="w-full sm:w-48 lg:w-52 px-3 py-2 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                        >
                            Rechercher
                        </button>
                    </form>
                </div>
                    {isMenuOpen && (
                        <div className="sm:hidden bg-gray-800 p-4 rounded-lg absolute top-16 left-0 right-0 z-50">
                            <ul className="flex flex-col space-y-4">
                                <li>
                                    <Link
                                        to="/"
                                        className="text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700"
                                    >
                                        Home
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/categories"
                                        className="text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700"
                                    >
                                        Catégories
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/random"
                                        className="text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700"
                                    >
                                        Plat Aléatoire
                                    </Link>
                                </li>
                            </ul>
                            {/* Barre de recherche mobile */}
                            <form
                                onSubmit={handleSearch}
                                className="mt-4 flex flex-col space-y-2"
                            >
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Rechercher une recette"
                                    className="w-full px-3 py-2 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                                >
                                    Rechercher
                                </button>
                            </form>
                        </div>
            )}
            </div>
        </header>
    );
}

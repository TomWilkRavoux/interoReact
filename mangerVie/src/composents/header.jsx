import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
        navigate(`/search?query=${query}`);
        }
    };

return (
        <header className="bg-gray-900 text-white p-4 shadow-md w-full">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <h1 className="text-2xl font-bold text-blue-500">MyMealApp</h1>
            <nav>
            <ul className="flex space-x-6">
                <li><Link to="/" className="text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700">Home</Link></li>
                <li><Link to="/categories" className="text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700">Catégories</Link></li>
                <li><Link to="/random" className="text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-700">Plat Aléatoire</Link></li>
            </ul>
            </nav>
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Rechercher une recette"
                    className="px-3 py-2 rounded-full text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                    Rechercher
                </button>
            </form>
        </div>
        </header>
    );
}

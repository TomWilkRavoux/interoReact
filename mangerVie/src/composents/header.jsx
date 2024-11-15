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
        <header className="bg-blue-600 text-white p-4 shadow-md w-full">
        <div className="flex justify-between items-center max-w-7xl mx-auto px-4">
            <h1 className="text-xl font-bold">MyMealApp</h1>
            <nav>
            <ul className="flex space-x-4">
                <li><Link to="/" className="text-purple-200 hover:text-purple-600">Home</Link></li>
                <li><Link to="/categories" className="text-purple-200 hover:text-purple-600">Catégories</Link></li>
                <li><Link to="/random" className="text-purple-200 hover:text-purple-600">Plat Aléatoire</Link></li>
            </ul>
            </nav>
            <form onSubmit={handleSearch} className="flex items-center space-x-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher une recette"
                className="px-2 py-1 rounded text-white"
            />
            <button type="submit" className="bg-white text-blue-600 px-2 py-1 rounded hover:bg-gray-200">
                Rechercher
            </button>
            </form>
        </div>
        </header>
    );
}

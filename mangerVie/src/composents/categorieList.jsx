import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CategorieList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")                                    // Appel API pour récupérer les catégories
        .then(response => response.json())
        .then(data => setCategories(data.meals))
        .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
    }, []);

    if (!categories.length) return <p>Chargement...</p>;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-blue-400 text-center">Liste des Catégories</h1>
                <ul className="space-y-4">
                {categories.map((category, index) => (
                    <li key={index} className="text-lg font-semibold text-gray-300 bg-gray-700 p-4 rounded-lg shadow-md hover:bg-gray-600 hover:text-blue-400 transition duration-300">
                        <Link to={`/category/${category.strCategory}`} className="block w-full"> 
                            {category.strCategory}
                        </Link>
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

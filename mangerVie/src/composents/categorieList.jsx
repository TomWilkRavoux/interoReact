import React, { useEffect, useState } from 'react';

export default function CategorieList() {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        // Appel API pour récupérer les catégories
        fetch("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then(response => response.json())
        .then(data => setCategories(data.meals))
        .catch(error => console.error("Erreur lors de la récupération des catégories :", error));
    }, []);

    if (!categories.length) return <p>Chargement...</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">Liste des Catégories</h1>
                <ul className="list-disc pl-6 text-black">
                {categories.map((category, index) => (
                    <li key={index} className="text-lg mb-2 text-black">
                    {category.strCategory}
                    </li>
                ))}
                </ul>
            </div>
        </div>
    );
}

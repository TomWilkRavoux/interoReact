import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CategoryRecipes() {
    const { category } = useParams();                                                       // Récupère le nom de la catégorie depuis l'URL
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)           // Appel API pour récupérer les recettes par catégorie
        .then(response => response.json())
        .then(data => setRecipes(data.meals))
        .catch(error => console.error("Erreur lors de la récupération des recettes :", error));
    }, [category]);

    if (!recipes.length) return <p>Chargement...</p>;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <div className="max-w-6xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-blue-400 text-center">
                Recettes pour la catégorie "{category}"
                </h1>
                <div className="grid grid-cols-3 gap-8">
                {recipes.map((meal) => (
                    <div key={meal.idMeal}  className="bg-gray-700 border border-gray-600 p-4 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-48 object-cover rounded-lg mb-4 shadow-md"
                    />
                    <h2 className="text-lg font-semibold text-blue-300 text-center mb-2">{meal.strMeal}</h2>
                    <Link
                        to={`/recipe/${meal.idMeal}`}
                        className="block text-center bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Voir les détails
                    </Link>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function CategoryRecipes() {
    const { category } = useParams();                                                       // Récupère le nom de la catégorie depuis l'URL
    const [recipes, setRecipes] = useState([]);
    const [randomMeal, setRandomMeal] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden'; // Empêche le défilement
        } else {
            document.body.style.overflow = 'auto'; // Réactive le défilement
        }

        // Nettoie le style au démontage
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isPopupOpen]);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)           // Appel API pour récupérer les recettes par catégorie
        .then(response => response.json())
        .then(data => setRecipes(data.meals))
        .catch(error => console.error("Erreur lors de la récupération des recettes :", error));
    }, [category]);

    if (!recipes.length) return <p>Chargement...</p>;


      // Fonction pour générer un Random Meal
    const handleRandomMeal = () => {
        if (recipes.length > 0) {
        const randomIndex = Math.floor(Math.random() * recipes.length);
        setRandomMeal(recipes[randomIndex]); // Sélectionne un plat au hasard
        setIsPopupOpen(true); //
        }
    };

    const closePopup = () => {
        setIsPopupOpen(false); // Cache la pop-up
        setRandomMeal(null); // Réinitialise les données du plat aléatoire
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-6xl mx-auto bg-gray-800 p-4 sm:p-6 lg:p-8 rounded-lg shadow-lg">
                <h1 className="text-4xl sm:text-4xl font-bold mb-4 sm:mb-6 lg:mb-8 text-blue-400 text-center">
                Recettes pour la catégorie "{category}"
                </h1>
                <div className="text-right mb-4">
                    <button
                        onClick={handleRandomMeal}
                        className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                        Random Meal
                    </button>
                </div>
                {isPopupOpen && randomMeal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-xs sm:max-w-md w-full relative overflow-y-auto">
                            <button
                                onClick={closePopup}
                                className="absolute top-2 right-2 text-gray-300 hover:text-white text-sm p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-200"
                            >
                                ✖
                            </button>
                            <button
                                onClick={handleRandomMeal}
                                className="absolute top-2 left-2 text-gray-300 hover:text-white text-sm p-1 rounded-full bg-gray-700 hover:bg-gray-600 transition duration-200"
                            >
                                ↻
                            </button>
                            <div className="mb-6 sm:mb-8 p-3 sm:p-4 bg-gray-700 rounded-lg shadow-lg">
                                <h2 className="text-lg sm:text-xl font-bold text-blue-300 text-center">
                                    Plat Aléatoire : {randomMeal.strMeal}
                                </h2>
                                <img
                                    src={randomMeal.strMealThumb}
                                    alt={randomMeal.strMeal}
                                    className="w-full h-36 sm:h-48 object-cover rounded-lg mb-4"
                                />
                                <Link
                                    to={`/recipe/${randomMeal.idMeal}`}
                                    className="block text-center bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-full hover:bg-blue-700 transition duration-300"
                                >
                                    Voir les détails du plat
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
                {recipes.map((meal) => (
                    <div key={meal.idMeal}  className="bg-gray-700 border border-gray-600 p-4 rounded-lg shadow-lg hover:scale-105 transform transition duration-300">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-lg mb-4 shadow-md"
                    />
                    <h2 className="text-lg sm:text-xl font-semibold text-blue-300 text-center mb-2">{meal.strMeal}</h2>
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

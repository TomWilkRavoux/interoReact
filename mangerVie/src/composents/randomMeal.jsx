import React, { useEffect, useState } from 'react';

export default function RandomMeal() {
    const [meal, setMeal] = useState(null);

    const fetchRandomMeal = () => {
            fetch("https://www.themealdb.com/api/json/v1/1/random.php")                                         // Appel API pour récupérer un plat aléatoire
            .then(response => response.json())
            .then(data => setMeal(data.meals[0]))
            .catch(error => console.error("Erreur lors de la récupération du plat aléatoire :", error));

    }
    useEffect(() => {
        fetchRandomMeal();
    }, []);
    useEffect(() => {
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")                                         // Appel API pour récupérer un plat aléatoire
        .then(response => response.json())
        .then(data => setMeal(data.meals[0]))
        .catch(error => console.error("Erreur lors de la récupération du plat aléatoire :", error));
    }, []);

    if (!meal) return <p>Chargement...</p>;

    return (
        <div className="bg-gray-900 text-white min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                <h1 className="text-4xl font-bold mb-6 text-blue-400 text-center">
                Plat Aléatoire : {meal.strMeal}
                </h1>
                <img
                    src={meal.strMealThumb}
                    alt={meal.strMeal}
                    className="w-full max-w-lg mx-auto h-auto rounded-lg mb-6 shadow-md"
                />
                <p className="text-lg mb-4"><strong className="text-blue-400">Catégorie :</strong> {meal.strCategory}</p>
                <p className="text-lg mb-4"><strong className="text-blue-400">Origine :</strong> {meal.strArea}</p>
                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Instructions</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">{meal.strInstructions}</p>

                <h2 className="text-2xl font-semibold mb-4 text-blue-400">Ingrédients</h2>
                <ul className="hover:text-blue-400 transition duration-300">
                {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
                    const ingredient = meal[`strIngredient${num}`];
                    const measure = meal[`strMeasure${num}`];
                    return ingredient ? (
                    <li key={num}>{measure} {ingredient}</li>
                    ) : null;
                })}
                </ul>

                {/* Vidéo si disponible */}
                {meal.strYoutube && (
                <div className="mt-6">
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">Vidéo</h2>
                    <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-bold hover:text-blue-700 transition duration-300"
                    >
                    Regarder sur YouTube
                    </a>
                </div>
                )}
                <div className="mt-8 text-center">
                    <button
                        onClick={fetchRandomMeal}
                        className="bg-violet-600 text-white px-6 py-2 rounded-full hover:bg-purple-950 transition duration-300"
                    >
                        Charger un autre plat
                    </button>
                </div>
            </div>
        </div>
    );
    }

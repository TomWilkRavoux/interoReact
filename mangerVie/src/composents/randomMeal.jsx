import React, { useEffect, useState } from 'react';

export default function RandomMeal() {
    const [meal, setMeal] = useState(null);

    useEffect(() => {
        // Appel API pour récupérer un plat aléatoire
        fetch("https://www.themealdb.com/api/json/v1/1/random.php")
        .then(response => response.json())
        .then(data => setMeal(data.meals[0]))
        .catch(error => console.error("Erreur lors de la récupération du plat aléatoire :", error));
    }, []);

    if (!meal) return <p>Chargement...</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">
                Plat Aléatoire : {meal.strMeal}
                </h1>
                <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="w-full max-w-lg mx-auto h-auto rounded-lg mb-6"
                />
                <p className="text-lg mb-4 text-black"><strong>Catégorie :</strong> {meal.strCategory}</p>
                <p className="text-lg mb-4 text-black"><strong>Origine :</strong> {meal.strArea}</p>
                <h2 className="text-2xl font-semibold mb-4 text-black">Instructions</h2>
                <p className="text-gray-700 mb-6 ">{meal.strInstructions}</p>

                {/* Liste des ingrédients */}
                <h2 className="text-2xl font-semibold mb-4 text-black">Ingrédients</h2>
                <ul className="list-disc pl-6 text-black">
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
                    <h2 className="text-2xl font-semibold mb-4">Vidéo</h2>
                    <a
                    href={meal.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 font-bold"
                    >
                    Regarder sur YouTube
                    </a>
                </div>
                )}
            </div>
        </div>
    );
    }

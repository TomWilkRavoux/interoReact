import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function IngredientRecipes() {
    const { ingredient } = useParams();                                                             // Récupère le nom de l'ingrédient depuis l'URL
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`)                 // Appel API pour récupérer les recettes par ingrédient
        .then(response => response.json())
        .then(data => setRecipes(data.meals))
        .catch(error => console.error("Erreur lors de la récupération des recettes :", error));
    }, [ingredient]);

    if (!recipes.length) return <p>Chargement...</p>;

    return (
        <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-black text-center">
                Recettes avec l'ingrédient "{ingredient}"
                </h1>
                <div className="grid grid-cols-3 gap-6">
                {recipes.map((meal) => (
                    <div key={meal.idMeal} className="recipe-card border p-4 rounded-lg shadow-lg">
                    <img
                        src={meal.strMealThumb}
                        alt={meal.strMeal}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                    />
                    <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                    <Link
                        to={`/recipe/${meal.idMeal}`}
                        className="text-blue-500 font-bold mt-2 inline-block"
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

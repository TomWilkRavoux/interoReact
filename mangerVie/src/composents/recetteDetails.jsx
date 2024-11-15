import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function RecipeDetails() {
    const { id } = useParams();                                                             // Récupère l'ID de la recette depuis l'URL
    const [recipe, setRecipe] = useState(null);

    useEffect(() => {
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)                 // Appel à l'API pour récupérer les détails de la recette
        .then(response => response.json())
        .then(data => setRecipe(data.meals[0]))                  // On récupère la première recette
        .catch(error => console.error("Erreur lors de la récupération des détails :", error));
    }, [id]);

    if (!recipe) return <p>Chargement...</p>;                   // Si données pas encore chargées

    return (
            <div className="bg-gray-100 min-h-screen p-6">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl text-black font-bold mb-4">{recipe.strMeal}</h1>
                <img
                    src={recipe.strMealThumb}
                    alt={recipe.strMeal}
                    className="w-full max-w-lg h-auto rounded-lg mb-6 mx-auto"
                />
                <p className="text-lg mb-4"><strong>Catégorie :</strong> {recipe.strCategory}</p>
                <p className="text-lg mb-4"><strong>Origine :</strong> {recipe.strArea}</p>
                <h2 className="text-2xl font-semibold mb-4">Instructions</h2>
                <p className="text-gray-700 mb-6">{recipe.strInstructions}</p>
        
                {/* Affichage des ingrédients */}
                <h2 className="text-2xl text-black font-semibold mb-4">Ingrédients</h2>
                <ul className="list-disc text-black pl-6">
                    {Array.from({ length: 20 }, (_, i) => i + 1)                    // On parcourt les ingrédients
                    .map((num) => {
                        const ingredient = recipe[`strIngredient${num}`];
                        const measure = recipe[`strMeasure${num}`];
                        return ingredient ? (
                        <li key={num}>
                            {measure} {ingredient}
                        </li>
                        ) : null;
                    })}
                </ul>

                {recipe.strYoutube && (
                    <div className="mt-6">
                        <h2 className="text-2xl font-semibold mb-4">Vidéo</h2>
                        <a
                            href={recipe.strYoutube}
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

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
            <div className="bg-gray-900 text-white min-h-screen p-6">
                <div className="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-bold mb-6 text-blue-400 text-center">{recipe.strMeal}</h1>
                    <img
                        src={recipe.strMealThumb}
                        alt={recipe.strMeal}
                        className="w-full max-w-lg mx-auto h-auto rounded-lg mb-6 shadow-md"
                    />
                    <p className="text-lg mb-4"><strong className="text-blue-400">Catégorie :</strong> {recipe.strCategory}</p>
                    <p className="text-lg mb-4"><strong className="text-blue-400">Origine :</strong> {recipe.strArea}</p>
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">Instructions</h2>
                    <p className="text-gray-300 mb-6 leading-relaxed">{recipe.strInstructions}</p>
            
                    {/* Affichage des ingrédients */}
                    <h2 className="text-2xl font-semibold mb-4 text-blue-400">Ingrédients</h2>
                    <ul className="list-decimal pl-6 space-y-2 text-gray-300">
                        {Array.from({ length: 20 }, (_, i) => i + 1)                    // On parcourt les ingrédients
                        .map((num) => {
                            const ingredient = recipe[`strIngredient${num}`];
                            const measure = recipe[`strMeasure${num}`];
                            return ingredient ? (
                            <li key={num} className="hover:text-blue-400 transition duration-300">
                                {measure} {ingredient}
                            </li>
                            ) : null;
                        })}
                    </ul>

                    {recipe.strYoutube && (
                        <div className="mt-6">
                            <h2 className="text-2xl font-semibold mb-4 text-blue-400">Vidéo</h2>
                            <a
                                href={recipe.strYoutube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 font-bold hover:text-blue-700 transition duration-300"
                            >
                                Regarder sur YouTube
                            </a>
                        </div>
                    )}
                </div>
            </div>
    );
    }

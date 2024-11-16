import React, { useEffect, useState } from 'react';
import {Link, useLocation } from 'react-router-dom';
import Header from './header';


export default function SearchResults() {
    const [results, setResults] = useState([]);
    const location = useLocation();


    const query = new URLSearchParams(location.search).get('query');                        // Récupérer la requête de recherche depuis l'URL

    useEffect(() => {
        if (query) {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
            .then(response => response.json())
            .then(data => setResults(data.meals || []))
            .catch(error => console.error("Erreur lors de la recherche :", error));
        }
    }, [query]);

    return (
        <div>
            <div className="p-6 bg-gray-900 text-white min-h-screen">
                    <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">Résultats de recherche pour "{query}"</h1>
                    <div className="grid grid-cols-3 gap-6">
                        {results.length > 0 ? (
                        results.map((meal) => (
                            <div key={meal.idMeal}  className="bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300">
                                <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover" />
                                <div className="p-4 text-center">
                                    <h2 className="text-lg font-semibold text-blue-300">{meal.strMeal}</h2>
                                    <Link to={`/recipe/${meal.idMeal}`} className="mt-2 inline-block bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
                                        Voir les détails
                                    </Link>
                                </div>
                            </div>
                        ))
                        ) : (
                        <p className="text-center text-gray-400 col-span-3">Aucun résultat trouvé.</p>
                        )}
                    </div>
                    </div>
        </div>
        
    );
}

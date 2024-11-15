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
            <Header/>
            <div className="p-6 bg-gray-900 min-h-screen">
                    <h1 className="text-3xl font-bold text-center mb-6">Résultats de recherche pour "{query}"</h1>
                    <div className="grid grid-cols-3 gap-6">
                        {results.length > 0 ? (
                        results.map((meal) => (
                            <div key={meal.idMeal} className="border p-4 rounded-lg shadow-lg">
                            <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-40 object-cover rounded-lg mb-4" />
                            <h2 className="text-lg font-semibold">{meal.strMeal}</h2>
                            <Link to={`/recipe/${meal.idMeal}`} className="text-blue-500 font-bold mt-2 inline-block">
                                Voir les détails
                            </Link>
                            </div>
                        ))
                        ) : (
                        <p className="text-center text-gray-700 col-span-3">Aucun résultat trouvé.</p>
                        )}
                    </div>
                    </div>
        </div>
        
    );
}

import React, { useEffect, useState } from 'react';
import { getPokemons } from '../services/pokemonService';
import Card from './card';
import '../styles/pokemonList.css'
import { TypeTag } from './typeTag';



export function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState(null);

    const compteurPokemons = 1;


    
    useEffect(() => {
    const loadPokemons = async () => {
        setLoading(true);
        const newPokemons = await getPokemons(compteurPokemons, 50);
        setPokemons((prev) => [...prev, ...newPokemons]);
        setLoading(false);
    };

    loadPokemons();
    }, [compteurPokemons]);


    // function filterByType(){
    // return pokemons.filter(pokemon => pokemon.types[0].type.name === selectedType);
    // }

    const filteredByType = selectedType ? pokemons.filter(pokemon => pokemon.types[0].type.name === selectedType) : pokemons;

    const presentTagArray = [];

    function showingPresentTags(){
        for (let i = 0; i < filteredByType.length; i++){
            const pokemonType = filteredByType[i].types[0].type.name;
            if (!presentTagArray.find(tag => tag === pokemonType))
                presentTagArray.push(pokemonType);
        }
        console.log(presentTagArray);
    }
    showingPresentTags();


    return (
    <div>
        <h2 className="grid-title title">Pokémons</h2>
        <div className="grid-header">
            <div className="sub-grid-header grid-header-left"></div>
            <div className="tags-container sub-grid-header grid-header-center">
            <span class="icon material-symbols-outlined">
            tag
            </span>
        {presentTagArray.map((pokemonTag, index) => (
            <TypeTag 
            key={index} 
            type={pokemonTag} 
            onClickFunction={(type) => setSelectedType(type)} 
            ></TypeTag>
        ))}
        { selectedType && (
            <button 
        className='tag is-medium is-light is-hovered'
        onClick={() => setSelectedType(null)}
        >
            <span class="icon material-symbols-outlined">
            close
            </span>
        </button>)
        }
        </div>
            <div className="sub-grid-header grid-header-right">
                <div class="select is-small">
                    <select>
                        <option>25</option>
                        <option>50</option>
                        <option>75</option>
                        <option>100</option>
                    </select>
                </div>
            </div>
        </div>
        
        <div className="cards-container">
        {filteredByType.map((poke, index) => (
            <Card 
            key={index} 
            pokemon={poke}
            onClickFunction={(type) => setSelectedType(type)} 
             ></Card>
        ))}
        </div>
        {loading && <p>Chargement...</p>}
    </div>
    );
}

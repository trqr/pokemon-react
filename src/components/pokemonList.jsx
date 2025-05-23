import React, { useEffect, useState } from 'react';
import { getPokemons } from '../services/pokemonService';
import Card from './card';
import '../styles/pokemonList.css'
import { TypeTag } from './typeTag';
import Pagination from './pagination';



export function PokemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState(null);
    const [nbDePokemonParPage, setNbPokemonParPage] = useState(25);
    const [compteurPokemons, setCompteurPokemons] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);



    
    useEffect(() => {
    const loadPokemons = async () => {
        setLoading(true);
        const newPokemons = await getPokemons(compteurPokemons, nbDePokemonParPage);
        setPokemons(newPokemons);
        setLoading(false);
    };

    loadPokemons();
    }, [compteurPokemons]);


    // function filterByType(){
    // return pokemons.filter(pokemon => pokemon.types[0].type.name === selectedType);
    // }

    const filteredByType = selectedType ? pokemons.filter(pokemon => pokemon.types[0].type.name === selectedType).slice(0, nbDePokemonParPage) : pokemons.slice(0, nbDePokemonParPage);

   
    const presentTagArray = [];

    function showingPresentTags(){
        for (let i = 0; i < pokemons.length; i++){
            const pokemonType = pokemons[i].types[0].type.name;
            if (!presentTagArray.find(tag => tag === pokemonType))
                presentTagArray.push(pokemonType);
        }
        console.log(presentTagArray);
    }
    
    showingPresentTags();

    const handleChange = (e) => {
        setNbPokemonParPage(e.target.value);
    }



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
                    <select value={nbDePokemonParPage} onChange={handleChange}>
                        <option value="">Select</option>
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                        <option value="200">200</option>
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
        <Pagination />
    </div>
    );
}

export default PokemonList;

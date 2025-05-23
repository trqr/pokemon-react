
const baseApiUrl = "https://pokeapi.co/api/v2/";

async function getData(pokemonId) {
    const result = await fetch(`${baseApiUrl}/pokemon/${pokemonId}`);
    return result.json();
}

export async function getPokemons(compteurPokemons, nbDePokemonParPage) {
    const promises = [];
  for (let i = 0; i < 500; i++) {
    promises.push(getData(compteurPokemons))
    compteurPokemons++;
  }
  return await Promise.all(promises)
}


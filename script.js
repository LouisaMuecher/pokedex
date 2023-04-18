async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/charmander';
    let response = await fetch(url);
    let currentPokemon = await response.json(); // nur einmal aufrufen
    console.log('Loaded pokemon', currentPokemon);
  
    renderPokemonInfo(currentPokemon);
  }
  
  function renderPokemonInfo(pokemon) {
    document.getElementById('pokemonName').innerHTML = pokemon.name; // verwenden Sie die pokemon-Parameter
    document.getElementById('pokemonImage').src = pokemon.sprites.other.dream_world.front_default;
  }
  
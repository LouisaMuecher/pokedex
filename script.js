const pokeContainer = document.getElementById('pokeContainer');
const pokemonNumber = 150;
const colors = {
	fire: '#F75131',
	grass: '#7BCE52',
	electric: '#FFC532',
	water: '#58ABF6',
	ground: '#D6B55A',
	rock: '#BCA55A',
	fairy: '#E4A5E5',
	poison: '#B45AA4',
	bug: '#ADBD20',
	dragon: '#7B62E7',
	psychic: '#FF72A5',
	flying: '#9CACF5',
	fighting: '#A35139',
	normal: '#ADA594'
};

const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonNumber; i++) {
        await getPokemon(i);
    }
}

const getPokemon = async id => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`
    const res = await fetch(url);
    const pokemon = await res.json();
    createPokemonCard(pokemon);
}

fetchPokemons();

function createPokemonCard(pokemon) {
    const pokemonElement = document.createElement('div');
    pokemonElement.classList.add('pokemon');

    const pokemonTypes = pokemon.types.map(element => element.type.name);
    const type = mainTypes.find(type => pokemonTypes.indexOf(type) > -1);
    const name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);
    const color = colors[type];

    pokemonElement.style.backgroundColor = color;

    const pokemonInnerHTML = `
        <span class="pokemonId"># ${pokemon.id.toString()
            .padStart(3, '0')}</span>
            <img class="pokeball" src="img/ball_transparent.png">
        <div class="imgContainer">
            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png">
        </div>
        <div class="pokemonInfo">
            <h3 class="pokemonName">${name}</h3>
            <small class="pokemonType">${pokemonTypes}</small>
        </div>
        
    `;

    pokemonElement.innerHTML = pokemonInnerHTML;

    pokeContainer.appendChild(pokemonElement);
}

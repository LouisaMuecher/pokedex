const url = 'https://pokeapi.co/api/v2/pokemon/';
let allPokemon = [];


async function loadPokemon() {
    document.getElementById('pokemonContainer').innerHTML += '';
    for (let i = 0; i < 300; i++) { 
        const pokemon_url = url + (i + 1);
        let response = await fetch(pokemon_url);
        let current = await response.json();
        allPokemon.push(current);
        renderPokemonInfo(i);
    }
}


function searchPokemon() {
    let search = document.getElementById('input').value;
    search = search.toLowerCase();
    document.getElementById('pokemonContainer').innerHTML = '';
    for (let i = 0; i < allPokemon.length; i++) {
        if (allPokemon[i]['name'].toLowerCase().includes(search)) {
            renderPokemonInfo(i);
        }
    }
}


function renderPokemonInfo(i) {
        document.getElementById('pokemonContainer').innerHTML += templateCreateField(i);
        document.getElementById('pokemonName' + i).innerHTML = allPokemon[i]['name'];
        document.getElementById('pokemonImg' + i).src = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
        for (let j = 0; j < allPokemon[i]['types'].length; j++) {
            document.getElementById('pokemonAttribut' + i).innerHTML += templateFieldAttribute(i, j);
        }
}


function renderPokemonCard(i) {
    openDialog(i);
    loadCardHeader(i);
    loadCardInfo(i);
}


function openDialog(i) {
    let dialogBg = document.getElementById('dialogBg');
    dialogBg.innerHTML = '';
    dialogBg.classList.remove('d-none');
    dialogBg.innerHTML = templateCreateCard(i);
    document.body.classList.add('overflow-hidden');
}


function loadCardHeader(i) {
    let pokemonName = document.getElementById('cardName' + i);
    let pokemonImage = document.getElementById('cardImg' + i);
    let pokemonAttribut = document.getElementById('cardAttribut' + i);
    pokemonName.innerHTML = allPokemon[i]['name'];
    pokemonImage.src = allPokemon[i]['sprites']['other']['dream_world']['front_default'];
    for (let j = 0; j < allPokemon[i]['types'].length; j++) {
        pokemonAttribut.innerHTML += templateCardAttribute(i, j);
    }
}


function loadCardInfo(i) {
    let stats = allPokemon[i]['stats'];
    for (let k = 0; k < stats.length; k++) {
        if (stats[k]['base_stat'] < 50) {
            loadRedBar(stats[k]);
        }
        else {
            loadGreenBar(stats[k]);
        }
    }
}


function loadRedBar(stat) {
    let pokemonInfo = document.getElementById('cardInfo');
    pokemonInfo.innerHTML += templateCardInfo(stat);
}


function loadGreenBar(stat) {
    let pokemonInfo = document.getElementById('cardInfo');
    pokemonInfo.innerHTML += templateCardInfo(stat);
}


function closeDialog() {
    document.getElementById('dialogBg').classList.add('d-none');
    document.body.classList.remove('overflow-hidden');
}


function templateCreateField(i) {
    return `
    <div id="pokedex-${i}" class="pokedex bg-${allPokemon[i]['types'][0]['type']['name']}" onclick="renderPokemonCard(${i})">
        <div>
            <h2 id="pokemonName${i}" class="pokemonName"></h2>
            <div id="pokemonAttribut${i}" class="pokemonAttributContainer"></div>
        </div>
        <img id="pokemonImg${i}" class="pokemonImg">
    </div>
    `;
}


function templateFieldAttribute(i, j) {
    return `
    <div class="pokemonAttribut" id="pokemonAttribut${i}-${j}">
    ${allPokemon[i]['types'][j]['type']['name']}
    </div>
    `;
}


function templateCreateCard(i) {
    return `
    <div id="dialog-${i}" class="dialog bg-${allPokemon[i]['types'][0]['type']['name']}">
        <img id="cardImg${i}" class="cardImg">
        <div class="cardHeader">
            <h2 id="cardName${i}" class="cardName"></h2>
            <div id="cardAttribut${i}" class="cardAttributContainer"></div>
        </div>
        <div id="cardInfo" class="infoContainer">

        </div>
    </div>
    `;
}


function templateCardAttribute(i, j) {
    return `
    <div class="cardAttribut" id="cardAttribut${i}-${j}">
    ${allPokemon[i]['types'][j]['type']['name']}
    </div>
    `;
}


function templateCardInfo(stats, color) {
    return `
        <div class="infoItem">
            <div>${stats['stat']['name']}:</div>
            <div class="infoDiagram">
                <div class="infoDiagramBar" style="width: ${stats['base_stat'] * 0.8}%;">
                    ${stats['base_stat']}
                </div>
            </div>
        </div>
    `;
}
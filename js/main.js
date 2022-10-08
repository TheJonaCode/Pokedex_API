const pokemonContainer = document.querySelector('.pokemon__container');
const spinner = document.querySelector('#spinner');

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
            /*Spinner oculto*/
            spinner.style.display = "none";
        });
}

function fetchPokemons(number) {
    /*Spinner se muestra*/
    spinner.style.display = "block";
    for (let i = 1; i <= number; i++) {
        fetchPokemon(i);
    }
}

function showPokemon() {
    const cardPokemon = document.createElement('div');
    cardPokemon.classList.add('pokemon__bio');
    const infoPokemon = document.createElement('div');
    infoPokemon.classList.add('pokemon__information');
    cardPokemon.appendChild(infoPokemon);
    pokemonContainer.appendChild(cardPokemon);
};

function createPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon__block');
    card.addEventListener("click", showPokemon);
    //Contenedor imagen
    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img__container');
    //Imagen
    const sprite = document.createElement('img');
    sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const number = document.createElement('p');
    number.classList.add('pokemon__id');
    //ID con 3 ceros al principio
    number.textContent = `#${pokemon.id.toString().padStart(3,0)}`;

    const name = document.createElement('p');
    name.classList.add('name');
    name.textContent = pokemon.name;

    card.appendChild(number);
    card.appendChild(spriteContainer);
    card.appendChild(name);

    pokemonContainer.appendChild(card);
}

fetchPokemons(9);
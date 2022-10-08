const pokemonContainer = document.querySelector('.pokemon__container');
const spinner = document.querySelector('#spinner');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');

/*Rango de pokemons a llamar*/
let offset = 1;
let limit = 8;

previous.addEventListener("click", () => {
    /*offset 1 es la primer pantalla*/
    if (offset != 1) {
        offset -= 9;
        removeChildNodes(pokemonContainer);
        fetchPokemons(offset, limit);
    }
});

next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokemonContainer);
    fetchPokemons(offset, limit);
});

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
            /*Spinner oculto*/
            spinner.style.display = "none";
        });
}

function fetchPokemons(offset, limit) {
    /*Spinner se muestra*/
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++) {
        fetchPokemon(i);
    }
}

function createPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon__block');
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

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);
const pokemonContainer = document.querySelector('.pokemon__container');

function fetchPokemon(id) {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then((res) => res.json())
        .then((data) => {
            createPokemon(data);
        });
}

function fetchPokemons(number) {
    for (let i = 1; i <= number; i++) {
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

fetchPokemons(9);
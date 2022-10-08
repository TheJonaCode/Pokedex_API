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
    /*Efecto flip card*/
    const flipCard = document.createElement('div');
    flipCard.classList.add('flip__card');

    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card__container');

    flipCard.appendChild(cardContainer);

    /*Cards Pokemons*/
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

    const cardBack = document.createElement('div');
    cardBack.classList.add('pokemon__block__back');
    cardBack.appendChild(progressBars(pokemon.stats));

    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack)
    pokemonContainer.appendChild(flipCard);
}

function progressBars(stats) {
    const statsContainer = document.createElement('div');
    statsContainer.classList.add('stats__container')

    for (let i = 0; i < 3; i++) {
        const stat = stats[i];

        const statPercent = stat.base_stat / 2 + "%";
        const statContainer = document.createElement('div');
        statContainer.classList.add('stat__container')

        const statName = document.createElement('div');
        statName.classList.add('stat__name')
        statName.textContent = stat.stat.name;

        const progress = document.createElement("div");
        progress.classList.add("progress");

        const progressBar = document.createElement('div');
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat);
        progressBar.setAttribute("aria-valuemin", 0);
        progressBar.setAttribute("aria-valuemax", 200);
        progressBar.style.width = statPercent;

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }

    return statsContainer;
}

function removeChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit);
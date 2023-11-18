async function fetchData(url) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

  function displayPokemon(pokemon) {
   
  const pokemonListDiv = document.getElementById('pokemonList');
  const card = document.createElement('div');
  card.classList.add('pokemon-card');
  const name = document.createElement('h2');
  name.textContent = pokemon.name;
  name.style.textTransform = 'capitalize'
  card.appendChild(name);
  const image = document.createElement('img');
  image.src = pokemon.sprites.front_default;
  image.alt = pokemon.name;
  image.style.width = '60%'
  card.appendChild(image);

  // Display the types when hovering
const typeLabel = document.createElement('div');
typeLabel.classList.add('type-label');
typeLabel.textContent = `Type: ${pokemon.types.map(type => type.type.name).join(', ')}`;
typeLabel.style.display = 'block'; // Initially hidden
card.appendChild(typeLabel);

const grassType = pokemon.types.some(type => type.type.name === 'grass' );
const waterType = pokemon.types.some(type => type.type.name === 'water');
const flyType = pokemon.types.some(type => type.type.name === 'flying');
const bugType = pokemon.types.some(type => type.type.name === 'bug');
const fireType = pokemon.types.some(type => type.type.name === 'fire');
const normalType = pokemon.types.some(type => type.type.name === 'normal');
const electricType = pokemon.types.some(type => type.type.name === 'electric');
const poisonType = pokemon.types.some(type => type.type.name === 'poison');
const groundType = pokemon.types.some(type => type.type.name === 'ground');
const fairyType = pokemon.types.some(type => type.type.name === 'fairy');
const fightingType = pokemon.types.some(type => type.type.name === 'fighting');
const psychicType = pokemon.types.some(type => type.type.name === 'psychic');
const ghostType = pokemon.types.some(type => type.type.name === 'ghost');
const rockType = pokemon.types.some(type => type.type.name === 'rock');
const darkType = pokemon.types.some(type => type.type.name === 'dark');

if (grassType) {
  card.style.background = 'linear-gradient(90deg, rgba(4, 131, 27, 1), rgba(196, 237, 199, 1))';
} else if (waterType) {
  card.style.background = 'linear-gradient(90deg, rgba(11, 61, 208, 1), rgba(108, 188, 231, 1))';
}else if (flyType) {
  card.style.background = 'linear-gradient(90deg, rgba(237, 238, 240, 1), rgba(178, 218, 239, 1))';
}else if (bugType){
  card.style.background = 'linear-gradient(90deg, rgba(4, 131, 27, 1), rgba(196, 237, 199, 1))';
}else if (fireType) {
  card.style.background = 'linear-gradient(90deg, rgba(239, 141, 148, 0.91), rgba(124, 1, 1, 1))'
}else if (normalType){
  card.style.background = 'linear-gradient(90deg, rgba(233, 228, 229, 0.07), rgba(195, 193, 193, 1))'
}else if (electricType){
  card.style.background = 'linear-gradient(90deg, rgba(219, 226, 9, 1), rgba(246, 253, 210, 1))'
}else if (groundType){
  card.style.background = 'linear-gradient(90deg, rgba(179, 159, 2, 1), rgba(91, 88, 88, 1))'
}else if (poisonType){
  card.style.background = 'linear-gradient(90deg, rgba(59, 188, 8, 1), rgba(91, 88, 88, 1))'
}else if (fairyType){
  card.style.background = 'linear-gradient(90deg, rgba(248, 64, 157, 1), rgba(240, 233, 233, 1))'
}else if (fightingType){
  card.style.background = 'linear-gradient(90deg, rgba(247, 64, 64, 1), rgba(140, 135, 135, 1))'
}else if (rockType){
  card.style.background = 'linear-gradient(90deg, rgba(160, 155, 4, 1), rgba(122, 97, 2, 1))'
}else if (psychicType){
  card.style.background = 'linear-gradient(90deg, rgba(42, 42, 41, 1), rgba(37, 36, 222, 1))'
  card.style.color = 'white'
  typeLabel.style.color ='white'
}else if (ghostType){
  card.style.background = 'linear-gradient(90deg, rgba(4, 4, 3, 1), rgba(103, 103, 117, 1))'
  card.style.color = 'white'
  typeLabel.style.color ='white'
}else if (darkType){
  card.style.background = 'linear-gradient(90deg, rgba(101, 3, 142, 1), rgba(103, 103, 117, 1))'
}




// Event listener for hover
card.addEventListener('mouseenter', function() {

});

card.addEventListener('mouseleave', function() {

});

card.addEventListener('click', function() {
  navigateToPokemonDetails(pokemon.id);
});

pokemonListDiv.appendChild(card);
  }
  
  function navigateToPokemonDetails(pokemonId) {
    window.location.href = `pokemon-details.html?id=${pokemonId}`;
  }
  
  async function loadPokemons(offset, limit) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    const data = await fetchData(apiUrl);
    return data.results;
  }
  
  async function displayPokemons(offset, limit) {
    const pokemonListDiv = document.getElementById('pokemonList');
    pokemonListDiv.innerHTML = ''; // Clear previous results
    const pokemons = await loadPokemons(offset, limit);
    pokemons.forEach(async (pokemon) => {
      const pokemonDetails = await fetchData(pokemon.url);
      displayPokemon(pokemonDetails);
    });
  }
  
  function handlePagination(page) {
    const limit = 20; // Number of Pokémon per page
    const offset = (page - 1) * limit;
    displayPokemons(offset, limit);
  }
  
  // Initial display
  handlePagination(1);
  
  // Display pagination links
  const paginationDiv = document.getElementById('pagination');
  for (let i = 1; i <= 10; i++) { // Assuming 10 pages for demonstration
    const pageLink = document.createElement('a');
    pageLink.href = '#';
    pageLink.textContent = i;
    pageLink.addEventListener('click', function() {
      handlePagination(i);
    });
    paginationDiv.appendChild(pageLink);
  }
  
  // Function to search for a specific Pokémon
  async function searchPokemon() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.toLowerCase();
  
    // Fetch data for the specific Pokémon
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${searchTerm}/`;
    const pokemonData = await fetchData(pokemonUrl);
  
    // Clear previous results
    const pokemonListDiv = document.getElementById('pokemonList');
    pokemonListDiv.innerHTML = '';
  
    // Display the searched Pokémon
    if (pokemonData.name) {
      displayPokemon(pokemonData);
    } else {
      alert('Pokemon not found.');
    }
  }
  
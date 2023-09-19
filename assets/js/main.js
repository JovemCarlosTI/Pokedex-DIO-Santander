const pokemonList = document.getElementById('pokemon-list')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 5
let offset = 0

// Limita até a primeira geração de pokemons
const maxRecords = 151


function loadPokemonItens(offset, limit) {
	function convertPokemonToHTML(pokemon) {
		return `
	 <li class="pokemon ${pokemon.type}">
					<span class="number">#${pokemon.number}</span>
					<span class="name">${pokemon.name}</span>
	
					<div class="detail">
						<ol class="types">${pokemon.types.map(type => `<li class="type ${type}">${type}</li>`).join('')}
						</ol>
					
						<img src="${pokemon.photo}" alt="${pokemon.name}">
					</div>
			  </li>`
	}
	
	pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
		pokemonList.innerHTML += pokemons.map(convertPokemonToHTML).join('')
	})
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
	offset += limit

	const qtdRecordNextPage = offset + limit
	
	if (qtdRecordNextPage >= maxRecords) {
		const newLimit = maxRecords - offset
		loadPokemonItens(offset, newLimit)

		loadMoreButton.parentElement.removeChild(loadMoreButton)
		return
	}
	
	loadPokemonItens(offset, limit)
})
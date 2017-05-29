var pokeApp = {}	

//starter pokemon
var starterPokemon = [1, 4, 7, 25];

pokeApp.init = function() {
	//this is where you intialize or "call" the functions
	pokeApp.clickStarter();
	pokeApp.refreshPage();
	pokeApp.clickPokeball();
}

//get pokemon from the database
pokeApp.getPokemon = function(id, parentClass) {							
	var getPokemon = $.ajax({
		url: 'http://proxy.hackeryou.com',
		method: 'GET',
		dataType: 'json',
		data: {
			reqUrl: `https://pokeapi.co/api/v2/pokemon/${id}`,
			useCache: true
		}
	})
	//when you get the pokemon from the database, then pull the information by id
	$.when(getPokemon)	 
		.then(function(pokemon){
			let sprite = pokemon.sprites.front_default
			let name = pokemon.name
			let id = pokemon.id
			let height = pokemon.height * 10
			let weight = pokemon.weight / 10 
			let type = pokemon.types[0].type.name

			var imageContainer = $("<div class= pokeimage></div>");
			var infoContainer = $("<div class= pokeinfo></div>");
			var pokeImg = $('<img>').attr('src', sprite);
			var pokeName = $('<p>').addClass('name').text('Name: ' + name);
			var pokeId = $('<p>').addClass('id').text('ID: ' + id);
			var pokeHeight = $('<p>').addClass('height').text('HT: ' + height + "cm");
			var pokeWeight = $('<p>').addClass('weight').text('WT: ' + weight + "kg");
			var pokeType = $('<p>').addClass('type').text('Type: ' + type);
			var pokeInfo = $('<div>').addClass('pokeinfo')
			$(parentClass).css({"display": "flex", "text-align": "left", "background-color": "#fff"})
			
			imageContainer.append(pokeImg)
			infoContainer.append(pokeName, pokeId, pokeHeight, pokeWeight, pokeType)
			parentClass.append(imageContainer, infoContainer)
			pokeApp.getPokemonDescription(id, parentClass);
	});
}

//get description of chosen pokemon (starter or other 5 party members)
pokeApp.getPokemonDescription = function(id, parentClass) {							
	var getPokemonDescription = $.ajax({
		url: 'http://proxy.hackeryou.com',
		method: 'GET',
		dataType: 'json',
		data: {
			reqUrl: `https://pokeapi.co/api/v2/pokemon-species/${id}`,
			useCache: true
		}
	})
	$.when(getPokemonDescription)
		.then(function(pokemon){
			let description = pokemon.flavor_text_entries[52].flavor_text
			var descriptionContainer = $("<div class= pokemon-description></div>")
			var pokeDescription = $('<p>').addClass('description').text(description);
			descriptionContainer.append(pokeDescription)
			parentClass.append(descriptionContainer)
		});
}

//user clicks on starter pokeball and one of the following pokemon comes out (Bulbasaur, Charmander, Squritle, Pikachu)
pokeApp.clickStarter = function () {
	$(".pokeball").on("click", function() {
		var starter = starterPokemon[Math.floor(Math.random() * starterPokemon.length)];
		$(this).children().hide()
		var pokeBall = $(this);
		pokeApp.getPokemon(starter, pokeBall);
	});
};

//user clicks on one of the "round out your team" pokeballs and gets a random pokemon (1-151)
pokeApp.clickPokeball = function () {
	$(".other").on("click", function() {
		var randomPokemon = Math.floor(Math.random() * 151) + 1;
		$(this).children().hide();
		var parentClass = $(this);
		$(parentClass).css({"display": "flex", "text-align": "left", "background-color": "#fff"})
		pokeApp.getPokemon(randomPokemon, parentClass);
	});
};

//display the "data-class" of the pokeball that is clicked on
pokeApp.displayInfo = function(pokemon) {
	console.log(pokemon)
	$(".other").on('click', function(){
		var selectedBall = $(this).data('ball');
	});
}

//refreshes the page when the user clicks on the "Pokemon" logo
pokeApp.refreshPage = function() {
	$('#home').click(function() {
    	location.reload();
	});
}

function aud_play_pause() {
  	var myAudio = document.getElementById("myAudio");
  	if (myAudio.paused) {
    	myAudio.play();
  	} else {
    	myAudio.pause();
  	}
}

//document ready
$(function(){
	pokeApp.init();													
});
var topics = ["dog", "cat", "eagle", "The Lion King"];

// Generic function for capturing the movie name from the data-attribute
function alertTopicName() {
	var topic = $(this).attr('data-name');
	console.log(topic);
}
// Function for displaying movie data
function renderButtons() {
	// Deleting the movies prior to adding new movies
	// (this is necessary otherwise we will have repeat buttons)
	$("#buttonArea").empty();
	// Looping through the array of movies
	for (var i = 0; i < topics.length; i++) {
		// Then dynamicaly generating buttons for each movie in the array
		// This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
		var a = $("<button>");
		// Adding a class
		a.addClass("topic");
		// Added a data-attribute
		a.attr("data-name", topics[i]);
		// Provided the initial button text
		a.text(topics[i]);
		// Added the button to the HTML
		$("#buttonArea").append(a);
	}
}

// This function handles events where one button is clicked
$("#submit").on("click", function (event) {
	event.preventDefault();

	// This line grabs the input from the textbox
	var topic = $("#topicInput").val().trim();

	// The movie from the textbox is then added to our array
	topics.push(topic);

	// Calling renderButtons which handles the processing of our movie array
	renderButtons();
});


// Calling the renderButtons function to display the intial buttons
renderButtons();







$(document).on("click", ".topic", function () {
	$('#gifArea').empty();
	var topic = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
		topic + "&api_key=dc6zaTOxFJmzC&limit=10";

	$.ajax({
		url: queryURL,
		method: "GET"
	})
		.then(function (response) {
			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var gifDiv = $("<div class='item'>");

				var rating = results[i].rating;

				var p = $("<p>").text("Rating: " + rating);

				var thisGif = $("<img>");
				var stillImage = results[i].images.fixed_height_still.url;
				var onImage = results[i].images.fixed_height.url;
				thisGif.attr("data-still", stillImage);
				thisGif.attr("data-animate", onImage);
				thisGif.attr("src", stillImage);
				thisGif.attr("data-state", 'still');
				thisGif.attr("class", 'gif');
				gifDiv.prepend(p);
				gifDiv.prepend(thisGif);

				$("#gifArea").prepend(gifDiv);
			}
		});
});

$(document).on("click", ".gif", function () {
	if ($(this).attr('data-state') == 'still') {
		$(this).attr('src', $(this).attr('data-animate'));
		$(this).attr('data-state', 'active')
	}
	else if ($(this).attr('data-state') == 'active') {
		$(this).attr('src', $(this).attr('data-still'));
		$(this).attr('data-state', 'still')
	}
});
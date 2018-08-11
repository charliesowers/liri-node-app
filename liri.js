require("dotenv").config();

var keys = require("./keys.js");

var Spotify = require('node-spotify-api');

var request = require("request");

var fs = require("fs");

var command = process.argv[2];

if(command === 'my-tweets'){

}

else if(command === 'spotify-this-song'){
    spotifyThis(process.argv[3]);
    
}

else if(command === 'movie-this'){
    movieThis(process.argv[3]);
}

else if(command === 'do-what-it-says'){
    fs.readFile("random.txt", "utf8", function(error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
          return console.log(error);
        }
      
        var dataArr = data.split(",");

        var command2 = dataArr[0];

        var arg = dataArr[1].replace('"',"");

        if(command2 === 'my-tweets'){

        }

        else if(command2 === 'spotify-this-song'){
            spotifyThis(arg);
            
        }

        else if(command2 === 'movie-this'){
            movieThis(arg);
        }
    });
}

function spotifyThis(song){
    var title = '';
    if(song == null){
        title = 'The Sign'
    }
    else{
        title = song;
    }

    var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: title }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Artist Name: " + data.tracks.items[0].artists.name); 
        console.log("Preview: " + data.tracks.items[0].preview_url); 
        console.log("Album Name: " + data.tracks.items[0].album.name);
    });

}

function movieThis(movie){
    var title = '';
    if(movie == null){
        title = 'Signs'
    }
    else{
        title = movie;
    }

    var queryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";

    request(queryURL, function (error, response, body) {
        var bodyObj = JSON.parse(body);
        console.log("Title: " + bodyObj.Title); //Title of the movie.
        console.log("Year: " + bodyObj.Year); // Year the movie came out.
        console.log("IMBD Rating: " + bodyObj.Ratings[0].Value);//IMDB Rating of the movie.
        console.log("RT Rating: " + bodyObj.Ratings[1].Value);//Rotten Tomatoes Rating of the movie.
        console.log("Country: " + bodyObj.Country);//Country where the movie was produced.
        console.log("Language: " + bodyObj.Language); //Language of the movie.
        console.log("Plot: " + bodyObj.Plot); //Plot of the movie.
        console.log("Actors: " + bodyObj.Actors); //Actors in the movie.

    });
}

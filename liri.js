require("dotenv").config();

var keys = require("./keys.js");

var command = process.argv[2];

if(command === 'my-tweets'){

}

else if(command === 'spotify-this-song'){

    var Spotify = require('node-spotify-api');
 
    var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
    });
    
    spotify.search({ type: 'track', query: process.argv[3] }, function(err, data) {
    if (err) {
        return console.log('Error occurred: ' + err);
    }
    
    console.log("Song Name: " + data.tracks.items[0].name);
    console.log("Artist Name: " + data.tracks.items[0].artists.name); 
    console.log("Preview: " + data.tracks.items[0].preview_url); 
    console.log("Album Name: " + data.tracks.items[0].album.name); 
});
    
}

else if(command === 'movie-this'){
    
}

else if(command === 'do-what-it-says'){
    
}

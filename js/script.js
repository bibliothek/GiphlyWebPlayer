var video, gifContainer, htmlTracks;

window.onload = function () {
    // called when the page has been loaded
    video = document.querySelector("#myVideo");
    gifContainer = document.querySelector('#gif-container');

    // Get the tracks as HTML elements*/
    htmlTracks = document.querySelectorAll("track");
    getTrack(htmlTracks[0], readContent);
};

function setGif(searchTerm) {
    var searchTermArray = searchTerm.split(" ");
    var searchKey = "";

    for (i = 0; i < searchTermArray.length; i++) {
        if (i > 0) {
            searchKey = searchKey.concat("+");
        }
        searchKey = searchKey.concat(searchTermArray[i]);
    }

    var searchUri = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=".concat(searchKey);

    var giphy = $.getJSON(searchUri, function (data) {
        var imageUrl = data.data.image_url;
        gifContainer.innerHTML = '<left><img src = "' + imageUrl + '"  title="GIF via Giphy"></left>'
    })
}

function readContent(track) {
    console.log("adding cue change listener to loaded track...");


    track.addEventListener("cuechange", function (e) {
        var cue = this.activeCues[0];
        if (cue !== undefined)
            setGif(cue.text);
    });

    video.play();

}

function getTrack(htmlTrack, callback) {
    var textTrack = htmlTrack.track;


    if (htmlTrack.readyState === 2) {
        console.log("text track already loaded");
        callback(textTrack);
    } else {
        // will force the track to be loaded
        console.log("Forcing the text track to be loaded");

        textTrack.mode = "hidden";
        htmlTrack.addEventListener('load', function (e) {
            callback(textTrack);
        });
    }
}
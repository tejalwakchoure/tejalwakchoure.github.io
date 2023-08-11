const inputs = document.querySelector(".inputs"),
// hintTag = document.querySelector(".hint span"),
// guessLeft = document.querySelector(".guess-left span"),
// wrongLetter = document.querySelector(".wrong-letter span"),
// resetBtn = document.querySelector(".reset-btn"),
typingInput = document.querySelector(".typing-input");

let answerid, word, maxGuesses, letters = [];
let letterSpaces = [];
let completedSongids = [];

function makeLayout() {
    // let ranItem = wordList[Math.floor(Math.random() * wordList.length)];
    word = document.querySelector(".inputs").id.toLowerCase();
    answerid = word;
    
    let spaceindex = word.indexOf('_') - 1;
    word = word.replace('_', '');
    word = word.replace('\'', '');
    
    maxGuesses = word.length >= 5 ? 8 : 6;
    correctLetters = []; incorrectLetters = [];
    // hintTag.innerText = ranItem.hint;
    // guessLeft.innerText = maxGuesses;
    // wrongLetter.innerText = incorrectLetters;
    
    let html = "";
    for (let i = 0; i < maxGuesses; i++) {
        html += `<div class="row num`+i+`">`;
        for (let j = 0; j < word.length; j++) {
            if(j==spaceindex) {
                html += `<input type="text" style="margin-right: 40px;" disabled>`;
            } else {
                html += `<input type="text" disabled>`;
            }
        }
        html += `</div>`;
    }
    html += `</div>`;
    inputs.innerHTML = html;
    
    
    $(".mejs__button .mejs__playpause-button .mejs__play button").click();
}


function checkGuess() {
    letternum = 0;
    guessnum++;
    
    console.log("letters=",letters);
    console.log("letterSpaces=",letterSpaces);
    
    for (let i=0; i < word.length; i++) {
        if(word.toLowerCase().includes(letters[i])) {
            if(word[i] == letters[i]) {
                letterSpaces[i].style.background = "#F19FE4";
            } else {
                letterSpaces[i].style.background = "rgba(241, 159, 228, 0.33)";
            }
            letterSpaces[i].style.color = "black";
        } else {
            letterSpaces[i].style.color = "gray";
        }
    }
    
    
    
    if(letters.toString() == word) {
        showAnswer();
        // results.style.animation = "fade 0.3s linear";
        html = '<div class="results"> <h5 style="padding-bottom: 2%;">You got it!!</h5> <div class="contain embed-player"> <div class="music-player"> <div class="cover"> <img src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/kygo.png" alt=""> </div> <div class="titre"> <h4>Stole the show</h4> <p>Kygo</p> </div> <a href="javascript:void(0)" class="btn btn-default" data-toggle="tooltip" title="Preview" onclick="aud_play_pause()"><i id="stateicon" class="fa fa-pause"></i></a> <div class="lecteur"> <audio style="width: 100%;" class="fc-media" autoplay="true" id="myTune"> <source src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/kygo-stole-the-show.mp3" type="audio/mp3"/> </audio> </div> </div> </div> </div>';
        // html+=
        // '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/12M5uqx0ZuwkpLp5rJim1a?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
        
        guessnum = maxGuesses;
        // results.innerHTML = html;
        // $(".game-screen").css("background-color", "#F19FE4"); 
        // $(".game-screen").css("color", "white"); 
        
    } else if(guessnum === maxGuesses) {
        let results = document.querySelector(".game-screen .content");
        let html = "<p>Out of moves!</p><p>Check out the answer :)</p>";
        // results.style.animation = "fade 0.3s linear";
        results.innerHTML = html;
    }
    
    letters = [];
    letterSpaces = [];    
}


function makeGuess(e) {   
    let key = e.target.value.toLowerCase();
    
    if(key.match(/^[A-Za-z]+$/) && guessnum < maxGuesses && key!="undefined") { // && !incorrectLetters.includes(` ${key}`) && !correctLetters.includes(key)) {
        space = inputs.querySelectorAll(".num"+guessnum+" input")[letternum]
        space.value = key;
        letternum++;
        letters += key;
        letterSpaces.push(space);
    }
    // guessLeft.innerText = maxGuesses;
    // wrongLetter.innerText = incorrectLetters;
    
    typingInput.value = "";
    if (letternum >= word.length) {
        // timeoutOn = true; 
        setTimeout(() => {
            checkGuess();            
        }, 0);
    }   
}

function handleDeletes(e) {
    if ((e.key === "Backspace" || e.key === "Delete") && letternum > 0) {
        console.log("DELETING");
        
        letternum--;
        letters = letters.slice(0,-1);
        letterSpaces.splice(-1);
        
        space = inputs.querySelectorAll(".num"+guessnum+" input")[letternum]
        space.value = "";
    }
    return false;
}

let letternum = 0;
let guessnum = 0;

function showAnswer() {
    // answerid = "cornelia_street"

    $(".game-screen").fadeOut();
    $(".breakdown-screen").fadeIn();
    
    console.log(answerid);
    completedSongids.push(answerid);
    if(answerid === "cornelia_street")
    {
        // $(".cover-art img").attr('src', '../assets/img/portfolio/streets-songs/cornelia_street.png');
        // $(".breakdown-analysis img").attr('src', '../assets/img/portfolio/streets-songs/cornelia-analysis.svg');
        // $(".breakdown-textdiv p").innerHTML = "In this song, Swift writes about the moments shared with a loved one in an apartment she had rented on the Manhattan street. The location of this apartment is now popular among 'Swiftie' tourists."

        let results = document.querySelector(".breakdown-textdiv");

        let html = '<div class="results container"> <div class="row"> <h5 style="padding-bottom: 2%;">You got it!!</h5> </div> <div class="row"><p> In this song, Swift writes about the moments shared with a lover in an apartment she had rented on the Manhattan street. The location of this apartment is now popular with Swiftie tourists. </p> </div> <div class="row"> <div class="contain embed-player"> <div class="music-player"> <div class="cover"> <img src="../assets/img/portfolio/streets-songs/cornelia_street.png" alt=""> </div> <div class="titre"> <h4>Cornelia Street</h4> <p>Taylor Swift</p> </div> <a class="btn btn-default" data-toggle="tooltip" title="Preview" onclick="aud_play_pause_result()"><i id="stateicon" class="fa fa-pause songicon"></i></a> <div class="lecteur"> <audio style="width: 100%;" class="fc-media" autoplay="true" id="myTune"> <source src="../assets/img/portfolio/streets-songs/cornelia_street.mp3" type="audio/mp3"/> </audio> </div> </div> </div> <div class="breakdown-analysis" style="width: fit-content;height: fit-content;"><img src="../assets/img/portfolio/streets-songs/cornelia-analysis.svg" style="width: auto; height: 350px;"/></div></div> </div>';
        results.innerHTML = html;


        
    } else if (answerid === "brooklyn")
    {
        let results = document.querySelector(".breakdown-textdiv");

        let html = '<div class="results container"> <div class="row"> <h5 style="padding-bottom: 2%;">You got it!!</h5> </div> <div class="row"><p> The Boys highlight their experiences while on tour now that they have made it big. The lyrics of this song describe all the events that make a tour exhausting, but also hype them up and push them to keep moving forward until they reach home base. </p> </div> <div class="row"> <div class="contain embed-player"> <div class="music-player"> <div class="cover"> <img src="../assets/img/portfolio/streets-songs/brooklyn.png" alt=""> </div> <div class="titre"> <h4>No Sleep Till Brooklyn</h4> <p>Beastie Boys</p> </div> <a class="btn btn-default" data-toggle="tooltip" title="Preview" onclick="aud_play_pause_result()"><i id="stateicon" class="fa fa-pause songicon"></i></a> <div class="lecteur"> <audio style="width: 100%;" class="fc-media" autoplay="true" id="myTune"> <source src="../assets/img/portfolio/streets-songs/brooklyn.mp3" type="audio/mp3"/> </audio> </div> </div> </div> <div class="breakdown-analysis" style="width: fit-content;height: fit-content;"><img src="../assets/img/portfolio/streets-songs/brooklyn-analysis.svg" style="width: auto; height: 350px;"/></div></div> </div>';
        results.innerHTML = html;
    } else {
        $(".breakdown-screen").fadeOut();
        $(".map-screen").fadeIn();
        // $(".breakdown-analysis img").attr('src', '../assets/img/portfolio/streets-songs/original-analysis.svg');
    }
    
}


typingInput.addEventListener("input", makeGuess);
typingInput.addEventListener("keydown", handleDeletes);

inputs.addEventListener("click", () => typingInput.focus());
document.addEventListener("keydown", () => typingInput.focus());

var audio = {
    init: function() {
        var $that = this;
        $(function() {
            $that.components.media();
        });
    },
    components: {
        media: function(target) {
            var media = $('audio.fc-media', (target !== undefined) ? target : 'body');
            if (media.length) {
                media.mediaelementplayer({
                    audioHeight: 40,
                    features : ['playpause', 'current', 'duration', 'progress', 'volume', 'tracks', 'fullscreen'],
                    alwaysShowControls: true,
                    timeAndDurationSeparator: '<span></span>',
                    iPadUseNativeControls: true,
                    iPhoneUseNativeControls: true,
                    AndroidUseNativeControls: true
                });
            }
        },
    },
};
audio.init();

function aud_play_pause(e) {
    var audio = document.getElementById("myTunePreview");
    // console.log(audio.paused);
    if (audio.paused) {
        $('.previewicon').removeClass('fa-play');
        $('.previewicon').addClass('fa-pause');
        audio.play();
    } else {
        $('.previewicon').removeClass('fa-pause');
        $('.previewicon').addClass('fa-play');
        audio.pause();
    }
}

function aud_play_pause_result(e) {
    var audio = document.getElementById("myTune");
    // console.log(audio.paused);
    if (audio.paused) {
        $('.songicon').removeClass('fa-play');
        $('.songicon').addClass('fa-pause');
        audio.play();
    } else {
        $('.songicon').removeClass('fa-pause');
        $('.songicon').addClass('fa-play');
        audio.pause();
    }
}


$("#myTunePreview").on("ended", ()=> {
    $('.previewicon').removeClass('fa-pause');
    $('.previewicon').addClass('fa-play');
});


document.querySelector(".previewbtn").addEventListener("click", (e)=> {
    // $(".game-screen").fadeOut();
    // $(".breakdown-screen").fadeIn();    
    aud_play_pause(e);
});

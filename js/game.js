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
    guessnum = 0;
    letternum = 0;
    // letters = [];
    // letterSpaces = [];
    
    let spaceindex1 = word.indexOf('_') - 1;
    word = word.replace('_', '');
    let spaceindex2 = word.lastIndexOf('_') - 1;
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
            if(j==spaceindex1 || j==spaceindex2) {
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
        showAnswer("won");
        // results.style.animation = "fade 0.3s linear";
        // html = '<div class="results"> <h5 style="padding-bottom: 2%;">You got it!!</h5> <div class="contain embed-player"> <div class="music-player"> <div class="cover"> <img src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/kygo.png" alt=""> </div> <div class="titre"> <h4>Stole the show</h4> <p>Kygo</p> </div> <a href="javascript:void(0)" class="btn btn-default" data-toggle="tooltip" title="Preview" onclick="aud_play_pause()"><i id="stateicon" class="fa fa-pause"></i></a> <div class="lecteur"> <audio style="width: 100%;" class="fc-media" autoplay="true" id="myTune"> <source src="https://mariongrandvincent.github.io/HTML-Personal-website/img-codePen/kygo-stole-the-show.mp3" type="audio/mp3"/> </audio> </div> </div> </div> </div>';
        // html+=
        // '<iframe style="border-radius:12px" src="https://open.spotify.com/embed/track/12M5uqx0ZuwkpLp5rJim1a?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>'
        
        guessnum = maxGuesses;
        // results.innerHTML = html;
        // $(".game-screen").css("background-color", "#F19FE4"); 
        // $(".game-screen").css("color", "white"); 
        
    } else if(guessnum === maxGuesses) {
        showAnswer("lost");
        // let results = document.querySelector(".game-screen .content");
        // let html = "<p>Out of moves!</p><p>Check out the answer :)</p>";
        // // results.style.animation = "fade 0.3s linear";
        // results.innerHTML = html;
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
    
    console.log("letternum", letternum);
    console.log("guessnum", guessnum);
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
let memories = ['cornelia_street','coney_island','waverly_place','spanish_harlem','tompkins_square_park']
let makingit = ['rockaway_beach','brooklyn','mulberry_street']
let citylife = ['toms_diner','harlem','washington_heights','central_park','chelsea','bleecker_street','avenue_b']

function disableIncomplete(answerid, themelist, themeid) {
    themelist.forEach(songid => {
        if(completedSongids.indexOf(songid)!=-1)
        return;
        
        document.querySelectorAll("#"+themeid+" g#"+songid+"_tunes g g *").forEach(path => {
            path.style.filter = 'grayscale(1) opacity(0) brightness(0.25)';
            path.classList.remove("blinking");
        });
        
        document.querySelectorAll("#"+themeid+" g#"+songid+"_head *").forEach(path => {
            path.style.filter = 'grayscale(1) opacity(0.75) brightness(0.25)';
            path.classList.remove("shaking-head");
        });
        
        document.querySelectorAll("#"+themeid+" g#"+songid+"_body *").forEach(path => {path.style.filter = 'grayscale(1) opacity(0.75) brightness(0.25)';});
        document.querySelectorAll("#"+themeid+" div#"+songid+" p").forEach(path => {path.style.opacity = 0;});
    });
}

function enableCompleted(answerid, themeid) {
    completedSongids.forEach(songid => {
        document.querySelectorAll("#"+themeid+" g#"+songid+"_tunes g g *").forEach(path => {
            path.style.filter = 'none';
            path.classList.add("blinking");
        });
        document.querySelectorAll("#"+themeid+" g#"+songid+"_head *").forEach(path => {
            path.style.filter = 'none';
            path.classList.add("shaking-head");
        });
        document.querySelectorAll("#"+themeid+" g#"+songid+"_body *").forEach(path => {path.style.filter = 'none';});
        document.querySelectorAll("#"+themeid+" div#"+songid+" p").forEach(path => {path.style.opacity = 1;});
    });    
}

function showAnswer(result) {
    console.log("answer= "+answerid)
    // answerid = "cornelia_street"
    // $(".game-screen").fadeOut();
    // $(".breakdown-screen").fadeIn();
    
    $('.game-screen:visible').fadeOut(500, function() {
        $('.breakdown-screen').fadeIn(500);
    });
    
    if(songids.indexOf(answerid) !== -1) {
        console.log(answerid);
        completedSongids.push(answerid);
        var paths = document.querySelectorAll(".map-screen #"+answerid+" path");
        paths[0].classList.add("song-completed");
        paths[1].classList.add("song-completed");
        
        if(memories.indexOf(answerid)!=-1) {
            document.querySelector("#g-train-memories-box").style.display = 'block';
            document.querySelector("#g-train-makingit-box").style.display = 'none';
            document.querySelector("#g-train-citylife-box").style.display = 'none';
            
            enableCompleted(answerid, "g-train-memories-box");
            disableIncomplete(answerid, memories, "g-train-memories-box");
        } else if(makingit.indexOf(answerid)!=-1) {
            document.querySelector("#g-train-memories-box").style.display = 'none';
            document.querySelector("#g-train-makingit-box").style.display = 'block';
            document.querySelector("#g-train-citylife-box").style.display = 'none';
            
            enableCompleted(answerid, "g-train-makingit-box");
            disableIncomplete(answerid, makingit, "g-train-makingit-box");
        } else {
            document.querySelector("#g-train-memories-box").style.display = 'none';
            document.querySelector("#g-train-makingit-box").style.display = 'none';
            document.querySelector("#g-train-citylife-box").style.display = 'block';
            
            enableCompleted(answerid, "g-train-citylife-box");
            disableIncomplete(answerid, citylife, "g-train-citylife-box");
        }
        
        
        
        let results = document.querySelector(".breakdown-textdiv");
        let message="";
        if(result=="won") {
            message="You got it!"
        }
        else {
            message="Whoops, you're out of moves!"
        }
        if(completedSongids.length==15) {
            message="Game over <br /> thanks for playing!"
        }
        let html = '<div class="row" style="justify-content: center;"> <h5 style="padding-bottom: 2%;">'+message+'</h5> </div> <div class="row" style="padding-top: 15px;align-items: center;justify-content: center;display: flex;flex-direction: row;"><p style="">'+songInfo[answerid]['description']+'</p> </div>';
        results.innerHTML = html;
        
        results = document.querySelector(".breakdown-playerdiv");
        html = '<div class="contain embed-player"> <div class="music-player"> <div class="cover"> <img src="../assets/img/portfolio/streets-songs/'+answerid+'.png" alt=""> </div> <div class="other-info"> <div class="titre"> <h4>'+songInfo[answerid]['title']+'</h4> <hr/> <p>'+songInfo[answerid]['artist']+'</p> </div> <a class="btn btn-default" data-toggle="tooltip" title="Preview" onclick="aud_play_pause_result()"><i id="stateicon" class="fa fa-pause songicon"></i></a> <div class="lecteur"> <audio style="width: 100%;" class="fc-media" autoplay="true" id="myTune"> <source src="../assets/mp3/portfolio/streets-songs/'+answerid+'.mp3" type="audio/mp3"/> </audio> </div> </div>';
        results.innerHTML = html;
        
        // html = '<div class="results container"> <div class="row"> <h5 style="padding-bottom: 2%;">'+message+'</h5> </div> <div class="row" style="padding-top: 15px;align-items: center;justify-content: center;display: flex;flex-direction: row;"><p style="width: 50%;">'+songInfo[answerid]['description']+'</p> <div class="contain embed-player"> <div class="music-player"> <div class="cover"> <img src="../assets/img/portfolio/streets-songs/'+answerid+'.png" alt=""> </div> <div class="other-info"> <div class="titre"> <h4>'+songInfo[answerid]['title']+'</h4> <p>'+songInfo[answerid]['artist']+'</p> </div> <a class="btn btn-default" data-toggle="tooltip" title="Preview" onclick="aud_play_pause_result()"><i id="stateicon" class="fa fa-pause songicon"></i></a> <div class="lecteur"> <audio style="width: 100%;" class="fc-media" autoplay="true" id="myTune"> <source src="../assets/mp3/portfolio/streets-songs/'+answerid+'.mp3" type="audio/mp3"/> </audio> </div> </div> </div> </div> </div> </div>';
    } else {
        $('.breakdown-screen:visible').fadeOut(500, function() {
            $('.map-screen').fadeIn(500);
        });
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
$("#myTune").on("ended", ()=> {
    $('.songicon').removeClass('fa-pause');
    $('.songicon').addClass('fa-play');
});


document.querySelector(".previewbtn").addEventListener("click", (e)=> {
    // $(".game-screen").fadeOut();
    // $(".breakdown-screen").fadeIn();    
    aud_play_pause(e);
});


let songInfo, songids;
$(document).ready(function() {
    fetch('../chart-data/song-info.json')
    .then(response => response.json())
    .then(data => {
        songInfo = data; // Assign the JSON data to the variable
        songids = Object.keys(songInfo);
        console.log(songInfo, songids);
    })
    .catch(error => console.error('Error reading JSON file:', error));
});

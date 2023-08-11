

// const slides = document.getElementsByClassName('slide');
// let slideIndex = 0;
// // let prev = document.querySelector('.sliderprevbtn');
// let next = document.querySelector('.nextbtn');

// const showSlides = (n) => {
//     if (n > slides.length - 1 || n < 0 ){ return; }
//     for (i = 0; i < slides.length; i++){
//         slides[i].style.display = 'none';
//         slides[i].classList.remove('active');
//     }

//     slides[n].style.display = 'flex';
//     slides[n].classList.add('active');
//     next = document.querySelector('.active .nextbtn');
//     next.addEventListener('click', () => showSlides(++slideIndex));
// }

// showSlides(slideIndex);


// var groups =  document.querySelector("g");
// groups.addEventListener("click", onclick);

// function onclick(e) {
//     console.log(e.target);
// }

// $('.map-screen').addClass("ml-full");    
// $('.game-screen').addClass("mt-full");

var modal = document.getElementById("methodology");
var btn = document.getElementById("methodologybtn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
    modal.style.display = "block";
}
var modal2 = document.getElementById("howto");
var btn2 = document.getElementById("howtobtn");

// When the user clicks on the button, open the modal
btn2.onclick = function() {
    modal2.style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    // console.log(event.target == modal);
    // console.log(modal.style.display);
    if (event.target == modal) {
        modal.style.display = "none";
    }
    
    else if (event.target == modal2) {
        modal2.style.display = "none";
    }
}


// $( document ).ready(function() {
//     $(".cover-sheet").css("background", "none"); 
// });

// $(".title-screen").css("display", "none"); 
$(".intro-screen").css("display", "none"); 
$(".game-intro-screen").css("display", "none"); 
$(".map-screen").css("display", "none"); 
$(".game-screen").css("display", "none"); 
$(".breakdown-screen").css("display", "none"); 


document.querySelector(".startbtn").addEventListener("click", ()=> {
    // $(".title-screen").addClass("mr-full");
    // $('.map-screen').removeClass("ml-full");
    $(".title-screen").fadeOut();
    $(".intro-screen").fadeIn();    
});

document.querySelector(".intronextbtn").addEventListener("click", ()=> {
    $(".intro-screen").fadeOut();
    $(".game-intro-screen").fadeIn();    
});

document.querySelector(".gameintronextbtn").addEventListener("click", ()=> {
    $(".game-intro-screen").fadeOut();
    $(".map-screen").fadeIn();    
});

document.querySelector("g #Cornelia_Street").addEventListener("click", ()=> {
// $( document ).ready(function() {
    // $(".map-screen").addClass("mt-full");
    // $('.game-screen').removeClass("mb-full");
    $(".map-screen").fadeOut();
    $(".game-screen").fadeIn();
    
    $(".game-screen .inputs").attr('id', 'cornelia_street');
    $(".game-screen .previewbtn").attr('id', 'cornelia_street');
    makeLayout();
    
    $(".game-screen .previewAudio").attr('src', '../assets/img/portfolio/streets-songs/cornelia_street_preview.mp3');
    $(".game-screen .previewAudioSrc").attr('src', '../assets/img/portfolio/streets-songs/cornelia_street_preview.mp3');
});


document.querySelector("g #Brooklyn").addEventListener("click", ()=> {
    $(".map-screen").fadeOut();
    $(".game-screen").fadeIn();
    
    $(".game-screen .inputs").attr('id', 'brooklyn');
    $(".game-screen .previewbtn").attr('id', 'brooklyn');
    makeLayout();
    
    $(".game-screen .previewAudio").attr('src', '../assets/img/portfolio/streets-songs/brooklyn_preview.mp3');
    $(".game-screen .previewAudioSrc").attr('src', '../assets/img/portfolio/streets-songs/brooklyn_preview.mp3');
});

function goBack() {
    // $(".game-screen").addClass("mb-full");
    // $('.map-screen').removeClass("mt-full");
    $(".game-screen").fadeOut();
    $(".breakdown-screen").fadeOut();
    $(".map-screen").fadeIn();
    
    var audio = document.getElementById("myTunePreview");
    if (!audio.paused) {audio.pause();}
}

document.querySelector(".backbtn").addEventListener("click", goBack);


document.querySelector(".gamenextbtn").addEventListener("click", ()=> {
    // $(".game-screen").fadeOut();
    // $(".breakdown-screen").fadeIn();    
    var audio = document.getElementById("myTunePreview");
    if (!audio.paused) {audio.pause();}
    showAnswer();
});

// document.querySelector(".intronextbtn").addEventListener("click", showAnswer);

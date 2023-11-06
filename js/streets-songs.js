

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

function onLoadResize() {
    if(window.innerWidth < 769) { 
        $(".screen").css("filter", "blur(15px)"); 
        $(".cover-screen").css("filter", "none"); 
        $(".cover-screen").css("display", "flex"); 

        let results = document.querySelector(".cover-screen");
        let html = '<i class="fa-solid fa-display"></i><p class="landscape">this game is best enjoyed on a larger screen.</p>';
        results.innerHTML = html;

    }
    else if( window.innerHeight > window.innerWidth) { 
        $(".screen").css("filter", "blur(15px)"); 
        $(".cover-screen").css("filter", "none"); 
        $(".cover-screen").css("display", "flex"); 

        let results = document.querySelector(".cover-screen");
        let html = '<i class="fa-solid fa-rotate"></i><p class="landscape">this game is best enjoyed in landscape mode.</p>';
        results.innerHTML = html;
    }
    else {
        $(".screen").css("filter", "none"); 
        $(".cover-screen").css("display", "none");
    }
}
window.addEventListener('load', onLoadResize);
window.addEventListener('resize', onLoadResize);

$(".screen").css("display", "none"); 
$(".title-screen").css("display", "flex");
// $(".intro-screen").css("display", "none"); 
// $(".intro-2-screen").css("display", "none"); 
// $(".game-intro-screen").css("display", "none"); 
// $(".map-screen").css("display", "none"); 
// $(".game-screen").css("display", "none"); 
// $(".breakdown-screen").css("display", "none"); 


document.querySelector(".startbtn").addEventListener("click", ()=> {
    $('.title-screen:visible').fadeOut('slow', function() {
        $('.intro-screen').fadeIn('slow');
    });
});

document.querySelector(".intronextbtn").addEventListener("click", ()=> {
    $('.intro-screen:visible').fadeOut('slow', function() {
        $('.intro-2-screen').fadeIn('slow');
    });    
});

document.querySelector(".intro2nextbtn").addEventListener("click", ()=> {
    $('.intro-2-screen:visible').fadeOut('slow', function() {
        $('.game-intro-screen').fadeIn('slow');
    });    
});

document.querySelector(".gameintronextbtn").addEventListener("click", ()=> {
    $('.game-intro-screen:visible').fadeOut('slow', function() {
        $('.map-screen').fadeIn('slow');
    });
});

document.querySelectorAll("g .datapoint").forEach((pt)=> {
    // $( document ).ready(function() {
    // $(".map-screen").addClass("mt-full");
    // $('.game-screen').removeClass("mb-full");
    pt.addEventListener('click', () => {
        $('.map-screen:visible').fadeOut('slow', function() {
            $('.game-screen').fadeIn('slow');
        });
        
        var pt_id = pt.id.toLowerCase();
        
        $(".game-screen .inputs").attr('id', pt_id);
        $(".game-screen .previewbtn").attr('id', pt_id);
        makeLayout();
        
        $(".game-screen .previewAudio").attr('src', '../assets/mp3/portfolio/streets-songs/'+pt_id+'_preview.mp3');
        $(".game-screen .previewAudioSrc").attr('src', '../assets/mp3/portfolio/streets-songs/'+pt_id+'_preview.mp3');
    });
})


// document.querySelector("g #Cornelia_Street").addEventListener("click", ()=> {
//     $('.map-screen:visible').fadeOut(500, function() {
//         $('.game-screen').fadeIn(500);
//     });

//     $(".game-screen .inputs").attr('id', 'cornelia_street');
//     $(".game-screen .previewbtn").attr('id', 'cornelia_street');
//     makeLayout();

//     $(".game-screen .previewAudio").attr('src', '../assets/img/portfolio/streets-songs/cornelia_street_preview.mp3');
//     $(".game-screen .previewAudioSrc").attr('src', '../assets/img/portfolio/streets-songs/cornelia_street_preview.mp3');
// });


// document.querySelector("g #Brooklyn").addEventListener("click", ()=> {
//     $('.map-screen:visible').fadeOut(500, function() {
//         $('.game-screen').fadeIn(500);
//     });

//     $(".game-screen .inputs").attr('id', 'brooklyn');
//     $(".game-screen .previewbtn").attr('id', 'brooklyn');
//     makeLayout();

//     $(".game-screen .previewAudio").attr('src', '../assets/img/portfolio/streets-songs/brooklyn_preview.mp3');
//     $(".game-screen .previewAudioSrc").attr('src', '../assets/img/portfolio/streets-songs/brooklyn_preview.mp3');
// });

function goBack() {
    $('.game-screen:visible').fadeOut('slow', function() {
        $('.map-screen').fadeIn('slow');
        var audio = document.getElementById("myTunePreview");
        if (!audio.paused) {audio.pause();}
    });
    $('.breakdown-screen:visible').fadeOut('slow', function() {
        $('.map-screen').fadeIn('slow');
        var audio = document.getElementById("myTune");
        if (!audio.paused) {audio.pause();}
    });
    
    // $(".game-screen").fadeOut();
    // $(".breakdown-screen").fadeOut();
    // $(".map-screen").fadeIn();
    
    var audio = document.getElementById("myTunePreview");
    if (!audio.paused) {audio.pause();}
}

document.querySelector(".backbtn").addEventListener("click", goBack);


document.querySelector(".gamenextbtn").addEventListener("click", ()=> {
    // $(".game-screen").fadeOut();
    // $(".breakdown-screen").fadeIn();    
    var audio = document.getElementById("myTunePreview");
    if (!audio.paused) {audio.pause();}
    showAnswer("won");
});

// $(".ai2html").onscroll

document.querySelector(".ai2html").addEventListener('scroll', function (event) {
    if(document.documentElement.scrollTop + window.innerHeight == document.documentElement.scrollHeight)
    {
        $("#scrollbtn").fadeOut(100);
    }
}, true /*Capture event*/);

// document.querySelector(".intronextbtn").addEventListener("click", showAnswer);

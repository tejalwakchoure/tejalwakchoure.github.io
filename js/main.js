
//Preloader and page fade in

// setTimeout(function() {
// 	//After 2000 milliseconds, fade out the overlay. The animation duration is 500 ms.
//   $('#preloader').fadeOut(500);
// $('#body-container').fadeIn(1000);
// }, 1000);

// setTimeout('document.getElementById("preloader").style.display="none"', 5000);

document.getElementById('body-container').style.display = 'none';
$(document).ready(function() {
    var counter = 0;
    var i = setInterval(function(){
      $("#preloader .container .row #count").html(counter);
      counter++;
      if(counter == 101){
        clearInterval(i);
        $('#preloader').fadeOut(1000);
        $('#body-container').fadeIn(1000);
        }
    }, 200);
});


function fadeInChildren(parent, base_delay) {
    var elems = $(parent).children();
    $(elems).each(function(index) {
        $(this).css({opacity: 0.0, visibility: "visible"}).delay(base_delay+(500*index)).animate({opacity: 1.0}, 500);
    });
}

// $(window).load(function() {
// 		// Animate components on and off the screen on loading
// 		$('preloader').fadeOut('slow');
// 		$('body').fadeIn('slow');
// 		$('.hide1 header .img-responsive').css({opacity: 0.0, visibility: "visible"}).delay(500).animate({opacity: 1.0}, 500);
// 		$('.hide1 header').css({opacity: 0.0, visibility: "visible"}).delay(500).animate({opacity: 1.0}, 500);	
// 		fadeInChildren('.hide1 header .intro-text',1000);
// 		$('.hide2').css({opacity: 0.0, visibility: "visible"}).delay(2300).animate({opacity: 1.0}, 500);
// 	});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href'))[0].offsetTop
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

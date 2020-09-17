
// Get window status
// window.loaded = false;
// $(window).load(function() {
//     window.loaded = true;
// });


//Preloader and page fade in setup
function fadeInChildren(parent, base_delay) {
    var elems = $(parent).children();
    $(elems).each(function(index) {
        $(this).css({opacity: 0.0, visibility: "visible"}).delay(base_delay+(500*index)).animate({opacity: 1.0}, 500);
    });
}

$(document).ready(function() {
    $('#body-container').css({display: 'none'});
    var counter = 0;
    var i = setInterval(function(){
      $("#preloader .container #wrapper #count").html(counter);
      counter++;
      if(counter >= 101){
        // while(!window.loaded) {}
        clearInterval(i);
        // Animate components on and off the screen on loading
        $('#preloader').slideUp(1000);
        // $('#preloader').addClass("animate__animated", "animate__fadeOutRight");
        $('#body-container').fadeIn(1000);
        $('.hide1 header .img-responsive').css({opacity: 0.0, visibility: "visible"}).delay(500).animate({opacity: 1.0}, 500);
        $('.hide1 header').css({opacity: 0.0, visibility: "visible"}).delay(500).animate({opacity: 1.0}, 500);  
        fadeInChildren('.hide1 header .intro-text',1000);
        $('.hide2').css({opacity: 0.0, visibility: "visible"}).delay(2300).animate({opacity: 1.0}, 500);
        $('#portfolioDetails .container .row #myCarousel .carousel-inner #slide-6').addClass('active');
        startTime();
     }
    }, 10);
});
// setTimeout(function() {
//  //After 2000 milliseconds, fade out the overlay. The animation duration is 500 ms.
//   $('#preloader').fadeOut(500);
// $('#body-container').fadeIn(1000);
// }, 1000);

// $(window).load(function() {
//      // Animate components on and off the screen on loading
//      $('preloader').fadeOut('slow');
//      $('body').fadeIn('slow');
//      $('.hide1 header .img-responsive').css({opacity: 0.0, visibility: "visible"}).delay(500).animate({opacity: 1.0}, 500);
//      $('.hide1 header').css({opacity: 0.0, visibility: "visible"}).delay(500).animate({opacity: 1.0}, 500);  
//      fadeInChildren('.hide1 header .intro-text',1000);
//      $('.hide2').css({opacity: 0.0, visibility: "visible"}).delay(2300).animate({opacity: 1.0}, 500);
//  });


// local datetime update
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var mth = today.getMonth() + 1;
    var day = today.getDate();
    h = checkTime(h);
    m = checkTime(m);
    mth = checkTime(mth);
    day = checkTime(day);

    // var month = today.toLocaleString('default', { month: 'short' });   
    // var period = (h<12)? "AM":"PM";
    // h = (h<13)? h:(h-12);
    $('.navbar-text').html(day + "/" + mth  +  "<br>" + h + ":" + m);
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

// Carousel initialization
var swiper = new Swiper('.swiper-container', {
      cssMode: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: true,
      keyboard: true,
    });



// onclick event for portfolio details
function toggleDetails(num) {
    
    // $('#myCarousel #link-'+num).click();
    swiper.slideTo(num)
    console.log('moved to #slide-',num)
    num = 6-num;
    $('#portfolioDetails').collapse('toggle');
    $('#portfolio').collapse('toggle');

    $(".portfolio-link").attr("href", "#portfolioDetails");
    $(".slide-link").attr("href", "#portfolio-item-"+num);
    
    

    // if($('#portfolioDetails').is( ":hidden")) {
    //     console.log("#slide-", num, " is not active ; section is not visible")
    //     $('#portfolioDetails').collapse('toggle');
    //     console.log('collapse toggled to show')
    // }
    // else if($('#portfolioDetails').is( ":visible") && $('#slide-'+num).hasClass('active')) {
    //     console.log("#slide-", num, " is active")
    //     $('#portfolioDetails').collapse('toggle');
    //     console.log('collapse toggled show/hide')
    //     $("#portfolio-link-"+num).attr('href','javascript:void(0)'); //reqd?
    // }
    // else {
    //     console.log("no toggle action on #slide-", num)
    // }

    return false;
}

// Equalize carousel heights
// $(function() {
//     var maxHeight = '';
//     var heights = [];
//     $(".carousel-inner > .item").siblings().each(function(i){
//       heights.push($(this).outerHeight());
//     });

//     maxHeight = Math.max.apply(Math, heights);
//     $(".carousel-inner").css({'height': maxHeight + 'px !important'});
//     $(".carousel-inner > .item").siblings().each(function(i){
//         $(this).css({'height': maxHeight + 'px !important'});
//     });
// });

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
$(function() {
    $('.hide-scroll a').bind('click', function(event) {
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

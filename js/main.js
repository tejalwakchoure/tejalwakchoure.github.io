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
    var outerInterval = setInterval(function(){
      $("#preloader .container #wrapper #count").html(counter);
      counter++;
      if(counter >= 101) {
        clearInterval(outerInterval);
        var innerInterval = setInterval(function() {
            if(document.readyState === 'complete') {
              clearInterval(innerInterval);
              // Animate components on and off the screen on loading
              $('#preloader').slideUp(1000);
              $('#body-container').fadeIn(1000);
              fadeInChildren('#body-container header',1000);
              fadeInChildren('#body-container header .intro-text',1000);
              // $('#preloader #brand').css({'transform' : 'translate(-50vw, -30vh) scale(0.4, 0.4)'});
              startTime();
            }
        }, 10);
      }
    }, 10);

  swiper_in.controller.control = swiper_innermost;
  swiper.controller.control = swiper_in;

  // Portfolio parallax
  // $(document).ready(function() {
      // console.log("images parallax on ready");
      // var images = document.querySelectorAll('.px_img');
      // new simpleParallax(images, {
      //     delay: .5,
      //     transition: 'cubic-bezier(0,0,0,1)',
      // });
  // });
});

// Smooth Mouse Scrolling
$("#body-container").easeScroll({
  frameRate: 60,
  animationTime: 1000,
  stepSize: 30,
});

// Local datetime update
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
    if (i < 10) {i = "0" + i};
    return i;
}

// Portfolio parallax
// $(document).ready(function() {
//     console.log("images parallax on ready");
//     var images = document.querySelectorAll('.px_img');
//     images.forEach(img => {
//         new simpleParallax(img, {
//         delay: .5,
//         scale: 1.15,
//         transition: 'cubic-bezier(0,0,0,1)',
//         customWrapper: img.parentNode.nodeName,
//         });
//     });
// });
$(window).on("load", function() {
    console.log("images parallax on load");
    var images = document.querySelectorAll('.px_img');
    images.forEach(img => {
        var img_parallax = new simpleParallax(img, {
                              delay: .5,
                              scale: 1.15,
                              transition: 'cubic-bezier(0,0,0,1)',
                              customWrapper: img.parentNode.nodeName,
                              });
        img_parallax.refresh();
    });    
});

// Swiper initializations
var interleaveOffset = 0.5;
var interleaveSpeed = 1000;

var swiper_innermost = new Swiper('.swiper-container-innermost', {
      // passiveListeners: false,


      observer: true,
      observeParents: true,
      speed: interleaveSpeed,
      // virtualTranslate: true,
      watchSlidesProgress: true,
      on: {
        progress: function() {
          var swiper = this;
          $('.swiper-container-innermost .slide-inner').each(function() { 
            var slideProgress = $(this).progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            $(this).css({"transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
          })
        },
        touchStart: function() {
          var swiper = this;
          $('.swiper-container-innermost .swiper-slide').each(function() { 
            $(this).css({"transition" :  ""});
          })
        },
        setTransition: function(speed) {
          var swiper = this;
          $('.swiper-container-innermost .swiper-slide').each(function() { 
            $(this).css({"transition" :  speed + "ms"});
          });
          $('.swiper-container-innermost .slide-inner').each(function() { 
            $(this).css({"transition" :  speed + "ms"});
          });
        }
      }
    });
var swiper_in = new Swiper('.swiper-container-in', {
      // passiveListeners: false,


      observer: true,
      observeParents: true,
      speed: interleaveSpeed,
      // virtualTranslate: true,
      watchSlidesProgress: true,
      on: {
        progress: function() {
          var swiper = this;
          $('.swiper-container-in .slide-inner').each(function() { 
            var slideProgress = $(this).progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            $(this).css({"transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
          })
        },
        touchStart: function() {
          var swiper = this;
          $('.swiper-container-in .swiper-slide').each(function() { 
            $(this).css({"transition" :  ""});
          })
        },
        setTransition: function(speed) {
          var swiper = this;
          $('.swiper-container-in .swiper-slide').each(function() { 
            $(this).css({"transition" :  speed + "ms"});
          });
          $('.swiper-container-in .slide-inner').each(function() { 
            $(this).css({"transition" :  speed + "ms"});
          });
        }
      }
    });
var swiper = new Swiper('.swiper-container', {
      // passiveListeners: false,


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
      observer: true,
      observeParents: true,
      virtualTranslate: true,
    });

function toggleOnPortfolioLink(num) {
    if(num == -1) {
      num = swiper.realIndex;
    }
    if($('#portfolioDetails').css('display')!='none') {
        $('#portfolio').addClass("animate__animated animate__slideInLeft");
        $('#portfolio').show().siblings('section').hide();
        num = 6 - num;
        document.getElementById("portfolio-item-"+num).scrollIntoView(true);
    }
    else if($('#portfolio').css('display')!='none') {
        $('#portfolioDetails').show().siblings('section').hide();
        swiper.update();
        swiper.slideTo(num);
        swiper_in.update();
        swiper_in.slideTo(num);
        swiper_innermost.update();
        swiper_innermost.slideTo(num);
        document.getElementById('work').scrollIntoView(true);
    }
    else {
    }
    return false;
}

// onclick page scrolling - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href'))[0].offsetTop
        }, 1000, 'easeInOutExpo');
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

$(window).on("load resize scroll", function() {
    // Change brand properties when in/out of Header
    //   window.loaded = true;
    //   // if($('header').position().top <= $(window).scrollTop() && ($('header').position().top + $('header').outerHeight()) > $(window).scrollTop()) {
    //   if($('header').offset().top <= $(window).scrollTop() && ($('header').offset().top + $('header').outerHeight()) > $(window).scrollTop()) {
    //      $('.sidenav .page-scroll .navbar-brand').css({
    //             'font-size' : '4.5em',
    //             'margin' : '50px 10px 40px 0px'
    //         });
    //   } else {
    //     $('.sidenav .page-scroll .navbar-brand').css({
    //             'font-size' : '2em',
    //             'margin' : '0'
    //         });
    //   }

    // Horizontal header parallax
    var windowTop = $(window).scrollTop();
    var elementTop = $('header').offset().top;
    var currentpos = -10;
    var pos = currentpos + ((windowTop - elementTop) / 10);
      $('.hor_parallax_right').css({ right: pos });
      $('.hor_parallax_left').css({ left: pos });
});



var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; } 
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll(target) {
  target.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  target.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  target.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  target.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll(target) {
  target.removeEventListener('DOMMouseScroll', preventDefault, false);
  target.removeEventListener(wheelEvent, preventDefault, wheelOpt); 
  target.removeEventListener('touchmove', preventDefault, wheelOpt);
  target.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}

disableScroll( document.getElementById('portfolioDetails') );


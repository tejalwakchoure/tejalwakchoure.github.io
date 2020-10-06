
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
        // $('#preloader .container #brand').animate({right: "100%", bottom: "100%"}, 400, 'easeInExpo');
        $('#body-container').fadeIn(1000);
        fadeInChildren('#body-container header',1000);
        fadeInChildren('#body-container header .intro-text',1000);
        startTime();
     }
    }, 10);
});

// Change colours of background as we scroll down
$(window).scroll(function() {
  var $window = $(window),
  $body = $('.body-container'),
  $panel = $('.section-bkg');
  // Change 33% earlier than scroll pos so colour is there when you arrive
  var scroll = $window.scrollTop() + ($window.height() / 3);

  $panel.each(function () {
    var $this = $(this);
    // if position is within range of this panel; so pos of (pos of top of div <= scroll pos) && (pos of bottom of div > scroll pos)
    if ($this.position().top <= scroll && $this.position().top + $this.height() > scroll) {
      $body.removeClass(function (index, css) {
        return (css.match (/(^|\s)color-\S+/g) || []).join(' ');
      });      
      $body.addClass('color-' + $(this).data('color'));
    }
  });    
  
}).scroll();

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
    if (i < 10) {i = "0" + i};
    return i;
}

// Swiper initializations
var interleaveOffset = 0.5;
var interleaveSpeed = 1000;

var swiper_innermost = new Swiper('.swiper-container-innermost', {
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

$(document).ready(function() {
    swiper_in.controller.control = swiper_innermost;
    swiper.controller.control = swiper_in;
});


// var images = document.querySelectorAll('.px_img');
//   // new simpleParallax(images);
// images.forEach(img => {
//   console.log("outside");
//   new simpleParallax(img, {
//     delay: .5,
//     transition: 'cubic-bezier(0,0,0,1)',
//     customWrapper: img.parentNode.nodeName,
//   });
// });

// $(document).ready(function(){
//     const images = document.querySelectorAll('.px_img');
//   // new simpleParallax(images);
//   images.forEach(img => {
//     console.log("document ready");
//     new simpleParallax(img, {
//       delay: .5,
//       transition: 'cubic-bezier(0,0,0,1)',
//       customWrapper: img.parentNode.nodeName,
//     });
//   });
//  }); 


// Parallax for portfolio grid (last element to load, use for preloader check)
// $(window).on("load", function() {
  $(document).body.onload = function() {
    const images = document.querySelectorAll('.px_img');
    // new simpleParallax(images);
    images.forEach(img => {
      console.log("on load, document body loaded");
      new simpleParallax(img, {
        delay: .5,
        transition: 'cubic-bezier(0,0,0,1)',
        customWrapper: img.parentNode.nodeName,
      });
    });
  };
// });

// function addParallax() {
//   const images = document.querySelectorAll('.px_img');
//   // new simpleParallax(images);
//   images.forEach(img => {
//     console.log("on load, document body loaded");
//     new simpleParallax(img, {
//       delay: .5,
//       transition: 'cubic-bezier(0,0,0,1)',
//       customWrapper: img.parentNode.nodeName,
//     });
//   });
// }

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

// // Smooth scrolling on mouse event
// document.addEventListener("mousewheel", { passive: false });
// $(function() {
//     jQuery.scrollSpeed(100, 800, 'easeInOutExpo');
// });
// window.addEventListener('wheel', { passive: false })

// $(document).SmoothScrollWheel(
  // {
  //   debug: false,
  //   defaultDetailDelta: 3,
  //   defaultWheelDelta: 120,
  //   defaultSpeed: 50,
  //   default<a href="https://www.jqueryscript.net/animation/">Animation</a>Time: 1500
  // }
// );


// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});


// Change brand properties when in/out of Header
$(window).on("load resize scroll", function() {
  // if($('header').position().top <= $(window).scrollTop() && ($('header').position().top + $('header').outerHeight()) > $(window).scrollTop()) {
  if($('header').offset().top <= $(window).scrollTop() && ($('header').offset().top + $('header').outerHeight()) > $(window).scrollTop()) {
     $('.sidenav .page-scroll .navbar-brand').css({
            'font-size' : '4.5em',
            'margin' : '50px 10px 40px 0px'
        });
  } else {
    $('.sidenav .page-scroll .navbar-brand').css({
            'font-size' : '2em',
            'margin' : '0'
        });
  }
});

// Horizontal header parallax
$(window).on("load resize scroll", function() {
    var windowTop = $(window).scrollTop();
    var elementTop = $('header').offset().top;
    var currentpos = -10;//$('.bg-move').css('right');
    var pos = currentpos + ((windowTop - elementTop) / 10);
      $('.hor_parallax_right').css({ right: pos });
      $('.hor_parallax_left').css({ left: pos });
});

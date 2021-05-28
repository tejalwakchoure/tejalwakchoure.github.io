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

              // Fire up other elements
              startTime();
              addPortfolioParallax();
            }
        }, 10);
      }
    }, 10);

    swiper_in.controller.control = swiper_innermost;
    swiper.controller.control = swiper_in;

    // Smooth Mouse Scrolling for all browsers
    $('html, body').easeScroll({
        frameRate: 60,
        stepSize: 60,
      });

    // Backup - slow but works on all browsers

    // var isSmoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
    // var nicescroll = $('html, body').niceScroll({
    //     scrollspeed: 60, // scrolling speed - moves faster if speed is less
    //     mousescrollstep: 16,
    //     autohidemode: false, 
    //     zindex: 999 
    //   });

    // // Hide scrollbar
    // var _super = nicescroll.getContentSize;
    // nicescroll.getContentSize = function () {
    //     var page = _super.call(nicescroll);
    //     page.h = nicescroll.win.height();
    //     return page;
    //   }
    // $('.nicescroll-rails.nicescroll-rails-vr').remove();
    // $('html, body').bind('wheel scroll', function () {
    //     nicescroll.resize();
    //   });
});

// Portfolio parallax
function addPortfolioParallax() {
    var startParallaxTime = Date.now();
    var interval = setInterval(function () {
        if ($('#body-container').is(':visible') || Date.now() - startParallaxTime > 4000) {
            clearInterval(interval);
            var images = document.querySelectorAll('.px_img');
            images.forEach(img => {
                var img_parallax = new simpleParallax(img, {delay: .5,
                                                            scale: 1.3,
                                                            transition: 'cubic-bezier(0,0,0,1)',
                                                            customWrapper: img.parentNode.nodeName,
                                                            });
            });
        }
    }, 100);
}

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
    $('.navbar-text').html(day + "/" + mth  +  "<br>" + h + ":" + m);
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}

// Preload images & background images
function preloadImages(dir, imageArray, index=0) {
  if (imageArray && imageArray.length > index) {
      var img = new Image ();
      img.onload = function() {
          preloadImages(dir, imageArray, index + 1);
      }
      img.src = dir + imageArray[index];
    }
}

// Swiper initializations
var interleaveOffset = 0.5;
var interleaveSpeed = 1000;

var swiper_innermost = new Swiper('.swiper-container-innermost', {
      observer: true,
      observeParents: true,
      speed: interleaveSpeed,
      watchSlidesProgress: true,
      on: {
        progress: function() {
          var swiper = this;
          $('.swiper-container-innermost .slide-inner').each(function() { 
            var slideProgress = $(this).progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            $(this).css({"-ms-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
            $(this).css({"-webkit-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
            $(this).css({"transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
          })
        },
        touchStart: function() {
          $('.swiper-container-innermost .swiper-slide').each(function() { 
            $(this).css({"transition" :  ""});
          })
        },
        setTransition: function(speed) {
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
      watchSlidesProgress: true,
      on: {
        progress: function() {
          var swiper = this;
          $('.swiper-container-in .slide-inner').each(function() { 
            var slideProgress = $(this).progress;
            var innerOffset = swiper.width * interleaveOffset;
            var innerTranslate = slideProgress * innerOffset;
            $(this).css({"-ms-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
            $(this).css({"-webkit-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
            $(this).css({"transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
          })
        },
        touchStart: function() {
          $('.swiper-container-in .swiper-slide').each(function() { 
            $(this).css({"transition" :  ""});
          })
        },
        setTransition: function(speed) {
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
      // cssMode: true,
      // virtualTranslate: true,
      touchEventsTarget: 'wrapper',
      simulateTouch: false,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: {
        forceToAxis: true,
        sensitivity: 3,
        thresholdDelta: 3,
      },   
      keyboard: true,
      observer: true,
      observeParents: true,
      watchSlidesProgress: true,
    });

// Toggle visibility of project carousel
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
        $('#portfolioDetails').css({display: 'table'});
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
      var page = $('html, body');
      var $anchor = $(this);

      page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
           page.stop();
      });
      page.stop().animate({scrollTop: $($anchor.attr('href'))[0].offsetTop}, 
        1000, 'easeInOutExpo', function(){
           page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
       });
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

$(window).on("load", function() {
  var windowSize = $(window).width();
  if(windowSize < 768) {
    var dir1 = 'assets/img/small-devices/';
    var images1 = ['profile-picture.jpeg']
    preloadImages(dir1, images1);

    var dir2 = 'assets/img/small-devices/portfolio/';
    var images2 = ['project-1.jpg', 'project-2.jpg', 'project-3.jpg', 'project-4.jpg', 'project-5.jpg', 'project-6.jpg'];
    preloadImages(dir2, images2);
  } else {
    var dir1 = 'assets/img/';
    var images1 = ['profile-picture.jpeg']
    preloadImages(dir1, images1);

    var dir2 = 'assets/img/portfolio/';
    var images2 = ['project-1.jpg', 'project-2.jpg', 'project-3.jpg', 'project-4.jpg', 'project-5.jpg', 'project-6.jpg'];
    preloadImages(dir2, images2);
  }
});

// Horizontal header parallax
$(window).on("load resize scroll", function() {
    // Depending on the browser, you may need to use var windowTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    var windowTop = $(window).scrollTop();
    var elementTop = $('header').offset().top;
    var currentpos = -10;
    var pos = currentpos + ((windowTop - elementTop) / 10);
    $('.hor_parallax_right').css({ right: pos });
    $('.hor_parallax_left').css({ left: pos });
});

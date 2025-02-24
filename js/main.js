//Preloader and page fade in setup
function fadeInChildren(parent, base_delay) {
  var elems = $(parent).children();
  $(elems).each(function(index) {
    $(this).css({opacity: 0.0, visibility: "visible"}).delay(base_delay+(500*index)).animate({opacity: 1.0}, 500);
  });
}

//     // Preloader on first visit
// $(document).ready(function() {
//   if ($('#body-container').length) {
//     if (!sessionStorage.getItem('doNotPreload')) {
//       sessionStorage.setItem( 'doNotPreload', 'true' );
//       $("#preloader").css({visibility: "visible", opacity: 1});
//       $('#body-container').css({display: 'none'});

//       var counter = 0;
//       var outerInterval = setInterval(function(){
//         $("#preloader .container #wrapper #count").html(counter);
//         counter++;
//         if(counter >= 101) {
//           clearInterval(outerInterval);
//           var innerInterval = setInterval(function() {
//             if(document.readyState === 'complete') {
//               clearInterval(innerInterval);

//                 // Animate components on and off the screen on loading
//                 $('#preloader').slideUp(600);
//                 $('#body-container').fadeIn(600);
//                 fadeInChildren('#body-container header',500);
//                 fadeInChildren('#body-container header .header-intro-text',100);

//                 // Fire up other elements
//                 // startTime();
//                 // addPortfolioParallax();
//               }
//             }, 7);
//         }
//       }, 7);
//     } else {
//      $('#preloader').css({display: "none"});
//      $('#preloader').css({opacity: 0.0, visibility: "visible"});
//    }
//  }
//     // swiper_in.controller.control = swiper_innermost;
//     // swiper.controller.control = swiper_in;
//   });

// Portfolio parallax
// function addPortfolioParallax() {
//     var startParallaxTime = Date.now();
//     var interval = setInterval(function () {
//         if ($('#body-container').is(':visible') || Date.now() - startParallaxTime > 4000) {
//             clearInterval(interval);
//             var images = document.querySelectorAll('.px_img');
//             images.forEach(img => {
//                 var img_parallax = new simpleParallax(img, {delay: .5,
//                                                             scale: 1.3,
//                                                             transition: 'cubic-bezier(0,0,0,1)',
//                                                             customWrapper: img.parentNode.nodeName,
//                                                             });
//             });
//         }
//     }, 100);
// }

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
// var interleaveOffset = 0.5;
// var interleaveSpeed = 1000;

// var swiper_innermost = new Swiper('.swiper-container-innermost', {
//       observer: true,
//       observeParents: true,
//       speed: interleaveSpeed,
//       watchSlidesProgress: true,
//       on: {
//         progress: function() {
//           var swiper = this;
//           $('.swiper-container-innermost .slide-inner').each(function() { 
//             var slideProgress = $(this).progress;
//             var innerOffset = swiper.width * interleaveOffset;
//             var innerTranslate = slideProgress * innerOffset;
//             $(this).css({"-ms-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
//             $(this).css({"-webkit-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
//             $(this).css({"transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
//           })
//         },
//         touchStart: function() {
//           $('.swiper-container-innermost .swiper-slide').each(function() { 
//             $(this).css({"transition" :  ""});
//           })
//         },
//         setTransition: function(speed) {
//           $('.swiper-container-innermost .swiper-slide').each(function() { 
//             $(this).css({"transition" :  speed + "ms"});
//           });
//           $('.swiper-container-innermost .slide-inner').each(function() { 
//             $(this).css({"transition" :  speed + "ms"});
//           });
//         }
//       }
//     });

// var swiper_in = new Swiper('.swiper-container-in', {
//       observer: true,
//       observeParents: true,
//       speed: interleaveSpeed,
//       watchSlidesProgress: true,
//       on: {
//         progress: function() {
//           var swiper = this;
//           $('.swiper-container-in .slide-inner').each(function() { 
//             var slideProgress = $(this).progress;
//             var innerOffset = swiper.width * interleaveOffset;
//             var innerTranslate = slideProgress * innerOffset;
//             $(this).css({"-ms-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
//             $(this).css({"-webkit-transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
//             $(this).css({"transform" :  "translate3d(" + innerTranslate + "px, 0, 0)"});
//           })
//         },
//         touchStart: function() {
//           $('.swiper-container-in .swiper-slide').each(function() { 
//             $(this).css({"transition" :  ""});
//           })
//         },
//         setTransition: function(speed) {
//           $('.swiper-container-in .swiper-slide').each(function() { 
//             $(this).css({"transition" :  speed + "ms"});
//           });
//           $('.swiper-container-in .slide-inner').each(function() { 
//             $(this).css({"transition" :  speed + "ms"});
//           });
//         }
//       }
//     });

// var swiper = new Swiper('.swiper-container', {
//       // cssMode: true,
//       // virtualTranslate: true,
//       touchEventsTarget: 'wrapper',
//       simulateTouch: false,
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//       pagination: {
//         el: '.swiper-pagination',
//         clickable: true,
//       },
//       mousewheel: {
//         forceToAxis: true,
//         sensitivity: 3,
//         thresholdDelta: 3,
//       },   
//       keyboard: true,
//       observer: true,
//       observeParents: true,
//       watchSlidesProgress: true,
//     });

// Toggle visibility of project carousel
// function toggleOnPortfolioLink(num) {
//     if(num == -1) {
//       num = swiper.realIndex;
//     }
//     if($('#portfolioDetails').css('display')!='none') {
//         $('#portfolio').addClass("animate__animated animate__slideInLeft");
//         $('#portfolio').show().siblings('section').hide();
//         num = 6 - num;
//         document.getElementById("portfolio-item-"+num).scrollIntoView(true);
//     }
//     else if($('#portfolio').css('display')!='none') {
//         $('#portfolioDetails').css({display: 'table'});
//         $('#portfolioDetails').show().siblings('section').hide();
//         swiper.update();
//         swiper.slideTo(num);
//         swiper_in.update();
//         swiper_in.slideTo(num);
//         swiper_innermost.update();
//         swiper_innermost.slideTo(num);
//         document.getElementById('work').scrollIntoView(true);
//     }
//     else {
//     }
//     return false;
// }

// onclick page scrolling - requires jQuery Easing plugin
// $(function() {
//     $('.page-scroll a').bind('click', function(event) {
//       var page = $('html, body');
//       var $anchor = $(this);

//       page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function(){
//            page.stop();
//       });
//       page.stop().animate({scrollTop: $($anchor.attr('href'))[0].offsetTop}, 
//         1000, 'easeInOutExpo', function(){
//            page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
//        });
//       event.preventDefault();
//     });
// });

// Highlight the top nav as scrolling occurs
// $('body').scrollspy({
//     target: '.navbar-fixed-top'
// })

// Closes the Responsive Menu on Menu Item Click
// $('.navbar-collapse ul li a').click(function() {
//     $('.navbar-toggle:visible').click();
// });

// Preload images
// $(window).on("load", function() {
//   var smallScreen = $(window).width() < 768 ? true : false;
//   var dir1 = smallScreen ? 'assets/img/small-devices/' : 'assets/img/';
//   var dir2 = smallScreen ? 'assets/img/small-devices/portfolio/' : 'assets/img/portfolio/';
//   var dir3 = 'assets/gif/';

//   var images1 = ['profile-picture.jpeg']
//   preloadImages(dir1, images1);
//   var images2 = ['mlcat.jpg', 'irclogparser.jpg', 'superglue.jpg', 'healthcare-analytics.jpg', 'presenceid.jpg', 'dbms.jpg'];
//   preloadImages(dir2, images2);
//   var images3 = ['words-glitch.gif', 'code-glitch.gif', 'design-glitch.gif'];
//   preloadImages(dir3, images3);
// });

// Horizontal header parallax
$(window).on("load resize scroll", function() {
 if($('header').length) {
	    // Depending on the browser, you may need to use var windowTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
      var windowTop = $(window).scrollTop() || window.pageYOffset || 0;
      var elementTop = $('header').offset().top || 0;
      var currentpos = -10;
      var factor = 5;
      if($(window).width() < 1024) {
        factor = 10;
        currentpos = 0;
      }
	    var pos = currentpos + ((windowTop - elementTop) / factor); // was originally divided by 10

	    if (pos < -10) {
       pos = -10;
     }
	    // $('.hor_parallax_right').css({ right: pos });
	    $('.hor_parallax_left').css({ left: pos });
      console.log(pos);
    }
  });

// // Horizontal header parallax for mobile
// $(document.body).on('touchmove', function() {
//   var windowTop = document.body.scrollTop || 0;
//   var elementTop = $('header').offset().top || 0;
//   var currentpos = 0;
//   var factor = 10;
//   var pos = currentpos + ((windowTop - elementTop) / factor);

//   if (pos < -10) {
//     pos = -10;
//   }
//   $('.hor_parallax_left').css({ left: pos });
// });

$(window).on("load", function() {
  // Swiper initialization
  var swiper = new Swiper(".odds-ends-slider", {
    effect: "fade",
    centeredSlides: true,
    rewind: true,
    preventInteractionOnTransition: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
      type: "fraction",
    },
  });

  swiper.on('slideChange', function () {
   active_slide = $(".swiper-slide-visible");
   $('#current-title').html($(active_slide).data('title'));
   $('#current-description').html($(active_slide).data('description'));
 });
});


// Hide overlay until images are loaded in portfolio
$(document).ready(function() {
  $('#portfolio .portfolio-link-wrapper').css({visibility: "visible"});
  // Grainy page for subpages (doesn't work)
  // var imageRoot = "https://tejalwakchoure.github.io/assets/img/grainy_page.jpeg";
  // $(".grainy-page:after").css('backgroundImage', 'url(' + imageRoot + ')');
});

// Back link on projects
// ('back-link').setAttribute('href', document.referrer);
function backlink() {
    // $('back-link').attr('href', document.referrer);
    history.back();
    return false;
  }
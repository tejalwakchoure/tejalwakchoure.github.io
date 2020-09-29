
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
        $('#preloader #brand').animate({transform: translate(-100%, -100%)}, 1000);
        $('#body-container').fadeIn(1000);
        fadeInChildren('#body-container header',1000);
        fadeInChildren('#body-container header .intro-text',1000);
        // $('#portfolioDetails .container .row #myCarousel .carousel-inner #slide-6').addClass('active');
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
//      $('.hide1').css({opacity: 0.0, visibility: "visible"}).delay(500).animate({opacity: 1.0}, 500);  
//      fadeInChildren('.hide1 header .intro-text',1000);
//  });



$(window).scroll(function() {
  var $window = $(window),
  $body = $('.body-container'),
  $panel = $('.section-bkg');
  // Change 33% earlier than scroll position so colour is there when you arrive.
  var scroll = $window.scrollTop() + ($window.height() / 3);

  $panel.each(function () {
    var $this = $(this);
    // if position is within range of this panel.
    // So position of (position of top of div <= scroll position) && (position of bottom of div > scroll position).
    // Remember we set the scroll to 33% earlier in scroll var.
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
      observer: true,
      observeParents: true,
    });

function toggleOnPortfolioLink(num) {
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
        // num = 6 - num;
        document.getElementById('work').scrollIntoView(true);
    }
    else {
    }
    return false;
}

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('.page-scroll a').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href'))[0].offsetTop
        }, 1000, 'easeInOutExpo');
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


// Change brand properties when in/out of Header
$(document).scroll(function () {
  if($('header').position().top <= $(document).scrollTop() && ($('header').position().top + $('header').outerHeight()) > $(document).scrollTop()) {
     $('.navbar-brand').css({
            'font-size' : '4.5em',
            'margin' : '0px 20px 50px 0px'
        });
  } else {
    $('.navbar-brand').css({
            'font-size' : '2em',
            'margin' : '0'
        });
  }
});

$(document).ready(function() {
  "use strict";
  $.ajax({
    type: "GET",
    url: "../chart-data/sanitised-gdp.csv",
    dataType: "text",
    success: function(data) {processGDP(data);}
  });
});

function processGDP(csvdata) {
  "use strict";
  var data_array = $.csv.toArrays(csvdata);
  data_array.splice(0, 1);
  console.log(data_array);
  const arrayColumn = (arr, n) => arr.map(x => x[n]);
  const years = arrayColumn(data_array, 1);
  const gdps = arrayColumn(data_array, 2);
  years[3] = [years[3], " test"];
  console.log(years);
  
  const data = {
    labels: ['2001','2002',['2003','First Coup'],'2004','2005','2006','2007','2008','2009', '2010','2011',['2012','Second Coup'],'2013'],
    datasets: [{
      label: 'GDP % Change',
      data: gdps,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
    }],
  };
  
  var ctx = document.getElementById('gdp-barchart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            color: '#fff',
            // maxRotation: 0,
            // callback: function(val,index){ console.log(val,this.getLabelForValue(val))}, 
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: '#fff'
          },
        }
      },
      plugins: {
        legend: { 
          display: false,
        },
        tooltip: {
          usePointStyle: true,
          backgroundColor: 'gray'
        }
      },
    },
  });
}

window.createGraphic = function(graphicSelector) {
  
  var graphicEl = d3.select('.graphic')
  var graphicVisEl = graphicEl.select('.graphic__vis')
  var graphicProseEl = graphicEl.select('.graphic__prose')
  var graphicVisImg = graphicVisEl.select('img')
  var graphicVisImgWrapper = graphicVisEl.select('.img_wrapper')
  
  var paragraph = document.getElementById("img_text");
  
  
  
  // actions to take on each step
  var steps = [
    function step0() {
      graphicVisImgWrapper.style('background', 'url(../assets/img/portfolio/coup/1-kumba-yala.jpg)');
      paragraph.textContent = "Kumba Yalá";
      // graphicVisImg.attr('src', '../assets/img/portfolio/coup/1-kumba-yala.jpg');
    },
    
    function step1() {
      graphicVisImgWrapper.style('background', 'url(../assets/img/portfolio/coup/2-henrique-rosa.jpg)');
      paragraph.textContent = "Henrique Rosa";
      // graphicVisImg.attr('src', '../assets/img/portfolio/coup/2-henrique-rosa.jpg');
    },
    
    function step2() {
      graphicVisImgWrapper.style('background', 'url(../assets/img/portfolio/coup/3-vieira.jpg)');
      paragraph.textContent = "João Bernardo Vieira";
      // graphicVisImg.attr('src', '../assets/img/portfolio/coup/3-vieira.jpg');
    },
    
    function step3() {
      graphicVisImgWrapper.style('background', 'url(../assets/img/portfolio/coup/4-sanha.jpg)');
      paragraph.textContent = "Malam Bacai Sanhá";
      // graphicVisImg.attr('src', '../assets/img/portfolio/coup/4-sanha.jpg');
    },
    function step4() {
      graphicVisImgWrapper.style('background', 'url(../assets/img/portfolio/coup/5-manuel.jpg)');
      paragraph.textContent = "Manuel Serifo Nhamadjo";
      // graphicVisImg.attr('src', '../assets/img/portfolio/coup/5-manuel.jpg');
    },
  ]
  
  // update chart
  function update(step) {
    steps[step].call()
  }
  
  update(0);
  
  return {
    update: update,
  }
}

$(document).ready(function() {
  
  // helper function so we can map over dom selection
  function selectionToArray(selection) {
    var len = selection.length;
    var result = [];
    for (var i = 0; i < len; i++) {
      result.push(selection[i]);
    }
    return result;
  }
  
  function waypoints() {
    // select elements
    var graphicEl = document.querySelector('.graphic');
    var graphicVisEl = graphicEl.querySelector('.graphic__vis');
    var triggerEls = selectionToArray(graphicEl.querySelectorAll('.trigger'));
    
    // viewport height
    var viewportHeight = window.innerHeight;
    var halfViewportHeight = Math.floor(viewportHeight / 4);
    
    // a global function creates and handles all the vis + updates
    var graphic = createGraphic('.graphic');
    
    // handle the fixed/static position of grahpic
    var toggle = function(fixed, bottom) {
      if (fixed) {
        // graphicVisEl.style.right='0';
        graphicVisEl.classList.add('is-fixed');
        
      }
      else {
        // graphicVisEl.style.right='-10%';
        graphicVisEl.classList.remove('is-fixed');
      }
      
      if (bottom) 
        graphicVisEl.classList.add('is-bottom');
      else 
      graphicVisEl.classList.remove('is-bottom');
    }
    
    // setup a waypoint trigger for each trigger element
    var waypoints = triggerEls.map(function(el) {
      
      // get the step, cast as number         
      var step = +el.getAttribute('data-step');
      
      return new Waypoint({
        element: el, // our trigger element
        handler: function(direction) {
          // if the direction is down then we use that number,
          // else, we want to trigger the previous one
          var nextStep = direction === 'down' ? step : Math.max(0, step - 1);
          
          // tell our graphic to update with a specific step
          graphic.update(nextStep);
        },
        offset: '50%',  // trigger halfway up the viewport
      });
    });
    
    // enter (top) / exit (bottom) graphic (toggle fixed position)
    var enterWaypoint = new Waypoint({
      element: graphicEl,
      handler: function(direction) {
        var fixed = direction === 'down';
        var bottom = false;
        toggle(fixed, bottom);
      },
    });
    
    var exitWaypoint = new Waypoint({
      element: graphicEl,
      handler: function(direction) {
        var fixed = direction === 'up';
        var bottom = !fixed;
        toggle(fixed, bottom);
      },
      offset: 'bottom-in-view', // waypoints convenience instead of a calculation
    });
  }
  
  waypoints();
  
  $('div#coup-all').hide();
  // $('div#coup-all').css("opacity", "0");
  $('.coup .btn').on('click', function(event){
    if(this.querySelector('input').id=='radio-coup-2000') {
      $('div#coup-all').hide();
      $('div#coup-2000').show();
      // $('div#coup-all').css("opacity", "0");
      // $('div#coup-2000').css("opacity", "1");
    }
    else {
      $('div#coup-2000').hide();
      $('div#coup-all').show();
      // $('div#coup-2000').css("opacity", "0");
      // $('div#coup-all').css("opacity", "1");
    }
  });

});

$(document).ready(function() {
 "use strict";
 $.ajax({
  type: "GET",
  url: "../chart-data/sanitised-gdp.csv",
  dataType: "text",
  success: function(data) {processGDP(data);}
});

//  $.ajax({
//   type: "GET",
//   url: "../chart-data/countries.csv",
//   dataType: "text",
//   success: function(data) {processCountries(data);}
// });
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

// function processCountries(csvdata) {
//   "use strict";
//   var data_array = $.csv.toArrays(csvdata);
//   data_array.splice(0, 1);
//   console.log(data_array);

//   const arrayColumn = (arr, n) => arr.map(x => x[n]);
//   var unique_countries = arrayColumn(data_array, 0).filter(function onlyUnique(value, index, self) {
//     return self.indexOf(value) === index;
//   });

//   var all_years = [];
//   for (var i = 2000; i <= 2022; i++) {
//     all_years.push(i)
//   }
//   all_years = all_years.map(String);

//   var dataset = [];
//   data_array.forEach(function(row) {

//     // unique_countries.indexOf(row[0])
//     if(row[0]!='')
//       dataset.push({ x: row[1], y: row[0], v: row[2]});
//   });
//   console.log(dataset);

//   // var height = document.getElementById('country-heatmap').height;
//   // var width = document.getElementById('country-heatmap').width;
//   var data = {
//     labels: all_years,
//     datasets: [{
//       label: 'Country',
//       data: dataset,
//       // [
//       // { x: 2002, y: 1, v: 11 },
//       // { x: 2004, y: 2, v: 22 },
//       // { x: 2010, y: 3, v: 33 }
//       // ],
//       // borderWidth: 1,
//       // borderColor: 'rgba(0,0,0,0.5)',
//       backgroundColor: function(chart) {
//         var value = chart.dataset.data[chart.dataIndex].v;
//         // var alpha = (value - 5) / 40;
//         // return 'rgb(54, 162, 235,'+alpha+')';
//         let alpha = 1- ((1 + Math.log(value)) / 5);
//         return 'rgb(54, 162, 235,'+alpha+')';
//       },
//       // width: ({chart}) => width / 10,
//       // height: ({chart}) => height / 2,
//     }]
//   }

//   const chart = new Chart('country-heatmap', {
//     type: 'matrix',
//     data: data,
//     options: {
//       scales: {
//         x: {
//             // display: false,
//             // min: 2000,
//             // max: 2020,
//             // offset: true
//           },
//           y: {
//             // display: false,
//             // offset: true
//             type: 'category',
//             labels: unique_countries
//           }
//         },
//         responsive: true,
//         plugins: {
//           legend: { 
//             display: false,
//           },
//         },
//       },
//     });
// }

   /* 
  I've created a function here that is a simple d3 chart.
  This could be anthing that has discrete steps, as simple as changing
  the background color, or playing/pausing a video.
  The important part is that it exposes and update function that
  calls a new thing on a scroll trigger.
  */
  window.createGraphic = function(graphicSelector) {

    var graphicEl = d3.select('.graphic')
    var graphicVisEl = graphicEl.select('.graphic__vis')
    var graphicProseEl = graphicEl.select('.graphic__prose')
    var graphicVisImg = graphicVisEl.select('img')
    // var graphicVisImgText = document.getElementById('img_text')
    var graphicVisImgWrapper = graphicVisEl.select('.img_wrapper')

    var paragraph = document.getElementById("img_text");



  // actions to take on each step of our scroll-driven story
  var steps = [
  function step0() {
    graphicVisImgWrapper.style('background', 'url(../assets/img/portfolio/coup/1-kumba-yala.jpg)');
    // graphicVisImgText.innerHTML("test");
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

  // update our chart
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
        var halfViewportHeight = Math.floor(viewportHeight / 2);

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



      // $('html, body').easeScroll({
      //   frameRate: 50,
      //   // animationTime: 3000,
      //   stepSize: 30,
      //   // pulseAlgorithm: 1,
      //   // pulseScale: 8,
      //   // pulseNormalize: 1,
      //   // accelerationDelta: 20,
      //   // accelerationMax: 1,
      //   // keyboardSupport: true,
      //   // arrowScroll: 50,
      //   // touchpadSupport: true,
      // });

      $('div#coup-all').hide();
      $('.coup .btn').on('click', function(event){
        if(this.querySelector('input').id=='coup-2000') {
          $('div#coup-all').hide();
          $('div#coup-2000').show();
        }
        else {
          $('div#coup-2000').hide();
          $('div#coup-all').show();
        }
      });

    });

// import createScrollSnap from 'scroll-snap';
// const element = document.getElementById('graphic');
// const { bind, unbind } = createScrollSnap(element, {
//   snapDestinationX: '0%',
//   snapDestinationY: '90%',
//   timeout: 100,
//   duration: 300,
//   threshold: 0.2,
//   snapStop: false,
//   easing: easeInOutQuad,
// }, () => console.log('element snapped'));


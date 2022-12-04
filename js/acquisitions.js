
// $(window).on("load", function() {
//   const scrollContainer = document.querySelector('.hor-scroll');
//   scrollContainer.addEventListener('wheel', (evt) => {
//     evt.preventDefault();
//     scrollContainer.scrollLeft += evt.deltaY;
//   });
// }

$(document).ready(function() {
 "use strict";

 $.ajax({
  type: "GET",
  url: "../chart-data/mamma-acquisitions.csv",
  dataType: "text",
  success: function(data) {processMAMMA(data);}
});

 $.ajax({
  type: "GET",
  url: "../chart-data/google-markets.csv",
  dataType: "text",
  success: function(data) {processMarkets(data);}
});

 $.ajax({
  type: "GET",
  url: "../chart-data/market-dates.csv",
  dataType: "text",
  success: function(data) {processMarketDates(data);}
});

 $.ajax({
  type: "GET",
  url: "../chart-data/product-timeline.csv",
  dataType: "text",
  success: function(data) {processProductTimeline(data);}
});

// console.log($('.hor-scroll'));
// document.getElementById("hor-scroll-id").scrollIntoView();

});

function processMAMMA(csvdata) {
  "use strict";
  var data_array = $.csv.toArrays(csvdata);
  data_array.splice(0, 1);

  const arrayColumn = (arr, n) => arr.map(x => x[n]);
  const years = arrayColumn(data_array, 1);

  var all_years = [];
  for (var i = Math.min.apply(Math, years); i <= Math.max.apply(Math, years); i++) {
    all_years.push(i);
  }
  
  var goog_data = [];
  var amz_data = [];
  var appl_data = [];
  var meta_data = [];
  var msft_data = [];


  var goog_data_line = [];
  var amz_data_line = [];
  var appl_data_line = [];
  var meta_data_line = [];
  var msft_data_line = [];

  data_array.forEach(function(row) {
    if ( row[0] == 'Google' ) {
      goog_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      goog_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Amazon' ) {
      amz_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      amz_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Apple' ) {
      appl_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      appl_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Meta' ) {
      meta_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      meta_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Microsoft' ) {
      msft_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      msft_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
  });
  // console.log(arrayColumn(goog_data_line,0));


  const chart1 = new Chart('goog-acquisitions', {
    type: 'line',
    data: {
      labels: arrayColumn(goog_data_line,0),
      datasets: [{
        label: 'Google',
        data: arrayColumn(goog_data_line,1),
        borderWidth: 1,
        fill: false,
        borderColor: 'pink',
      }]
    },
    options: {
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
      scales : {
        x: {
          ticks: {
            callback: function(value, index, values) {
             return (index === values.length - 1 || index === 0) ? this.getLabelForValue(value) : '';
           },
         }
       },
       y : {
        min: 0,
        max: 40,
      }
    }
  }
});
  const chart2 = new Chart('amz-acquisitions', {
    type: 'line',
    data: {
      labels: arrayColumn(amz_data_line,0),
      datasets: [{
        label: 'Amazon',
        data: arrayColumn(amz_data_line,1),
        borderWidth: 1,
        fill: false,
        borderColor: 'pink',
      }]
    },
    options: {
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
      scales : {
        x: {
          ticks: {
            callback: function(value, index, values) {
             return (index === values.length - 1 || index === 0) ? this.getLabelForValue(value) : '';
           },
         }
       },
       y : {
        min: 0,
        max: 40,
      }
    }
  }
});
  const chart3 = new Chart('appl-acquisitions', {
    type: 'line',
    data: {
      labels: arrayColumn(appl_data_line,0),
      datasets: [{
        label: 'Apple',
        data: arrayColumn(appl_data_line,1),
        borderWidth: 1,
        fill: false,
        borderColor: 'pink',
      }]
    },
    options: {
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
      scales : {
        x: {
          ticks: {
            callback: function(value, index, values) {
             return (index === values.length - 1 || index === 0) ? this.getLabelForValue(value) : '';
           },
         }
       },
       y : {
        min: 0,
        max: 40,
      }
    }
  }
});
  const chart4 = new Chart('meta-acquisitions', {
    type: 'line',
    data: {
      labels: arrayColumn(meta_data_line,0),
      datasets: [{
        label: 'Meta',
        data: arrayColumn(meta_data_line,1),
        borderWidth: 1,
        fill: false,
        borderColor: 'pink',
      }]
    },
    options: {
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
      scales : {
        x: {
          ticks: {
            callback: function(value, index, values) {
             return (index === values.length - 1 || index === 0) ? this.getLabelForValue(value) : '';
           },
         }
       },
       y : {
        min: 0,
        max: 40,
      }
    }
  }
});
  const chart5 = new Chart('msft-acquisitions', {
    type: 'line',
    data: {
      labels: arrayColumn(msft_data_line,0),
      datasets: [{
        label: 'Microsoft',
        data: arrayColumn(msft_data_line,1),
        borderWidth: 1,
        fill: false,
        borderColor: 'pink',
      }]
    },
    options: {
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
      scales : {
        x: {
          ticks: {
            callback: function(value, index, values) {
             return (index === values.length - 1 || index === 0) ? this.getLabelForValue(value) : '';
           },
         }
       },
       y : {
        min: 0,
        max: 40,
      }
    }
  }
});

  const chart_total = new Chart('mamma-acquisitions', {
    type: 'scatter',
    data: {
      datasets: [{
        label: 'Google',
        data: goog_data,
        borderWidth: 2,
        fill: false,
        borderColor: 'teal',
        showLine: true 
      },
      {
        label: 'Amazon',
        data: amz_data,
        borderWidth: 1,
        fill: false,
        borderColor: 'gray',
        showLine: true 
      },
      {
        label: 'Apple',
        data: appl_data,
        borderWidth: 1,
        fill: false,
        borderColor: 'gray',
        showLine: true 
      },
      {
        label: 'Meta',
        data: meta_data,
        borderWidth: 1,
        fill: false,
        borderColor: 'gray',
        showLine: true 
      },
      {
        label: 'Microsoft',
        data: msft_data,
        borderWidth: 1,
        fill: false,
        borderColor: 'gray',
        showLine: true 
      },
      ],
    },
    options: {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      responsive: true,
      elements: {
        point: {
          radius: 0
        }
      },
    }
  });
}


function processMarkets(csvdata) {
  var data_array = $.csv.toArrays(csvdata);
  data_array.splice(0, 1);

  const arrayColumn = (arr, n) => arr.map(x => x[n]);
  const market = arrayColumn(data_array, 0);
  const num_companies = arrayColumn(data_array, 1);

  function colorFromRaw(ctx) {
    if (ctx.type !== 'data') {
      return 'transparent';
    }
    const value = ctx.raw.v;
    let alpha = (1 + Math.log(value)) / 5;
    return 'rgb(54, 162, 235,'+alpha+')';
  }

//   const treemap = new Chart('market-treemap', {
//     type: 'treemap',
//     data: {
//       datasets: [
//       {
//       // label: 'My treemap dataset',
//       tree: num_companies,
//       borderColor: 'rgb(54, 162, 235)',
//       borderWidth: 0.5,
//       borderRadius: 4,
//       spacing: 1,
//       backgroundColor: (ctx) => colorFromRaw(ctx),
//       // captions: {
//       //   display: true,
//       //   formatter: function(ctx) {
//       //     const data = ctx.chart.data;
//       //     console.log(data);
//       //     console.log(`Custom Text: ${data.datasets[ctx.datasetIndex].tree[ctx.dataIndex]}`);
//       //     return `Custom Text: ${data.datasets[ctx.datasetIndex].tree[ctx.dataIndex]}`;
//       //   }
//       // },
//     }
//     ],
//   },
//   options: {
//     plugins: {
//       title: {
//         display: true,
//         text: 'My treemap chart'
//       },
//       legend: {
//         display: false
//       }
//     }
//   }
// });



const data = [
{category: 'main', subcategory: 'one', value: 1},
{category: 'main', subcategory: 'one', value: 5},
{category: 'main', subcategory: 'one', value: 3},
{category: 'main', subcategory: 'two', value: 2},
{category: 'main', subcategory: 'two', value: 1},
{category: 'main', subcategory: 'two', value: 8},
{category: 'other', subcategory: 'one', value: 4},
{category: 'other', subcategory: 'one', value: 5},
{category: 'other', subcategory: 'two', value: 4},
{category: 'other', subcategory: 'two', value: 1},
];
const treemap = new Chart('market-treemap', {
  type: 'treemap',
  data: {
    datasets: [{
      tree: data,
      key: 'value',
      groups: ['subcategory', 'value'],
      captions: {
        display: true,
        formatter(ctx) {
          return ctx.type === 'data' ?  ctx.raw.g : '';
        }
      },
    }]
  },
});
}



function processMarketDates(csvdata) {
  "use strict";
  var data_array = $.csv.toArrays(csvdata);
  data_array.splice(0, 1);

  const arrayColumn = (arr, n) => arr.map(x => x[n]);
  const years = arrayColumn(data_array, 0);
  const market = arrayColumn(data_array, 1);
  const num_companies = arrayColumn(data_array, 2);

  // var all_years = [];
  // for (var i = Math.min.apply(Math, years); i <= Math.max.apply(Math, years); i++) {
  //   all_years.push(i);
  // }
  // console.log(all_years);
  
  // var goog_data = [];
  // var amz_data = [];
  // var appl_data = [];
  // var meta_data = [];
  // var msft_data = [];


  // var goog_data_line = [];
  // var amz_data_line = [];
  // var appl_data_line = [];
  // var meta_data_line = [];
  // var msft_data_line = [];

  var dataset = new Map();
  data_array.forEach(function(row) {
    var mkt = row[1];
    if ( !(mkt in dataset) ) {
      dataset[mkt] = [];
    }
    dataset[mkt].push({x: parseInt(row[0], 10), y: parseInt(row[2], 10)});
  });


  var data = [];
  for (const [key, val] of Object.entries(dataset)) {
    let alpha = (1 + Math.log(parseInt(key,10))) / 5;
    data.push({
      label: key,
      data: val,
      borderWidth: 2,
      fill: false,
      borderColor: 'rgb(54, 162, 235,'+alpha+')',
      // showLine: true 
    });
  }


  // console.log("data = ", data);

  const chart_total = new Chart('market-dates', {
    type: 'scatter',
    data: {
      datasets: data,
    },
    options: {
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      responsive: true,
      elements: {
        point: {
        // radius: 0
      }
    },
  }
});
}


function processProductTimeline(csvdata) {
  "use strict";
  var data_array = $.csv.toArrays(csvdata);
  // data_array.splice(0, 1);

  console.log(data_array);

  const arrayColumn = (arr, n) => arr.map(x => x[n]);
  const years = arrayColumn(data_array, 0);
  const market = arrayColumn(data_array, 1);
  const num_companies = arrayColumn(data_array, 2);

  data_array.forEach(function(row) {
    if ( row[0] == 'Google' ) {
      goog_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      goog_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Amazon' ) {
      amz_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      amz_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Apple' ) {
      appl_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      appl_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Meta' ) {
      meta_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      meta_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
    else if ( row[0] == 'Microsoft' ) {
      msft_data.push({x: parseInt(row[1], 10), y: parseInt(row[2], 10)});
      msft_data_line.push([parseInt(row[1], 10), parseInt(row[2], 10)]);
    }
  });
  
  console.log(Date.parse(new Date()));

  var testData = [
  {class: "pA", label: "person a", times: [
  {"color":"pink", "starting_time": Date.parse("01-01-2010"), "ending_time": Date.parse("01-01-2015")},
  {"color":"pink", "starting_time": Date.parse("01-01-2016"), "ending_time": Date.parse("01-01-2020")},
  ]},
  ];

  var chart = d3.timelines()
  .width(700)
  .margin({left:70, right:30, top:0, bottom:0})
  .stack()
  .tickFormat({
   format:  d3.timeFormat("%Y"),
   tickTime: d3.timeYear,
              // tickInterval: 10,
              // tickSize: 3
            })


//   var testData = [
//   {class: "pA", label: "person a", times: [
// {"color":"pink", "starting_time": 1355767900000, "ending_time": 1355774400000}
// ]},
// {class: "pB", label: "person b", times: [
// {"color":"orange", "starting_time": 1355759910000, "ending_time": 1355761900000}]},
// {class: "pC", label: "person c", times: [
// {"color":"red", "starting_time": 1355761910000, "ending_time": 1355763910000}]}
// ];

// var chart = d3.timelines()
// .width(700)
// .margin({left:70, right:30, top:0, bottom:0})
// .stack()
// .relativeTime()


var svg = d3.select("#acq-timeline").append("svg")
.attr("width", 700)
.datum([testData[0]])
.call(chart);
//     svg.transition()
//     .duration(3000);
var groups = [0, 1, 2]

    // add the options to the button
    d3.select("#selectbox")
    .selectAll('myOptions')
    .data(groups)
    .enter()
    .append('option')
      .text(function (d) { return d; }) // text showed in the menu
      .attr("value", function (d) { return d; }) // corresponding value returned by the button
// A function that update the chart
function update(selectedGroup) {
    // Create new data with the selection
    // var dataFilter = data.map(function(d){return {time: d.time, value:d[selectedGroup]} })

    d3.select("#acq-timeline").select('svg').remove();

    var svg = d3.select("#acq-timeline").append("svg")
    .attr("width", 500)
    .datum([testData[selectedGroup]])
    .call(chart);

    // .transition()
    // .duration(1000);
  }

  // d3.select("#selectbox").on("change", function(d) {
  //       var selectedGroup = d3.select(this).property("value");
  //       console.log("selected group", selectedGroup)
  //       update(selectedGroup)
  //     });

    // Cache the number of options
    var $this = $("#selectbox"),
    numberOfOptions = $("#selectbox").children('option').length;

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    $styledSelect.text($this.children('option').eq(0).text());

    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
      'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
      $('<li />', {
        text: $this.children('option').eq(i).text(),
        rel: $this.children('option').eq(i).val()
      }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
      e.stopPropagation();
      $('div.styledSelect.active').each(function () {
        $(this).removeClass('active').next('ul.options').hide();
      });
      $(this).toggleClass('active').next('ul.options').toggle();
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
      e.stopPropagation();
      $styledSelect.text($(this).text()).removeClass('active');
      $this.val($(this).attr('rel'));
      $list.hide();

      var selectedGroup = $(this).attr('rel');
      update(selectedGroup)
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
      $styledSelect.removeClass('active');
      $list.hide();
    });

  }

$(document).ready(function() {
 "use strict";
 $.ajax({
  type: "GET",
  url: "../chart-data/sanitised-gdp.csv",
  dataType: "text",
  success: function(data) {processHeights(data);}
});

//  $.ajax({
//   type: "GET",
//   url: "../chart-data/building-types.csv",
//   dataType: "text",
//   success: function(data) {processBldgTypes(data);}
// });

 
});

function processHeights(csvdata) {
  "use strict";
  var data_array = $.csv.toArrays(csvdata);
  data_array.splice(0, 1);
  console.log(data_array);
  const arrayColumn = (arr, n) => arr.map(x => x[n]);
  const years = arrayColumn(data_array, 1);
  const gdps = arrayColumn(data_array, 2);
  const data = {
    labels: years,
    datasets: [{
      label: 'GDP % Change',
      data: gdps,
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      borderColor: 'rgb(54, 162, 235)',
      borderWidth: 1,
    }],
  };
  // console.log(data)

  var ctx = document.getElementById('height-barchart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
      scales: {
        x: {
          color: '#fff',
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
          backgroundColor: 'rgb(0, 0, 235)'
        }
      },
    },
  });
}



// function processBldgTypes(csvdata) {
//   "use strict";

//   var data_array = $.csv.toArrays(csvdata);
//   data_array.splice(0, 1);
//   console.log(data_array);
//   const arrayColumn = (arr, n) => arr.map(x => x[n]);
//   const years = arrayColumn(data_array, 1);
//   const gdps = arrayColumn(data_array, 2);
//   const data = {
//     labels: years,
//     datasets: [{
//       label: 'Count',
//       data: gdps,
//       backgroundColor: 'rgba(54, 162, 235)',
//       borderColor: 'rgb(54, 162, 235)',
//       borderWidth: 1,
//     }],
//   };
//   // console.log(data)

//   var ctx = document.getElementById('owner-bubble').getContext('2d');
//   var myChart = new Chart(ctx, {
//     type: 'bar',
//     data: data,
//     options: {
//       indexAxis: 'y',
//       scales: {
//         x: {
//           color: '#fff',
//         },
//         y: {
//           beginAtZero: true,
//           ticks: {
//             color: '#fff'
//           },
//         }
//       },
//       plugins: {
//         legend: { 
//           display: false,
//         },
//         tooltip: {
//           usePointStyle: true,
//           backgroundColor: 'rgb(0, 0, 235)'
//         }
//       },
//     },
//   });


// //   var data_array = $.csv.toArrays(csvdata);
// //   data_array.splice(0, 1);
// //   console.log(data_array);
// //   const arrayColumn = (arr, n) => arr.map(x => x[n]);
// //   const radii = arrayColumn(data_array, 2);

// //   var data = [];
// //   var x=11
// //   var y=11
// //   let scaler = d3.scaleLinear()
// //   .domain([Math.min.apply(Math, radii), Math.max.apply(Math, radii)])
// //   .range([10, 100]);

// //   data_array.forEach(function(row) {
// //       data.push({x: x, y: y, r: scaler(parseInt(row[2], 10))});
// //       x-=1
// //       y-=1

// //       // ([parseInt(row[1], 10), parseInt(row[2], 10)]);
// //   });

// //   // const arrayColumn = (arr, n) => arr.map(x => x[n]);
// //   // const years = arrayColumn(data_array, 1);
// //   // const gdps = arrayColumn(data_array, 2);
// //   // const data = {
// //   //   labels: years,
// //   //   datasets: [{
// //   //     label: 'GDP % Change',
// //   //     data: gdps,
// //   //     backgroundColor: 'rgba(54, 162, 235, 0.2)',
// //   //     borderColor: 'rgb(54, 162, 235)',
// //   //     borderWidth: 1,
// //   //   }],
// //   // };
// //   console.log(data)

// // const ndata = {
// //   datasets: [{
// //     label: 'First Dataset',
// //     data: data,
// //     backgroundColor: 'rgb(255, 99, 132)'
// //   }]
// // };

// // // const ndata = {
// // //   datasets: [{
// // //     label: 'First Dataset',
// // //     data: [{
// // //       x: 20,
// // //       y: 30,
// // //       r: 15
// // //     }, {
// // //       x: 40,
// // //       y: 10,
// // //       r: 10
// // //     }],
// // //     backgroundColor: 'rgb(255, 99, 132)'
// // //   }]
// // // };

// // var myChart = new Chart(('owner-bubble'), {
// //   type: 'bubble',
// //   data: ndata,
// //   options: {}
// // });

// }



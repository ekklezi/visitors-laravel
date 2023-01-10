require('./bootstrap');

import Alpine from 'alpinejs';

import Chart from 'chart.js/auto';

import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';

window.Alpine = Alpine;

Alpine.start();

axios.get('https://ipinfo.io')
  .then(function (response) {
    axios.post('/visitor', response.data);
  });

if(document.getElementById('barchart')){
  axios.get('/visitors/today').then(function (response) {
    let datasets = [];
    let labels = [];

    
    for(let i = 0; i<=23; i++){
      labels.push(i + ':00');
      if(response.data[i]){
        datasets.push(response.data[i]);
      } else {
        datasets.push(0);
      }
    }
    console.log(response.data);
    const ctx = document.getElementById('barchart');
    new Chart(ctx, {
        type: 'bar',
        data: {
          datasets: [{
            label: 'Кол-во посетителей',
            data: datasets
          }],
          labels: labels
        },
        options: {
          indexAxis: 'y',
          elements: {
            bar: {
              borderWidth: 2,
            }
          },
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
              text: 'Количество посетителей за день'
            }
          },
          scales: {
            x: {
              ticks: {
                stepSize: 1
              }
            }
          }
        },
    });
  });
}

if(document.getElementById('circlechart')){
  axios.get('/visitors/city').then(function (response) {
    let datasets = [];
    let labels = [];

    response.data.forEach(element => {
      datasets.push(element.total);
      labels.push(element.city);
    });
    const ctx = document.getElementById('circlechart');
    new Chart(ctx, {
        type: 'pie',
        data: {
          datasets: [{
              data: datasets
          }],
          labels: labels
        }
    });
  });
}

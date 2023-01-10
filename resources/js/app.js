require('./bootstrap');

import Alpine from 'alpinejs';

import Chart from 'chart.js/auto';

import {DateTime} from 'luxon';
import 'chartjs-adapter-luxon';

window.Alpine = Alpine;

Alpine.start();

axios.get('https://ipinfo.io')
  .then(function (response) {
    console.log(response.data);
    axios.post('/visitor', response.data)
      .then(function (response) {
        console.log(response);
      })
  });

  if(document.getElementById('chart')){
    console.log(123);
    const ctx = document.getElementById('chart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: [{
                label: 'Количество посетителей',
                data: [12, 19, 3, 5, 2, 3],
                borderWidth: 1
            }]
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
                yield: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    }
                }
            }
        },
    });
  }

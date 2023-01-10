require('./bootstrap');

import Alpine from 'alpinejs';

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

import Vue from 'vue';
import App from './App';

// normalize.css for css reset
// import "common/normalize.css";
import 'normalize.css';
import 'bootstrap/dist/css/bootstrap.min.css';


/* eslint-disable no-new */
new Vue({
  el: '#root',
  data: {},
  components: {
    App,
  },
  template: '<App/>',
  // render (createElement) {
  //     return createElement(App);
  // }
});

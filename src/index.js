import Vue from 'vue'
import VueTouch from 'vue-touch'

//引入touch事件
Vue.use(VueTouch);
//引入公共样式
import "./static/style/base.scss";

//引入zepto
import $ from 'zepto';
window.APP = require("./static/js/APP.js");


//初始化页面
var vue = new Vue({
  cache: false,
  debug: true,
  el: "body",
  data: {
    currentView: "index"
  },
  components: { //定义组件
    'index': function (resolve) {
      require(['./page/index.vue'], resolve);
    }
  }
});



//文件核心作用：导入app.vue，基于app.vue创建结构渲染index.html
//1、导入vue核心包
import Vue from 'vue'
//2、导入app.vue根组件
import App from './App.vue'
//引入element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';


//提示：当前处于什么环境
Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.prototype.$http = axios;

//3、vue实例化，提供render方法，基于app.vue创建结构渲染index.html
new Vue({

  render: h => h(App),
}).$mount('#app')//和el（#app）作用一致

//这里渲染的就是app.vue，以后直接修改app.vue即可
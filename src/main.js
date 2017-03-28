// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import axios from 'axios'//不需要在此应用（liuan）
// import { AjaxPlugin } from 'vux'//不需要在此应用（liuan）
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import filters from './filters' //将全部过滤器放在 filters/index.js 中便于管理
import store from './store/'
import './config/rem'

// Vue.use(AjaxPlugin, axios);//不需要在此应用（liuan）
// 改造vuex（liuan）
// 修改store目录，将代码结构化，最后export尽量和原来一致，保证目前项目不用过度修改（liuan）

// 注册全局过滤器
filters(Vue)

router.beforeEach(function (to, from, next) {
	store.dispatch('updateLoadingStatus', { isLoading: true })
    next()
})

router.afterEach(function (to) {
	store.dispatch('updateLoadingStatus', { isLoading: false })
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import axios from 'axios'
import { AjaxPlugin } from 'vux'
import FastClick from 'fastclick'
import router from './router'
import App from './App'

import filters from './filters' //将全部过滤器放在 filters/index.js 中便于管理
import store from './store/'
import './config/rem'

Vue.use(AjaxPlugin, axios);
// 注册全局过滤器
filters(Vue)

router.beforeEach(function (to, from, next) {
    store.commit('updateLoadingStatus', { isLoading: true })
    next()
})

router.afterEach(function (to) {
    store.commit('updateLoadingStatus', { isLoading: false })
})

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')

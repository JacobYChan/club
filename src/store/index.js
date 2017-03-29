import Vue from 'vue'
import Vuex from 'vuex'

import common from './modules/common'
import circle from './modules/circle'
import message from './modules/message'
import activity from './modules/activity'
import article from './modules/article'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        common,
        circle,
        message,
        activity,
        article
    }
})
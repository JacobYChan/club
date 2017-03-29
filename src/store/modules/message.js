import api from '../../fetch/api'
import * as types from '../mutation-types';

// 通用配置
const state = {
	messagesyslist: [],
    messageapplist: [],
}

const actions = {
    get_message_sys_list({ commit }, params) {
        api.v3_notify_list(params).then(res => {
// console.log(res)
            commit(types.GET_MESSAGE_SYS_LIST, res)
        })
    },
    get_message_app_list({ commit }, params) {
        api.v3_notify_list(params).then(res => {
// console.log(res)
            commit(types.GET_MESSAGE_APP_LIST, res)
        })
    }
}

const getters = {
    messagesyslist: state => state.messagesyslist,
    messageapplist: state => state.messageapplist,
}

const mutations = {
    [types.GET_MESSAGE_SYS_LIST](state, res) {
        const result = {
            type: 1,
            group_name: '系统消息',
            icon: 'http://img3.imgtn.bdimg.com/it/u=2059047634,2596951716&fm=214&gp=0.jpg',
            msg: res.retdata
        };
        state.messagesyslist = result
    },
    [types.GET_MESSAGE_APP_LIST](state, res) {
        const result = {
            type: 2,
            group_name: '应用消息',
            icon: 'http://img3.imgtn.bdimg.com/it/u=2059047634,2596951716&fm=214&gp=0.jpg',
            msg: res.retdata
        };
        state.messageapplist = result
    },
}

export default {
    state,
    actions,
    getters,
    mutations,
}
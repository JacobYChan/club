import * as types from '../mutation-types';

// 通用配置
const state = {
	isLoading: false,
	tipsStatus: false, //控制评论右上角菜单的显示(true)/隐藏(false)
}

const actions = {
	updateLoadingStatus({ commit }, payload) {
        commit(types.COMMON_LOADING_STATUS, payload)
    },
    toggleTipsStatus({ commit }, status) {
        commit(types.COMMON_TOGGLE_TIPS_STATUS, status)
    },
}

const getters = {
	isLoading: state => state.isLoading,
	tipsStatus: state => state.tipsStatus,
}

const mutations = {
    [types.COMMON_LOADING_STATUS](state, payload) {
        state.isLoading = payload.isLoading
    },
    [types.COMMON_TOGGLE_TIPS_STATUS](state, status) {
        if (status == -1) {
            state.tipsStatus = false
        } else {
            state.tipsStatus = !state.tipsStatus
        }
    },
}

export default {
    state,
    actions,
    getters,
    mutations,
}
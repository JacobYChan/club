import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
    activity_official_list: [],
    activity_list: [],
    activity_detail: [],
    activity_type: [],
}

const actions = {
    get_activity_type({ commit }, param) {
        api.v3_activity_type(param).then(res => {
            commit(types.GET_ACTIVITY_TYPE, res)

        })
    },
    get_activity_list({ commit }, param) {
        api.v3_activity_list(param).then(res => {
            commit(types.GET_ACTIVITY_LIST, res)

        })
    },
    get_activity_official_list({ commit }, param) {
        api.v3_activity_list(param).then(res => {
            commit(types.GET_ACTIVITY_OFFICIAL_LIST, res)

        })
    },
    get_activity_detail({ commit }, param) {
        api.v3_activity_activity(param).then(res => {
            commit(types.GET_ACTIVITY_DETAIL, res)

        })
    },
}

const getters = {
    activity_official_init_list: state => {
        var official_init_list = [],
            all_activity = state.activity_official_list,
            max = all_activity.length
        for (var i = 0; i < max; i++) {
            if (official_init_list.indexOf(all_activity[i].etime) == -1) {
                official_init_list.push(all_activity[i].etime)
            }
        }
        official_init_list.sort(function (a, b) {
            return b - a
        })
        return official_init_list
    },

    activity_official_list: (state, getters) => {
        var official_list = {},
            all_activity = state.activity_official_list,
            max = all_activity.length;
        for (var i = 0; i < getters.activity_official_init_list.length; i++) {
            var protoTypeName = getters.activity_official_init_list[i]
            official_list[i] = []
            for (var j = 0; j < max; j++) {
                if (all_activity[j].etime === protoTypeName) {
                    official_list[i].push(all_activity[j])
                }
            }
        }
        return official_list
    },

    activity_init_list: state => {
        var activity_init_list = [],
            all_activity = state.activity_list,
            max = all_activity.length
        for (var i = 0; i < max; i++) {
            if (activity_init_list.indexOf(all_activity[i].etime) == -1) {
                activity_init_list.push(all_activity[i].etime)
            }
        }
        activity_init_list.sort(function (a, b) {
            return b - a
        })
        return activity_init_list
    },

    activity_list: (state, getters) => {
        var activity_list = {},
            all_activity = state.activity_list,
            max = all_activity.length;
        for (var i = 0; i < getters.activity_init_list.length; i++) {
            var protoTypeName = getters.activity_init_list[i]
            activity_list[i] = []
            for (var j = 0; j < max; j++) {
                if (all_activity[j].etime === protoTypeName) {
                    activity_list[i].push(all_activity[j])
                }
            }
        }
        return activity_list
    },
    activity_detail: state => state.activity_detail,
    activity_type: state => state.activity_type
}

const mutations = {
    [types.GET_ACTIVITY_OFFICIAL_LIST](state, res) {
        state.activity_official_list = res.retdata
    },
    [types.GET_ACTIVITY_LIST](state, res) {
        state.activity_list = res.retdata
    },
    [types.GET_ACTIVITY_DETAIL](state, res) {
        state.activity_detail = res.retdata
    },
    [types.GET_ACTIVITY_TYPE](state, res) {
        state.activity_type = res.retdata
    },
}

export default {
    state,
    actions,
    getters,
    mutations,
}
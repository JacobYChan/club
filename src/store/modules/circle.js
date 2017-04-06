import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
	circles_yz: [],
	circles_hot: [],
    circles_near: [],
    circles_recommend: [],
    circles_friend: [],
    circles_detail: [],
    circles_detail_list: [],
}

const actions = {
    get_circles_detail_list({ commit }, param) {
        api.v3_dynamic_list(param).then(res => {
            commit(types.GET_CIRCLES_DETAIL_LIST, res)
            
        })
    },
    get_circles_yz_list({ commit }, param) {
        api.v3_dynamic_list(param).then(res => {
            commit(types.GET_CIRCLES_YZ_LIST, res)

        })
    },
    get_circles_friend_list({ commit }, param) {
        api.v3_dynamic_list(param).then(res => {
            commit(types.GET_CIRCLES_FRIEND_LIST, res)

        })
    },
    get_circles_recommend_list({ commit }) {
        const param = {begin: 0,offset: 100,order:'time',ordertype:'desc'}
        api.v3_circle_list(param).then(res => {
            commit(types.GET_CIRCLES_RECOMMEND_LIST, res)

        })
    },

    get_circles_hot_list({ commit }) {
        const param = {begin: 0,offset: 100,order:'nums',ordertype:'desc'}
        api.v3_circle_list(param).then(res => {
            commit(types.GET_CIRCLES_HOT_LIST, res)

        })
    },

    get_circles_near_list({ commit }) {
        const param = {begin: 0,offset: 100,order:localStorage.getItem('loginopenid')}
        api.v3_circle_list(param).then(res => {
            commit(types.GET_CIRCLES_NEAR_LIST, res)

        })
    },

    get_circles_detail({ commit }, param) {
        api.v3_circle_circle(param).then(res => {
            commit(types.GET_CIRCLES_DETAIL, res)

        })
    },
}

const getters = {
    // 跃动扬州圈
    circles_yz_init_list: state => {
        var yz_init_list = [],
            all_circles = state.circles_yz,
            max = all_circles.length
        for (var i = 0; i < max; i++) {
            if (yz_init_list.indexOf(all_circles[i].time) == -1) {
                yz_init_list.push(all_circles[i].time)
            }
        }
        yz_init_list.sort(function (a, b) {
            return b - a
        })
        return yz_init_list
    },

    circles_yz_list: (state, getters) => {
        var yz_list = {},
            all_circles = state.circles_yz,
            max = all_circles.length;
        for (var i = 0; i < getters.circles_yz_init_list.length; i++) {
            var protoTypeName = getters.circles_yz_init_list[i]
            yz_list[i] = []
            for (var j = 0; j < max; j++) {
                if (all_circles[j].time === protoTypeName) {
                    yz_list[i].push(all_circles[j])
                }
            }
        }
        return yz_list
    },

    // 推荐圈子，提取圈子字母 排序
    circles_recommend_init_list: state => {
        var recommend_init_list = [],
            all_circles = state.circles_recommend,
            max = all_circles.length
        for (var i = 0; i < max; i++) {
            if (recommend_init_list.indexOf(all_circles[i].initial) == -1) {
                recommend_init_list.push(all_circles[i].initial)
            }
        }
        recommend_init_list.sort()
        return recommend_init_list
    },
    // 将圈子按照字母分类
    circle_recommend_list: (state, getters) => {
        var recommend_list = {},
            all_circles = state.circles_recommend,
            max = all_circles.length;
        for (var i = 0; i < getters.circles_recommend_init_list.length; i++) {
            var protoTypeName = getters.circles_recommend_init_list[i]
            recommend_list[protoTypeName] = []
            for (var j = 0; j < max; j++) {
                if (all_circles[j].initial === protoTypeName) {
                    recommend_list[protoTypeName].push(all_circles[j])
                }
            }
        }
        return recommend_list
    },

    circles_near_init_list: state => {
        var near_init_list = [],
            all_circles = state.circles_near,
            max = all_circles.length
        for (var i = 0; i < max; i++) {
            if (near_init_list.indexOf(all_circles[i].distance) == -1) {
                near_init_list.push(all_circles[i].distance)
            }
        }
        near_init_list.sort(function (a, b) {
            return a - b
        })
        return near_init_list
    },

    circles_near_list: (state, getters) => {
        var near_list = {},
            all_circles = state.circles_near,
            max = all_circles.length;
        for (var i = 0; i < getters.circles_near_init_list.length; i++) {
            var protoTypeName = getters.circles_near_init_list[i]
            near_list[protoTypeName] = []
            for (var j = 0; j < max; j++) {
                if (all_circles[j].distance === protoTypeName) {
                    near_list[protoTypeName].push(all_circles[j])
                }
            }
        }
        return near_list
    },

    circles_hot_init_list: state => {
        var hot_init_list = [],
            all_circles = state.circles_hot,
            max = all_circles.length
        for (var i = 0; i < max; i++) {
            if (hot_init_list.indexOf(all_circles[i].member) == -1) {
                hot_init_list.push(all_circles[i].member)
            }
        }
        hot_init_list.sort(function (a, b) {
            return b - a
        })
        return hot_init_list
    },

    circles_hot_list: (state, getters) => {
        var hot_list = {},
            all_circles = state.circles_hot,
            max = all_circles.length;
        for (var i = 0; i < getters.circles_hot_init_list.length; i++) {
            var protoTypeName = getters.circles_hot_init_list[i]
            hot_list[i] = []
            for (var j = 0; j < max; j++) {
                if (all_circles[j].member === protoTypeName) {
                    hot_list[i].push(all_circles[j])
                }
            }
        }
        return hot_list
    },

    circles_friend_init_list: state => {
        var friend_init_list = [],
            all_circles = state.circles_friend,
            max = all_circles.length
        for (var i = 0; i < max; i++) {
            if (friend_init_list.indexOf(all_circles[i].time) == -1) {
                friend_init_list.push(all_circles[i].time)
            }
        }
        friend_init_list.sort(function (a, b) {
            return b - a
        })
        return friend_init_list
    },

    circles_friend_list: (state, getters) => {
        var friend_list = {},
            all_circles = state.circles_friend,
            max = all_circles.length;
        for (var i = 0; i < getters.circles_friend_init_list.length; i++) {
            var protoTypeName = getters.circles_friend_init_list[i]
            friend_list[i] = []
            for (var j = 0; j < max; j++) {
                if (all_circles[j].time === protoTypeName) {
                    friend_list[i].push(all_circles[j])
                }
            }
        }
        return friend_list
    },
    circles_detail: state => state.circles_detail,
    circles_detail_list: state => state.circles_detail_list
}

const mutations = {
    [types.GET_CIRCLES_DETAIL_LIST](state, res) {
        state.circles_detail_list = res.retdata
    },
    [types.GET_CIRCLES_RECOMMEND_LIST](state, res) {
        state.circles_recommend = res.retdata
    },
    [types.GET_CIRCLES_HOT_LIST](state, res) {
        state.circles_hot = res.retdata
    },
    [types.GET_CIRCLES_NEAR_LIST](state, res) {
        state.circles_near = res.retdata
    },
    [types.GET_CIRCLES_YZ_LIST](state, res) {
        state.circles_yz = res.retdata
    },
    [types.GET_CIRCLES_FRIEND_LIST](state, res) {
        state.circles_friend = res.retdata
    },
    [types.GET_CIRCLES_DETAIL](state, res) {
        state.circles_detail = res.retdata
    },
}

export default {
    state,
    actions,
    getters,
    mutations,
}
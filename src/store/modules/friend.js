import api from '../../fetch/api'
import * as types from '../mutation-types';

// 通用配置
const state = {
	friends: [],
}

const actions = {
	// updateLoadingStatus({ commit }, payload) {
 //        commit(types.COMMON_LOADING_STATUS, payload)
 //    },
 //    toggleTipsStatus({ commit }, status) {
 //        commit(types.COMMON_TOGGLE_TIPS_STATUS, status)
 //    },
    getFriendsList({ commit }) {
        // if(state.scroll) {
        //     commit(types.GET_SPORTS_PAGE_NUM)
        //     commit(types.COM_LOADING_STATUS, true),
        //     commit(types.GET_SPORTS_SCORLL_STATUS, false)
        api.v3_notify_list().then(res => {
            
        //             commit(types.COM_LOADING_STATUS, false),
        //             commit(types.GET_SPORTS_SCORLL_STATUS, true)
            commit(types.GET_MESSAGE_LIST, res)
        })
        // }
    }
}

const getters = {
	messages: state => state.messages,
}

const mutations = {
    [types.GET_MESSAGE_LIST](state, res) {
        // if(state.searchKey.page <= 1) {
            // state.messages = res.retdata
            state.messages = [{ //普通消息列表
    "mid": 1, //消息的id 唯一标识，重要
    "type": "official",//消息类型，先保留，后期需要
    "group_name": "来摇吧", //如果不是个人消息，则需要填写
    "read": true, //true；已读 false：未读
    "msg": [{ //对话框的聊天记录 新消息 push 进
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }, {
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }, {
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }],
    // "user": friends.getUserInfo('runid_xuxiang') // 此消息的用户
},
{
    "mid": 2, //消息的id 唯一标识，重要
    "type": "",//消息类型，先保留，后期需要
    "group_name": "", //如果不是个人消息，则需要填写
    "read": false, //true；已读 false：未读
    "msg": [{ //对话框的聊天记录 新消息 push 进
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }, {
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }, {
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }],
    // "user": friends.getUserInfo('runid_xuxiang') // 此消息的用户
},
{
    "mid": 3, //消息的id 唯一标识，重要
    "type": "",//消息类型，先保留，后期需要
    "group_name": "", //如果不是个人消息，则需要填写
    "read": false, //true；已读 false：未读
    "msg": [{ //对话框的聊天记录 新消息 push 进
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }, {
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }, {
        "text": "点击这些白色框消息，唤醒消息操作菜单，点击这些白色框消息，唤醒消息操作菜单",
        "date": "1490756400",
        "title": "点击这些白色框消息"
    }],
    // "user": friends.getUserInfo('runid_xuxiang') // 此消息的用户
},
];
        // } else {
            // state.sportsList = state.sportsList.concat(res.data)
        // }
    },
}

export default {
    state,
    actions,
    getters,
    mutations,
}
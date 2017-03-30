import axios from 'axios'
import qs from 'qs'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://sport.jsheyun.net';
// axios.defaults.baseURL = 'http://result.eolinker.com';

// post传参序列化
axios.interceptors.request.use((config) => {
    if (config.method  === 'post') {
        console.log(localStorage.getItem('loginopenid'));
        config.data = qs.stringify(config.data);
    }
    return config;
},(error) =>{
//      _.toast("错误的传参", 'fail');
    console.log('错误的传参');
    return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) =>{
//     if(!res.data.success){
//         // _.toast(res.data.msg);
        // return Promise.reject(res);
//     }
    return res;
}, (error) => {
//     _.toast("网络异常", 'fail');
    console.log('网络异常');
    return Promise.reject(error);
});

export function fetch(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            resolve(response.data);
        }, err => {
            reject(err);
        })
        .catch((error) => {
           reject(error)
        })
    })
}

export default {
	// 动态列表
	v3_dynamic_list(params) {
        return fetch('/v2/api/dynamic/list', params)
  	},


  	// //发表动态
  	// v3_dynamic_update() {
   //  	// return Vue.http.post('api/v3/dynamic/update', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/dynamic/update', params);
  	// },
  	// //动态的评论列表
  	// v3_dynamic_dynamic() {
   //  	// return Vue.http.post('api/v3/dynamic/dynamic', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/dynamic/dynamic', params);
  	// },
  	// //评论动态
  	// v3_dynamic_reply() {
   //  	// return Vue.http.post('api/v3/dynamic/reply', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/dynamic/reply', params);
  	// },
  	// //动态点赞
  	// v3_dynamic_likes() {
   //  	// return Vue.http.post('api/v3/dynamic/likes', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/dynamic/likes', params);
  	// },


  	// //创建活动
  	// v3_activity_update() {
   //  	// return Vue.http.post('api/v3/activity/update', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/activity/update', params);
  	// },
  	// 活动列表
  	v3_activity_list(params) {
    	return fetch('/v2/api/activity/list', params);
  	},
  	// //活动类型
  	// v3_activity_type() {
   //  	// return Vue.http.post('api/v3/activity/type', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/activity/type', params);
  	// },

  	// 活动报名
  	v3_activity_enroll(params) {
    	return fetch('/v2/api/activity/enroll', params);
  	},
  	// 活动信息
  	v3_activity_activity(params) {
    	return fetch('/v2/api/activity/activity', params);
  	},

  	// 文章列表
  	v3_article_list(id) {
    	return fetch('/v2/api/article/list', {cid: id, begin: 0,offset: 100});
  	},
  	// 文章内容
  	v3_article_article(id) {
    	return fetch('/v2/api/article/article', {id: id});
  	},
  	// 文章分类全部
  	v3_article_getcategory() {
    	return fetch('/v2/api/article/getcategory')
  	},

  	// 圈子申请
  	v3_circle_apply(params) {
    	return fetch('/v2/api/circle/apply', params);
  	},
  	// 圈子列表
  	v3_circle_list(params) {
    	return fetch('/v2/api/circle/list', params)
  	},
    // 圈子详情
    v3_circle_circle(params) {
        return fetch('/v2/api/circle/circle', params)
    },
  	// 退出圈子
  	v3_circle_quit(params) {
    	return fetch('/v2/api/circle/quit', params);
  	},
  	// 加入圈子
  	v3_circle_join(params) {
    	return fetch('/v2/api/circle/join', params);
  	},
  	// 消息列表
    v3_notify_list(params) {
        return fetch('/v2/api/notify/list', params)
    },
}
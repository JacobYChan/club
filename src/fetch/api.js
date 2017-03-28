import axios from 'axios'

// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// axios.defaults.baseURL = 'http://sport.jsheyun.net';
axios.defaults.baseURL = 'http://result.eolinker.com';

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
        return fetch('/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/dynamic/list', params)
        // return fetch('/api/v3/dynamic/list', params)
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
  	// //活动列表
  	// v3_activity_list() {
   //  	// return Vue.http.post('api/v3/activity/list', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/activity/list', params);
  	// },
  	// //活动类型
  	// v3_activity_type() {
   //  	// return Vue.http.post('api/v3/activity/type', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/activity/type', params);
  	// },
  	// //活动报名
  	// v3_activity_enroll() {
   //  	// return Vue.http.post('api/v3/activity/enroll', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/activity/enroll', params);
  	// },
  	// //活动信息
  	// v3_activity_activity() {
   //  	// return Vue.http.post('api/v3/activity/activity', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/activity/activity', params);
  	// },

  	// 文章列表
  	v3_article_list(id) {
    	// return fetch('/api/v3/article/list', id);
    	return fetch('/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/article/list', id);
  	},
  	// //文章内容
  	// v3_article_article() {
   //  	// return Vue.http.post('api/v3/article/article', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/article/article', params);
  	// },
  	// 文章分类全部
  	v3_article_getcategory() {
        return fetch('/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/article/getcategory')
    	// return fetch('/api/v3/article/getcategory')
  	},

  	// //圈子申请
  	// v3_circle_apply() {
   //  	// return Vue.http.post('api/v3/circle/apply', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/circle/apply', params);
  	// },
  	// 圈子列表
  	v3_circle_list(params) {
        return fetch('/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/circle/list', params)
    	// return fetch('/api/v3/circle/list', params)
  	},
  	// //退出圈子
  	// v3_circle_quit() {
   //  	// return Vue.http.post('api/v3/circle/quit', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/circle/quit', params);
  	// },
  	// //加入圈子
  	// v3_circle_join() {
   //  	// return Vue.http.post('api/v3/circle/join', params);
   //  	return Vue.http.get('http://result.eolinker.com/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/circle/join', params);
  	// },

  	// 消息列表
    v3_notify_list() {
        // return fetch('api/v3/notify/list')
        return fetch('/yBHid5idb11256adfce650a70debc28b6b2a62f3812cc05?uri=/api/v3/notify/list')
    },
}
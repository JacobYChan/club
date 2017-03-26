import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'
import circles_hot from "./circles_hot" //存放热门圈子
import circles_near from "./circles_near" //存放附近圈子
import circles_recommend from "./circles_recommend" //存放推荐圈子
import friend from './friends' //存放所有联系人的数据
import yzCircles from './yzCircles' //存放扬州同城圈联系人数据
import officialActivity from './official-activity' //存放所有官方活动
import activity from './activity' //存放所有的个人活动
import messages from './message' //存放所有的消息
import articleCategory from './articles'//存放所有文章信息

Vue.use(Vuex)

const state = {
    isLoading: false,
    allFriends: friend.friends, //所有朋友
    circles_hot: circles_hot.circles_hot, //所有热门圈子
    circles_near: circles_near.circles_near,//存放附近圈子
    circles_recommend: circles_recommend.circles_recommend, //推荐圈子
    tipsStatus: false, //控制评论右上角菜单的显示(true)/隐藏(false)
    yzCircles: yzCircles.yzCircles, //扬州同城圈子
    officialActivity: officialActivity.officialActivities,//所有的官方活动
    activity: activity.activities, //存放所有的个人活动
    messages: messages,//存放所有的消息
    articleCategory:articleCategory.article_categories//存放所有文章
}

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations,

})
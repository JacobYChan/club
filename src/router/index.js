import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
        },
        {
            path: '/home',
            component: resolve => require(["../components/home/home.vue"], resolve),
            children: [
                {
                    path: '',
                    component: resolve => require(["../components/circles/circleYZ.vue"], resolve)
                },
                {
                    path: 'friend',
                    component: resolve => require(["../components/circles/circleFriend.vue"], resolve)
                },
                {
                    path: 'join',
                    component: resolve => require(["../components/circles/joinCircle.vue"], resolve)
                }
            ]
        }
    ]
})

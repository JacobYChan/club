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
                    path: '/',
                    component: resolve => require(["../components/circles/circleYZ.vue"], resolve)
                },
                {
                    path: 'friend',
                    component: resolve => require(["../components/circles/circleFriend.vue"], resolve)
                },
                {
                    path: 'join',
                    component: resolve => require(["../components/circles/joinCircle.vue"], resolve),
                    children: [
                        {
                            path: '',
                            component: resolve => require(["../components/circles/circle_recommend.vue"], resolve),
                        },
                        {
                            path: 'near',
                            component: resolve => require(["../components/circles/circle_near.vue"], resolve),
                        },
                        {
                            path: 'hot',
                            component: resolve => require(["../components/circles/circle_hot.vue"], resolve),
                        }
                    ]
                }
            ]
        }, {
            path: '/home/circle/topic/addTopic',
            name: "addTopic",
            components: {
                "subPage": resolve => require(["../components/topic/addTopic.vue"], resolve)
            }
        },
        {
            path: '/home/join/circle/circleDetail',
            name: "circleDetail",
            components: {
                "subPage": resolve => require(["../components/circles/circleDetail"], resolve)
            }
        },
        {
            path: '/home/join/circle/create_circle',
            name: "circleCreate",
            components: {
                "subPage": resolve => require(["../components/circles/createCircle"], resolve)
            }
        },
        {
            path: '/home/join/circle/create_circle/circle_submit',
            name: "circleSubmit",
            components: {
                "subPage": resolve => require(["../components/circles/circleSubmit.vue"], resolve)
            }
        },
        {
            path: '/activity',
            name: 'activity',
            component: resolve => require(["../components/activity/activity"], resolve)
        },
        {
            path: '/activity/activityDetail',
            name: 'activityDetail',
            components: {
                "subPage": resolve => require(["../components/activity/activityDetail"], resolve)
            }
        },
        {
            path: '/activity/create_activity',
            name: 'createActivity',
            components: {
                "subPage": resolve => require(["../components/activity/createActivity"], resolve)
            }
        }
    ]
})

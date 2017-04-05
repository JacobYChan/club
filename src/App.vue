<template>
    <div id="app">
        <div class="outter" :class="{'hideLeft':$route.path.split('/').length>4}">
            <header class="app-header" :class="{'header-hide':!$store.state.headerStatus}">
                <wx-header></wx-header>
            </header>
            <transition name="router-fade" mode="out-in">
                <router-view style="padding-top: 3rem;"></router-view>
            </transition>
        </div>
        <!--其他店内页集合 有过渡效果-->
        <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
            <router-view name="subPage"></router-view>
        </transition>
        <loading v-model="isLoading"></loading>
    </div>
</template>

<script>
    import { Loading } from 'vux'
    import { mapState } from 'vuex'
    import rem from './config/rem.js'
    import WxHeader from './components/header/header'
    export default {
        components: {
            Loading,
            WxHeader
        },
        name: 'app',
        data() {
            return {
                "enterAnimate": "", //页面进入动效
                "leaveAnimate": "" //页面离开动效
            }
        },
        created() {
            
        },
        computed: {
            ...mapState({
                isLoading: state => state.common.isLoading
            })
        },
        watch: {
            // 监听 $route 为店内页设置不同的过渡效果
            "$route"(to, from) {
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length

                this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
                this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"
                // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
                if (toDepth >= 5) {
                    this.leaveAnimate = "animated fadeOutRight"
                }
                switch (to.path.split('/')[1]) {
                    case '':
                        document.title = "社区圈子";
                        return
                    case 'home':
                        document.title = "社区圈子";
                        return "社区圈子"
                    case 'activity':
                        document.title = "社区活动";
                        return "社区活动"
                    case 'message':
                        document.title = "社区消息";
                        return "社区消息"
                    case 'article':
                        document.title = "社区科普";
                        return "社区科普"
                }
            }
        }
    }

</script>

<style lang="scss">
    @import './common/style/common';
    @import './common/style/animate';
    @import './common/font/iconfont.css';
    #app {
        height: 100%;
    }
    
    body {
        background-color: #fbf9fe;
    }
    
    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }
    
    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }
</style>
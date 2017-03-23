<template>
    <div class="home">
        <tab-header></tab-header>
        <transition name="router-fade" mode="out-in">
            <router-view style="margin-top:44px;"></router-view>
        </transition>
        <div class="create_circle">
            <p>各种圈子福利等着你</p>
            <router-link tag="span" to="/home/join/circle/create_circle">创建圈子</router-link>
        </div>
    </div>
</template>

<script>
    import TabHeader from "../tab/tab"
    export default {
        components: {
            TabHeader
        },
        data() {
            return {

            }
        }
    }

</script>

<style lang="scss">
    .router-fade-enter-active,
    .router-fade-leave-active {
        transition: opacity .3s;
    }
    
    .router-fade-enter,
    .router-fade-leave-active {
        opacity: 0;
    }
    
    .home {
        padding-top: 3rem;
        .create_circle {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            background: #fafafa;
            box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
            z-index: 999;
            height: 2rem;
            line-height: 2rem;
            p {
                font-size: .75rem;
                color: #999;
                text-indent: 1rem;
            }
            span {
                font-size: .7rem;
                position: absolute;
                right: 3.75%;
                color: #1CC019;
                top: 0;
            }
        }
    }
    
    .vux-tab .vux-tab-item {
        font-size: .7rem;
    }
</style>
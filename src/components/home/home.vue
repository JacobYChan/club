<template>
    <div class="home">
        <tab-header></tab-header>
        <transition name="router-fade" mode="out-in">
            <router-view style="margin-top:2rem;"></router-view>
        </transition>
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
        },
        created() {

            if (this.$route.query.uid) {
                // 清除
                localStorage.removeItem('loginopenid')
                localStorage.setItem('loginopenid', this.$route.query.uid)
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
    
    .vux-tab .vux-tab-item {
        font-size: .7rem;
    }
</style>
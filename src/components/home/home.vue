<template>
    <div class="home">
        <tab-header></tab-header>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import TabHeader from "../tab/tab"
    export default {
        components:{
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
</style>
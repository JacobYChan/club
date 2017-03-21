<template>
    <div class="tab">
        <tab custom-bar-width="3rem">
            <tab-item selected @on-item-click="handler('')">跃动扬州圈</tab-item>
            <tab-item @on-item-click="handler('friend')">好友圈</tab-item>
            <tab-item @on-item-click="handler('join')">加入圈子</tab-item>
        </tab>
    </div>
</template>

<script>
    import { Tab, TabItem } from 'vux'
    export default {
        components: {
            Tab, 
            TabItem
        },
        data() {
            return {

            }
        },
        methods:{
            handler:function(val){
                this.$route.path.split('/')[1]="/home";
                this.$router.push(`${val}`);
            }
        }
    }

</script>

<style lang="scss">

</style>
<template>
    <div class="tab">
        <tab bar-active-color="#FF9900" active-color="#FF9900">
            <tab-item :selected="this.$route.path.split('/').length==2"  @on-item-click="handler('/home')">跃动扬州圈</tab-item>
            <tab-item :selected="this.$route.path.split('/')[2]=='friend'" @on-item-click="handler('/home/friend')">好友圈</tab-item>
            <tab-item :selected="this.$route.path.split('/')[2]=='join'" @on-item-click="handler('/home/join')">加入圈子</tab-item>
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
                this.$router.replace(`${val}`);
            }
        }
    }

</script>

<style lang="scss">
    .tab{
        position: fixed;
        z-index: 100;
        width: 100%;
        background-color:#fff;
        .vux-tab{
            height: 2rem;
            .vux-tab-item{
                line-height: 2rem;
            }
        }
    }
</style>
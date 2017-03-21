<template>
    <div class="header">
        <tab>
            <tab-item :selected="this.$route.path.split('/')[1]=='home'" @on-item-click="handler('home')"><i class="iconfont icon-friends"></i><p>圈子</p></tab-item>
            <tab-item :selected="this.$route.path.split('/')[1]=='activity'" @on-item-click="handler('activity')"><i class="iconfont icon-huodong"></i><p>活动</p></tab-item>
            <tab-item :selected="this.$route.path.split('/')[1]=='message'" @on-item-click="handler('message')"><i class="iconfont icon-xiaoxi"></i><p>消息</p></tab-item>
            <tab-item :selected="this.$route.path.split('/')[1]=='science'" @on-item-click="handler('science')"><i class="iconfont icon-xinlikepu"></i><p>科普</p></tab-item>
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
                loc:''
            }
        },
        created(){
            //    this.loc = this.$route.path.split('/')[1];
        },
        methods:{
            handler:function(site){
                this.$router.push(site);
            }
        }
       
    }

</script>

<style lang="scss">
.header{
    .vux-tab{
        height: 3rem;
        .vux-tab-item{
            line-height: 1.2;
            .iconfont{
                font-size: 1.5rem;
            }
        }
    }
}
</style>
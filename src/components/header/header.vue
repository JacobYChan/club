<template>
    <div class="header">
            <tab>
                <tab-item :selected="this.$route.path.split('/')[1]=='home'" @on-item-click="handler('/')"><i class="iconfont icon-friends"></i>
                    <p>圈子</p>
                </tab-item>
                <tab-item :selected="this.$route.path.split('/')[1]=='activity'" @on-item-click="handler('/activity')"><i class="iconfont icon-huodong"></i>
                    <p>活动</p>
                </tab-item>
                <tab-item :selected="this.$route.path.split('/')[1]=='message'" @on-item-click="handler('/message')"><i class="iconfont icon-xiaoxi"></i>
                    <p>消息</p>
                </tab-item>
                <tab-item :selected="this.$route.path.split('/')[1]=='article'" @on-item-click="handler('/article')"><i class="iconfont icon-xinlikepu"></i>
                    <p>知识</p>
                </tab-item>
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
        created() {
            //    this.loc = this.$route.path.split('/')[1];
        },
        methods: {
            handler: function (site) {
                this.$router.replace(site);
            }
        }

    }

</script>

<style lang="scss">
    .header {
        position: fixed;
        width: 100%;
        z-index: 100;
        .vux-tab {
            height: 2.5rem;
            .vux-tab-item {
                line-height: 1.2;
                .iconfont {
                    font-size: 1.2rem;
                }
            }
        }
    }
</style>
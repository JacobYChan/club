<template>
    <div class="circle_recommend">
        <template v-for="(value,key) in CircleRecommendAccountsList">
            <router-link class="circle_ceil" :to="{path:'join/circle/circleDetail',query:{circleid:item.circleid}}" tag="div" v-for="(item,index) in value"
                :key="index">
                <div class="circle_img">
                    <img :src="item.headerUrl">
                </div>
                <div class="circle_title">
                    <h3>{{item.name}}</h3>
                    <p class="ellipsis">{{item.desc}}</p>
                </div>
                </router-link>
        </template>
    </div>
</template>

<script>
    export default {
        computed: {
            // 提取圈子字母 排序，所有附近圈子被存放在 circle_recommend.js 中
            initialList: function () {
                var initialList = [],
                    circle_recommend = this.$store.state.circles_recommend,
                    max = circle_recommend.length
                for (var i = 0; i < max; i++) {
                    if (initialList.indexOf(circle_recommend[i].initial) == -1) {
                        initialList.push(circle_recommend[i].initial)
                    }
                }
                initialList.sort()
                return initialList
            },
            // 将圈子按照字母分类
            CircleRecommendAccountsList() {
                var circle_recommendList = {},
                    circle_recommend = this.$store.state.circles_recommend,
                    max = circle_recommend.length;
                for (var i = 0; i < this.initialList.length; i++) {
                    var protoTypeName = this.initialList[i]
                    circle_recommendList[protoTypeName] = []
                    for (var j = 0; j < max; j++) {
                        if (circle_recommend[j].initial === protoTypeName) {
                            circle_recommendList[protoTypeName].push(circle_recommend[j])
                        }
                    }
                }
                return circle_recommendList
            }
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_recommend {
        padding: .5rem;
        background-color: #f9f9f9;
        .circle_ceil {
            border-bottom: 1px solid #ddd;
            padding: .5rem 0;
            position: relative;
            display: flex;
            .circle_img {
                @include wh(2rem, 2rem);
                img {
                    @include wh(2rem, 2rem);
                }
            }
            .circle_title {
                margin-left: .5rem;
                line-height: 1.5;
                width: 80%;
                h3 {
                    @include sc(.8rem, #333);
                    font-weight: normal;
                    margin-top: -.1rem;
                }
                p {
                    @include sc(.5rem, #999);
                }
            }
        }
    }
</style>
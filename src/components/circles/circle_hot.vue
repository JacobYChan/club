<template>
    <div class="circle_hot">
        <template v-for="(value,key) in CircleHotAccountsList">
            <router-link class="circle_ceil" :to="{path:'circle/circleDetail',query:{circleid:item.circleid}}" tag="div" v-for="(item,index) in value"
                :key="index">
                <div class="circle_img">
                    <img :src="item.headerUrl">
                </div>
                <div class="circle_title">
                    <h3>{{item.name}}</h3>
                    <p class="ellipsis">{{item.desc}}</p>
                </div>
                <div class="circle_member">
                    {{item.member}}人参加
                </div>
                </router-link>
        </template>
    </div>
</template>

<script>
    export default {
        computed: {
            // 提取圈子报名人数 排序，所有附近圈子被存放在 circle_hot.js 中
            initialList: function () {
                var initialList = [],
                    circle_hot = this.$store.state.circles_hot,
                    max = circle_hot.length
                for (var i = 0; i < max; i++) {
                    if (initialList.indexOf(circle_hot[i].member) == -1) {
                        initialList.push(circle_hot[i].member)
                    }
                }
                initialList.sort(function (a, b) {
                    return b-a
                })
                return initialList
            },
            // 将圈子按照报名人数分类
            CircleHotAccountsList() {
                var circle_hotList = {},
                    circle_hot = this.$store.state.circles_hot,
                    max = circle_hot.length;
                for (var i = 0; i < this.initialList.length; i++) {
                    var protoTypeName = this.initialList[i]
                    circle_hotList[i] = []
                    for (var j = 0; j < max; j++) {
                        if (circle_hot[j].member === protoTypeName) {
                            circle_hotList[i].push(circle_hot[j])
                        }
                    }
                }
                return circle_hotList
            }
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_hot {
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
            .circle_member {
                position: absolute;
                right: .4rem;
                top: .5rem;
                @include sc(.5rem, #999);
            }
        }
    }
</style>
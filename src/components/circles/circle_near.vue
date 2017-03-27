<template>
    <div class="circle_near">
        <template v-for="(value,key) in CircleNearAccountsList">
            <router-link class="circle_ceil" :to="{path:'circle/circleDetail',query:{circleid:item.circleid}}" tag="div" v-for="(item,index) in value"
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
            // 提取圈子距离 排序，所有附近圈子被存放在 circle_near.js 中
            initialList: function () {
                var initialList = [],
                    circles_near = this.$store.state.circles_near,
                    max = circles_near.length
                for (var i = 0; i < max; i++) {
                    if (initialList.indexOf(circles_near[i].distance) == -1) {
                        initialList.push(circles_near[i].distance)
                    }
                }
                initialList.sort(function (a, b) {
                    return a - b
                })

                return initialList
            },
            // 将圈子按照距离分类
            CircleNearAccountsList() {
                var circles_nearList = {},
                    circles_near = this.$store.state.circles_near,
                    max = circles_near.length;
                for (var i = 0; i < this.initialList.length; i++) {
                    var protoTypeName = this.initialList[i]
                    circles_nearList[protoTypeName] = []
                    for (var j = 0; j < max; j++) {
                        if (circles_near[j].distance === protoTypeName) {
                            circles_nearList[protoTypeName].push(circles_near[j])
                        }
                    }
                }
                return circles_nearList
            }
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_near {
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
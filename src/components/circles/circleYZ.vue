<template>
    <div class="circleYZ">
        <ul>
            <li v-for="(item,key) in $store.state.yzCircles" :key="item.runid">
                <div class="head">
                    <div class="headImg"><img :src="item.headerUrl"></div>
                    <div class="headTitle ellipsis">
                        <h3>{{item.nickname}}</h3>
                        <p>{{item.time}}</p>
                    </div>
                    <span v-if="item.isFocus==0" class="focus" @click="">关注</span>
                </div>
                <div class="conten_title">{{item.title}}</div>
                <div class="content_img">
                    <div v-for="(src,index) in item.img" style="text-align:center;">
                        <span style="font-size:.6rem">图片加载中...</span>
                        <x-img width="200" :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error"></x-img>
                    </div>
                </div>
                <div class="bottom ellipsis">
                    <div class="location">{{item.area| filterLoc }}</div>
                    <div class="zan">
                        <div><i class="iconfont icon-dianzan-copy"></i><span>{{item.zan}}</span></div>
                        <div><i class="iconfont icon-dazhongicon04"></i>
                            <span style="top:.35rem;position:absolute;">{{item.comments|filterComment}}</span>
                        </div>
                    </div>
                </div>

            </li>
        </ul>
        <div class="addNew" @click="$router.push('home/topic/addTopic')">
            <i class="iconfont icon-zhaoxiangji"></i>
        </div>
    </div>
</template>

<script>
    import { XImg } from 'vux'
    export default {
        components: {
            XImg
        },
        filters: {
            filterLoc: function (val) {
                return val.toString();
            },
            filterComment: function (val) {
                let arr = [];
                for (let i in val) {
                    arr.push(i);
                }
                return arr.length;
            }
        },
        methods: {
            //图片加载成功和失败
            success(src, ele) {
                const span = ele.parentNode.querySelector('span')
                ele.parentNode.removeChild(span)
            },
            error(src, ele, msg) {
                const span = ele.parentNode.querySelector('span')
                span.innerText = '加载失败。。。'
            }
        },
        data() {
            return {
                options: {
                    getThumbBoundsFn(index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                        // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                        // w = width
                        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                }
            }
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circleYZ {
        ul {
            padding: .5rem;
            background-color: #f9f9f9;
            li {
                border-bottom: 1px solid #ddd;
                padding: .5rem 0;
                position: relative;
                .head {
                    line-height: 1.5;
                    display: flex;
                    position: relative;
                    .headImg {
                        @include wh(2rem, 2rem);
                        img {
                            width: 100%;
                            @include borderRadius(50%);
                        }
                    }
                    .headTitle {
                        margin-left: .5rem;
                        padding-top: .2;
                        h3 {
                            @include sc(.8rem, #333);
                            font-weight: normal;
                        }
                        p {
                            @include sc(.5rem, #999);
                        }
                    }
                    .focus {
                        width: 2.5rem;
                        line-height: 2;
                        @include sc(.5rem, #1CC019);
                        text-align: center;
                        background: darken(#F5F5F5, 5%);
                        border: 0px solid #E5E5E5;
                        border-radius: 1px;
                        position: absolute;
                        right: .5rem;
                        top: .3rem;
                    }
                }
                .conten_title {
                    @include sc(.75rem, #333);
                    margin: .4rem 0;
                    line-height: 1.6;
                }
                .content_img {
                    display: flex;
                    margin-top: .2rem;
                    div {
                        padding: .1rem;
                        img {
                            width: 100%;
                        }
                    }
                }
                .bottom {
                    display: flex;
                    .location {
                        @include sc(.5rem, #576B95);
                        padding-top: .6rem;
                        flex: 1.5;
                    }
                    .zan {
                        margin-top: .2rem;
                        position: relative;
                        div {
                            margin-right: .8rem;
                            display: inline;
                            i {
                                @include sc(.8rem, #576B95);
                                margin-right: .2rem;
                            }
                            span {
                                @include sc(.5rem, #576B95);
                                font-weight: normal;
                            }
                        }
                    }
                }
            }
        }
        .addNew{
            background-color: #1CC019;
            @include wh(2rem,2rem);
            padding: .3rem;
            @include borderRadius(50%);
            position: fixed;
            bottom: 1.5rem;
            right: 1rem;
            text-align: center;
            line-height: 1.8;
            i{
                @include sc(1.2rem,#fff);
            }
        }
    }
</style>
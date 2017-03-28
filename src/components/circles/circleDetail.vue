<template>
    <div class="circle_detail">
        <x-header>{{circleInfo.name}}</x-header>
        <div class="circle_head">
            <div class="headImg">
                <img :src="circleInfo.headerUrl">
            </div>
            <div class="title">
                <h3>{{circleInfo.name}}</h3>
                <p>圈子ID：{{circleInfo.circleid}}</p>
            </div>
        </div>
        <div class="circle_title">圈子动态</div>
        <div class="circle_affairs">
            <template v-for="(value,key) in $store.getters.friendsList">
                <!--点赞数排序-->
                <div class="cells" v-for="item in value">
                    <div class="head">
                        <div class="headImg"><img :src="item.headerUrl"></div>
                        <div class="headTitle ellipsis">
                            <h3>{{item.nickname}}</h3>
                            <p>{{item.time|filterDate}}</p>
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
                </div>
            </template>
        </div>
        <div class="circle_join" @click="show_success=true">
            <span class="margin">加入圈子</span>
        </div>
        <toast v-model="show_success">成功加入圈子 </toast>
    </div>
</template>

<script>
    import { XHeader, XImg, dateFormat, Toast } from 'vux'
    // import circles from "../../store/circles_near"
    export default {
        components: {
            XHeader,
            XImg,
            dateFormat,
            Toast
        },
        computed: {
            circleInfo() {
                return circles.getCircleInfo(this.$route.query.circleid)
            }
        },
        data() {
            return {
                show_success: false,
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
            },
            filterDate: function (val) {
                if ((new Date().getTime() - new Date(val.replace(/-/, "/"))) / 1000 < 60) {
                    return "1分钟前"
                } else if ((new Date().getTime() - new Date(val.replace(/-/, "/"))) / 1000 < 600) {
                    return "5分钟前"
                } else if ((new Date().getTime() - new Date(val.replace(/-/, "/"))) / 1000 < 900) {
                    return "10分钟前"
                } else if ((new Date().getTime() - new Date(val.replace(/-/, "/"))) / 1000 < 5000) {
                    return "1小时前"
                } else if ((new Date().getTime() - new Date(val.replace(/-/, "/"))) / 1000 < 10000) {
                    return "2小时前"
                } else if ((new Date().getTime() - new Date(val.replace(/-/, "/"))) / 1000 < 100000) {
                    return "1天前"
                } else if ((new Date().getTime() - new Date(val.replace(/-/, "/"))) / 1000 < 200000) {
                    return "2天前"
                } else {
                    return dateFormat(val, 'MM-DD HH:mm')
                }

            }
        },
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_detail {
        .weui-icon_toast {
            margin: 22px 0 10px 0;
        }
        .circle_head {
            display: flex;
            border-bottom: 1px solid #ddd;
            padding: .5rem;
            background-color: #f9f9f9;
            .headImg {
                @include wh(3rem, 3rem);
                img {
                    width: 100%;
                    @include borderRadius(50%);
                }
            }
            .title {
                margin-left: 1rem;
                line-height: 1.8;
                width: 80%;
                h3 {
                    @include sc(.8rem, #000);
                    font-weight: normal;
                    margin-top: .1rem;
                }
                p {
                    @include sc(.5rem, #999);
                }
            }
        }
        .vux-header {
            background-color: #eee;
            border-bottom: 1px solid #ddd;
            .vux-header-left {
                a {
                    color: #1CC019;
                }
                .left-arrow {
                    &:before {
                        border: 1px solid #1CC019;
                        border-width: 1px 0 0 1px;
                    }
                }
            }
            .vux-header-title {
                color: #000;
            }
        }
        .circle_title {
            @include sc(.7rem, #333);
            padding: .5rem;
        }
        .circle_affairs {
            padding: .5rem;
            background-color: #f9f9f9;
            margin-bottom: 1.5rem;
            .cells {
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
        .circle_join {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            background: #fafafa;
            box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
            z-index: 999;
            height: 2rem;
            line-height: 2rem;
            span {
                @include sc(.7rem, #666);
            }
        }
    }
</style>
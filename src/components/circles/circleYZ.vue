<template>
    <div class="circleYZ">
        <template v-for="(value,key) in circles_yz_list" class="content">
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
                        <x-img :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error"></x-img>
                    </div>
                </div>
                <div class="bottom ellipsis">
                    <!--<div class="location">{{item.area| filterLoc }}</div> -->
                    <div class="zan">
                        <div><i class="iconfont icon-dianzan-copy"></i><span>{{item.zan}}</span></div>
                        <div><i class="iconfont icon-dazhongicon04"></i>
                            <span style="top:.35rem;position:absolute;">{{item.comments|filterComment}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="addNew" @click="$router.push('home/circle/topic/addTopic')">
            <i class="iconfont icon-zhaoxiangji"></i>
        </div>
    </div>
</template>

<script>
    import { XImg, dateFormat } from 'vux'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            XImg,
            dateFormat
        },
        filters: {
            // filterLoc: function (val) {
            //     return val.toString();
            // },
            filterComment: function (val) {
                let arr = [];
                for (let i in val) {
                    arr.push(i);
                }
                return arr.length;
            },
            filterDate: function (val) {
                let now = Date.parse(new Date()) / 1000;
                // console.log(now - val);
                if ((now - val) < 600 && (now - val) >= 60) {
                    return "1分钟前"
                } else if ((now - val) < 1200 && (now - val) >= 600) {
                    return "5分钟前"
                } else if ((now - val) < 6000 && (now - val) >= 1200) {
                    return "10分钟前"
                } else if ((now - val) < 12000 && (now - val) >= 6000) {
                    return "1小时前"
                } else if ((now - val * 1) < 120000 && (now - val) >= 12000) {
                    return "2小时前"
                } else if ((now - val * 1) < 240000 && (now - val) >= 120000) {
                    return "1天前"
                } else if ((now - val * 1) && (now - val) >= 240000) {
                    return "2天前"
                } else {
                    return dateFormat(val * 1000, 'MM-DD HH:mm')
                }

            }
        },
        created() {
        //     if (this.sportsList.length == 0) {
                this.$store.dispatch('get_circles_yz_list')
        //     }
        },
        computed: {
            ...mapGetters([
                'circles_yz_list'
            ])
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
        padding: .5rem;
        background-color: #f9f9f9;
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
                text-align: right;
                // .location {
                //     @include sc(.5rem, #576B95);
                //     padding-top: .6rem;
                //     flex: 1.5;
                // }
                .zan {
                    margin-top: .2rem;
                    position: relative;
                    width: 100%;
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
    
    .addNew {
        background-color: #1CC019;
        @include wh(2rem, 2rem);
        padding: .3rem;
        @include borderRadius(50%);
        position: fixed;
        bottom: 1.5rem;
        right: 1rem;
        text-align: center;
        line-height: 1.8;
        i {
            @include sc(1.2rem, #fff);
        }
    }
</style>
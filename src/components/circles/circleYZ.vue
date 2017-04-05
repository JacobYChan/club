<template>
    <div class="circleYZ">
        <template v-for="(value,key) in circles_yz_list" class="content">
            <!--按时间排序-->
            <div class="cells" v-for="item in value">
                <div class="head">
                    <div class="headImg"><img :src="item.headerurl"></div>
                    <div class="headTitle ellipsis">
                        <h3>{{item.nickname}}</h3>
                        <p>{{item.time|filterDate}}</p>
                    </div>
                    <span v-if="item.isfocus==0" class="focus" @click="_focus(item.uid)">关注</span>
                </div>
                <div class="conten_title">{{item.title}}<br>{{item.content}}</div>
                <div class="content_img">
                    <div v-for="(src,index) in item.img" style="text-align:center;">
                        <span style="font-size:.6rem">图片加载中...</span>
                        <x-img width="200" :src="src" :webp-src="`${src}?type=webp`" @on-success="success" @on-error="error"></x-img>
                    </div>
                </div>
                <flexbox orient="vertical" class="comment" v-show="item.comments!=0">
                    <flexbox-item v-for="user in item.reply" :key="user.id">
                        <div class="flex-demo"><span>{{user.user.name}}:</span>{{user.content}}</div>
                    </flexbox-item>
                </flexbox>
                <div class="bottom ellipsis">
                    <div class="location">
                        <search @on-submit="addComment(item.id,key)" :autoFixed="false" v-model="commentValue[key]" position="absolute" placeholder="评论"></search>
                    </div>
                    <div class="zan">
                        <div @click="_i_like(item.id)"><i class="iconfont icon-dianzan-copy"></i><span>{{item.likes}}</span></div>
                        <div><i class="iconfont icon-dazhongicon04"></i>
                            <span style="top:.35rem;position:absolute;">{{item.comments}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="addNew" @click="$router.push('home/circle/topic/addTopic')">
            <i class="iconfont icon-zhaoxiangji"></i>
        </div>
        <toast v-model="show_success">{{successMsg}} </toast>
        <toast type="cancel" v-model="show_error"> {{errorMsg}} </toast>
    </div>
</template>

<script>
    import { XImg, dateFormat, Search, Flexbox, FlexboxItem, Toast } from 'vux'
    import { mapGetters } from 'vuex'
    import api from '../../fetch/api'
    import { count } from '../../config/mUtils'

    export default {
        components: {
            XImg,
            dateFormat,
            Search,
            Flexbox,
            FlexboxItem,
            Toast
        },
        filters: {
            // filterLoc: function (val) {
            //     return val.toString();
            // },
            // filterComment: function (val) {
            //     let arr = [];
            //     for (let i in val) {
            //         arr.push(i);
            //     }
            //     return arr.length;
            // },
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

        },
        computed: {
            ...mapGetters([
                'circles_yz_list'
            ])
        },
        methods: {
            _focus(focusid) {
                let data = {
                    uid: localStorage.getItem('loginopenid'),
                    focusid: focusid,
                }
                api.userinfo_focus(data).then(res => {
                    console.log(res)
                    if (res.retcode == 200) {
                        this.$store.dispatch('circles_yz_list', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            addComment(did, key) {
                var num = count(this.circles_yz_list)
                for (var i = 0; i < num; i++) {
                    this.commentValue.push('')
                }
                let data = {
                    uid: localStorage.getItem('loginopenid'),
                    did: did,
                    content: this.commentValue[key],
                }
                console.log(data);
                api.v3_dynamic_reply(data).then(res => {
                    console.log(res)
                    if (res.retcode == 200) {
                        this.show_success = true;
                        this.successMsg = "评论成功"
                        this.$store.dispatch('get_circles_yz_list', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
                        this.commentValue[key] = ""
                    } else {
                        this.show_error = true;
                        this.errorMsg = res.errmsg;
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            _i_like(did) {
                let data = {
                    uid: localStorage.getItem('loginopenid'),
                    did: did,
                }
                console.log(data);
                api.v3_dynamic_likes(data).then(res => {
                    console.log(res)
                    if (res.retcode == 200) {
                        this.show_success = true;
                        this.successMsg = "点赞成功"
                        this.$store.dispatch('get_circles_yz_list', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
                    } else {
                        this.show_error = true;
                        this.errorMsg = res.errmsg;
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
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
                successMsg: '',
                show_success: false,
                show_error: false,
                errorMsg: '',
                commentValue: [],
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
                        height: auto;
                    }
                }
            }
            .comment {
                background-color: #EFEFF4;
                .flex-demo {
                    @include sc(.7rem, #333);
                    padding: .2rem .5rem;
                    span {
                        color: #1CC019;
                        margin-right: .2rem;
                    }
                }
            }
            .bottom {
                display: flex;
                text-align: right;
                margin-top: .5rem;
                .location {
                    .weui-search-bar {
                        padding: 0;
                        .weui-search-bar__cancel-btn {
                            display: none;
                        }
                        .weui-search-bar__box {
                            padding-left: 5px;
                        }
                        .weui-icon-search {
                            &:before {
                                content: '';
                            }
                        }
                    }
                    .weui-search-bar__label {
                        background-color: #EFEFF4;
                        text-align: left;
                        z-index: -99999;
                    }
                    .weui-search-bar__cancel-btn {
                        font-size: .7rem;
                    }
                }
                .zan {
                    margin-top: .2rem;
                    position: relative;
                    flex: 1;
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
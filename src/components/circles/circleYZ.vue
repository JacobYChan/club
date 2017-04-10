<template>
    <div class="circleYZ">
        <!--<scroller lock-x scrollbar-y ref="scroller" :pullup-config="pullupConfig" :pulldown-config="pulldownConfig" @on-pullup-loading="loadMore"
                @on-pulldown-loading="refresh" v-model="status" use-pulldown use-pullup height="20.5rem">
                <div class="scroller"> -->
        <template v-for="(value,key) in circles_yz_list"
                  class="content">
            <!--按时间排序-->
            <router-link class="cells"
                         :to="{path:''}"
                         tag="div"
                         v-for="(item,index) in value"
                         :key="index">
                <section class="head">
                    <section class="headImg"><img :src="item.headerurl"></section>
                    <section class="headTitle ellipsis">
                        <h3>{{item.nickname}}</h3>
                        <p>{{item.time|filterDate}}</p>
                    </section>
                    <span v-if="item.isfocus==0"
                          class="focus"
                          @click="_focus(item.uid)">关注</span>
                    <span v-else
                          class="focus">已关注</span>
                </section>
                <section class="conten_title">{{item.title}}
                    <br v-if="item.title!==null">{{item.content}}</section>
                <section class="content_img">
                    <section v-for="(src,index) in item.img"
                             style="text-align:center;">
                        <span style="font-size:.6rem">图片加载中...</span>
                        <x-img width="200"
                               :src="src"
                               container=".xs-container"
                               @on-success="success"
                               @on-error="error"></x-img>
                    </section>
                </section>
                <flexbox orient="vertical"
                         class="comment"
                         v-show="item.comments!=0">
                    <flexbox-item v-for="user in item.reply"
                                  :key="user.id">
                        <section class="flex-demo"><span>{{user.user.name}}:</span>{{user.content}}</section>
                    </flexbox-item>
                </flexbox>
                <section class="bottom ellipsis">
                    <section class="location">
                        <form class="subForm"
                              onsubmit="return false">
                            <input type="text"
                                   v-model="commentValue[key]"
                                   placeholder="评论"
                                   class="weui-search-bar__input">
                            <input type="submit"
                                   value="提交"
                                   class="subBtn"
                                   @click="addComment(item.id,key)">
                        </form>
                        <!--<search @on-submit="addComment(item.id,key)" :autoFixed="false" v-model="commentValue[key]" position="absolute" placeholder="评论"></search> -->
                    </section>
                    <section class="zan">
                        <section @click="_i_like(item.id)"><i class="iconfont icon-dianzan-copy"></i><span>{{item.likes}}</span></section>
                        <section><i class="iconfont icon-dazhongicon04"></i>
                            <span>{{item.comments}}</span>
                        </section>
                    </section>
                </section>
            </router-link>
        </template>
        <!--</div>
                </scroller> -->
        <div class="addNew"
             @click="$router.push('home/circle/topic/addTopic')">
            <i class="iconfont icon-zhaoxiangji"></i>
        </div>
        <toast v-model="show_success">{{successMsg}} </toast>
        <toast type="cancel"
               v-model="show_error"> {{errorMsg}} </toast>
    </div>
</template>

<script>
import { XImg, dateFormat, Search, Flexbox, FlexboxItem, Toast, Scroller, Spinner } from 'vux'
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
        Toast,
        Scroller,
        Spinner
    },
    filters: {
        filterDate: function (val) {
            let now = Date.parse(new Date()) / 1000;
            let time = now - val;
            if (time < 0) {
                return '';
            } else if (time < 30) {
                return "刚刚"
            } else if (time < 60) {
                return parseInt(time) + "秒前"
            } else if ((time / 60) < 60) {
                return parseInt((time / 60)) + '分钟前'
            } else if ((time / 3600) < 24) {
                return parseInt(time / 3600) + '小时前'
            } else if ((time / 86400) < 31) {
                return parseInt(time / 86400) + '天前'
            } else if ((time / 2592000) < 12) {
                return parseInt(time / 2592000) + '月前'
            } else {
                return parseInt(time / 31536000) + '年前'
            }
        }
    },
    created() {
        var num = count(this.circles_yz_list)
        for (let i = 0; i < num; i++) {
            this.commentValue.push('')
        }
        for (let j = 0; j < this.n; j++) {
            this.yzList.push(this.circles_yz_list[j])
        }

    },
    computed: {
        ...mapGetters([
            'circles_yz_list'
        ])
    },
    methods: {
        refresh() {
            setTimeout(() => {
                this.$nextTick(() => {
                    setTimeout(() => {
                        this.$refs.scroller.donePulldown()
                        this.pullupEnabled && this.$refs.scroller.enablePullup()
                    }, 10)
                })
            }, 2000)
        },
        loadMore() {
            setTimeout(() => {
                this.n += 10
                for (let j = this.n - 10; j < this.n; j++) {
                    this.yzList.push(this.circles_yz_list[j])
                }
                if (this.n - 10 > count(this.circles_yz_list)) {
                    this.$refs.scroller.disablePullup()
                }
                setTimeout(() => {
                    this.$refs.scroller.donePullup()
                }, 10)
            }, 2000)
        },
        _focus(focusid) {
            let data = {
                uid: localStorage.getItem('loginopenid'),
                focusid: focusid,
            }
            api.userinfo_focus(data).then(res => {

                if (res.retcode == 200) {
                    this.show_success = true;
                    this.successMsg = "关注成功"
                    this.$store.dispatch('get_circles_yz_list', { begin: 0, offset: 1000, uid: localStorage.getItem('loginopenid') })
                } else {
                    this.show_error = true;
                    this.errorMsg = res.errmsg;
                }
            }).catch(error => {
            })
        },
        addComment(did, key) {
            let data = {
                uid: localStorage.getItem('loginopenid'),
                did: did,
                content: this.commentValue[key],
            }
            api.v3_dynamic_reply(data).then(res => {

                if (res.retcode == 200) {
                    this.show_success = true;
                    this.successMsg = "评论成功"
                    this.$store.dispatch('get_circles_yz_list', { begin: 0, offset: 1000, uid: localStorage.getItem('loginopenid') })
                    this.commentValue[key] = ""
                    window.blur()
                } else {
                    this.show_error = true;
                    this.errorMsg = res.errmsg;
                }
            }).catch(error => {
            })
        },
        _i_like(did) {
            let data = {
                uid: localStorage.getItem('loginopenid'),
                did: did,
            }
            api.v3_dynamic_likes(data).then(res => {

                if (res.retcode == 200) {
                    this.show_success = true;
                    this.successMsg = "点赞成功"
                    this.$store.dispatch('get_circles_yz_list', { begin: 0, offset: 1000, uid: localStorage.getItem('loginopenid') })
                } else {
                    this.show_error = true;
                    this.errorMsg = res.errmsg;
                }
            }).catch(error => {
            })
        },
        //图片加载成功和失败
        success(src, ele) {
            const span = ele.parentNode.querySelector('span')
            ele.parentNode.removeChild(span)
        },
        error(src, ele, msg) {
            console.log("error" + "====================")
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
            status: {
                pullupStatus: 'default',
                pulldownStatus: 'default'
            },
            pullupConfig: {
                content: '上拉加载更多',
                downContent: '松开进行加载',
                upContent: '上拉加载更多',
                loadingContent: '加载中...'
            },
            pulldownConfig: {
                content: '下拉刷新',
                downContent: '下拉刷新',
                upContent: '释放刷新',
                loadingContent: '加载中...'
            },
            n: 10,
            yzList: [],
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
    .xs-plugin-pulldown-container {
        @include sc(.7rem, #333);
    }
    .xs-plugin-pulldown-loading {
        @include sc(.7rem, #333);
    }
    .xs-plugin-pullup-container {
        @include sc(.7rem, #333);
    }
    .rotate {
        display: inline-block;
        transform: rotate(-180deg);
    }
    .pullup-arrow {
        transition: all linear 0.2s;
        color: #666;
        font-size: 25px;
    } // .scroller {
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
            section {
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
                .subForm {
                    border-radius: .2rem;
                    width: 80%;
                    .weui-search-bar__input {
                        width: 100%;
                        border: 0;
                        font-size: .7rem;
                        box-sizing: content-box;
                        background-color: #eee;
                        padding: .25rem 0;
                    }
                    .subBtn {
                        padding: .2rem .2rem;
                        border-radius: .2rem;
                        background-color: #1CC019;
                        margin-left: -.3rem;
                        color: #fff;
                        font-size: .7rem;
                    }
                }
            }
            .zan {
                margin-top: .2rem;
                position: relative;
                flex: 1;
                text-align: right;
                section {
                    margin-right: .4rem;
                    display: inline-flex;
                    i {
                        @include sc(.8rem, #576B95);
                        margin-right: .2rem;
                    }
                    span {
                        @include sc(.7rem, #576B95);
                        font-weight: normal;
                    }
                }
            }
        } // }
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
}
</style>
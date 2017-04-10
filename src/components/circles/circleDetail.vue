<template>
    <div class="circle_detail">
        <x-header>{{circles_detail.name}}</x-header>
        <div class="circle_head">
            <div class="headImg">
                <img :src="circles_detail.icon">
            </div>
            <div class="title">
                <h3>{{circles_detail.name}}</h3>
                <p>圈子ID：{{circles_detail.id}}</p>
            </div>
        </div>
        <div class="circle_title">圈子动态</div>
        <div class="circle_affairs">
            <!--点赞数排序-->
            <div class="cells"
                 v-for="(item,key) in circles_detail_list">
                <div class="head">
                    <div class="headImg"><img :src="item.headerurl"></div>
                    <div class="headTitle ellipsis">
                        <h3>{{item.nickname}}</h3>
                        <p>{{item.time|filterDate}}</p>
                    </div>
                    <span v-if="item.isfocus==0"
                          class="focus"
                          @click="_focus(item.uid)">关注</span>
                    <span v-else
                          class="focus">已关注</span>
                </div>
                <div class="conten_title">{{item.title}}
                    <br v-if="item.title!==null">{{item.content}}</div>
                <div class="content_img">
                    <div v-for="(src,index) in item.img"
                         style="text-align:center;">
                        <span style="font-size:.6rem">图片加载中...</span>
                        <x-img width="200"
                               :src="src"
                               :webp-src="`${src}?type=webp`"
                               @on-success="success"
                               @on-error="error"></x-img>
                    </div>
                </div>
                <flexbox orient="vertical"
                         class="comment"
                         v-show="item.comments!=0">
                    <flexbox-item v-for="user in item.reply"
                                  :key="user.id">
                        <div class="flex-demo"><span>{{user.user.name}}:</span>{{user.content}}</div>
                    </flexbox-item>
                </flexbox>
                <div class="bottom ellipsis">
                    <div class="location">
                        <div class="location">
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
                        </div>
                    </div>
                    <div class="zan">
                        <div @click="_i_like(item.id)"><i class="iconfont icon-dianzan-copy"></i><span>{{item.likes}}</span></div>
                        <div><i class="iconfont icon-dazhongicon04"></i>
                            <span>{{item.comments}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="circle_join"
             @click="_add_circle"
             v-if="!circles_detail.is_in">
            <span class="margin">加入圈子</span>
        </div>
        <toast v-model="show_success">{{successMsg}} </toast>
        <toast type="cancel"
               v-model="show_error"> {{errorMsg}} </toast>
    </div>
</template>

<script>
import { XHeader, XImg, dateFormat, Toast, Search, Flexbox, FlexboxItem } from 'vux'
import { mapGetters } from 'vuex'
import api from '../../fetch/api'
import { count } from '../../config/mUtils'
export default {
    components: {
        XHeader,
        XImg,
        dateFormat,
        Toast,
        Search,
        Flexbox,
        FlexboxItem
    },
    created() {
        this.$store.dispatch('get_circles_detail', { id: this.$route.query.circleid, uid: localStorage.getItem('loginopenid') })
        this.$store.dispatch('get_circles_detail_list', { begin: 0, offset: 100, cid: this.$route.query.circleid, uid: localStorage.getItem('loginopenid') })
    },
    computed: {
        ...mapGetters([
            'circles_detail',
            'circles_detail_list'
        ])
    },
    data() {
        return {
            show_success: false,
            show_error: false,
            errorMsg: '',
            successMsg: '',
            commentValue: []
        }
    },
    methods: {
        _focus(focusid) {
            let data = {
                uid: localStorage.getItem('loginopenid'),
                focusid: focusid,
            }
            api.userinfo_focus(data).then(res => {
                if (res.retcode == 200) {
                    this.show_success = true;
                    this.successMsg = "关注成功"
                    this.$store.dispatch('get_circles_detail', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
                    this.$store.dispatch('get_circles_detail_list', { begin: 0, offset: 100, cid: this.$route.query.circleid, uid: localStorage.getItem('loginopenid') })
                } else {
                    this.show_error = true;
                    this.errorMsg = res.errmsg;
                }
            }).catch(error => {
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
            api.v3_dynamic_reply(data).then(res => {
                if (res.retcode == 200) {
                    this.show_success = true;
                    this.successMsg = "评论成功"
                    this.$store.dispatch('get_circles_detail_list', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
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
                    this.$store.dispatch('get_circles_detail_list', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
                    this.$store.dispatch('get_circles_detail', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
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
            const span = ele.parentNode.querySelector('span')
            span.innerText = '加载失败。。。'
        },
        _add_circle() {
            let data = {
                uid: localStorage.getItem('loginopenid'),
                cid: this.$route.query.circleid
            }
            api.v3_circle_join(data).then(res => {
                if (res.retcode == 200) {
                    this.show_success = true;
                    this.successMsg = "加入成功"
                } else {
                    this.show_error = true;
                    this.errorMsg = res.errmsg;
                }
            }).catch(error => {
                this.errorMsg = error;
                this.show_error = true;
            })
        }
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
                        width: 85%;
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
                    div {
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
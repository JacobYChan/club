<template>
    <div class="circleFriend">
        <template v-for="(value,key) in circles_friend_list">
            <!--点赞数排序-->
            <div class="cells"
                 v-for="(item,index) in value">
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
                    <div class="zan">
                        <div @click="_i_like(item.id)"><i class="iconfont icon-dianzan-copy"></i><span>{{item.likes}}</span></div>
                        <div><i class="iconfont icon-dazhongicon04"></i>
                            <span>{{item.comments}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </template>
        <div class="addNew"
             @click="$router.push('circle/topic/addTopic')">
            <i class="iconfont icon-zhaoxiangji"></i>
        </div>
        <toast v-model="show_success">{{successMsg}} </toast>
        <toast type="cancel"
               v-model="show_error"> {{errorMsg}} </toast>
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
                parseInt((time / 60)) + '分钟前'
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
        var num = count(this.circles_friend_list)
        for (var i = 0; i < num; i++) {
            this.commentValue.push('')
        }
        console.log(num + "========");
    },
    computed: {
        ...mapGetters([
            'circles_friend_list'
        ]),

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
                    this.$store.dispatch('get_circles_friend_list', { begin: 0, offset: 1000, isfriend: 1, uid: localStorage.getItem('loginopenid') })
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
                    this.$store.dispatch('get_circles_friend_list', { begin: 0, offset: 1000, isfriend: 1, uid: localStorage.getItem('loginopenid') })
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
                // 
                if (res.retcode == 200) {
                    this.show_success = true;
                    this.successMsg = "点赞成功"
                    this.$store.dispatch('get_circles_friend_list', { begin: 0, offset: 1000, isfriend: 1, uid: localStorage.getItem('loginopenid') })
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
.circleFriend {
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
                        padding: .3rem .2rem;
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
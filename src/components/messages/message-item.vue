<template>
    <li class="message">
        <router-link :to="{ path: '/message/find/check/detail', query: { mid: item.type, name: item.group_name}}"
            tag="div" class="message_info" v-on:click.native="toggleMsgRead">
            <div class="header-box">
                <!--未读才显示新信息数量-->
                <!-- <badge class="new-msg-count" :text="item.msg.length" v-show="!read"></badge> -->
                <div class="headImg">
                    <img :src="item.icon">
                </div>
            </div>
            <div class="desc-box">
                <div class="desc-author">{{item.group_name}}</div>
                <!--如果是个人消息-->
                <div class="desc-msg ellipsis" v-if="item.msg.length !== 0">
                    <!-- <span>{{item.msg[item.msg.length-1].content}}</span> -->
                </div>
            </div>
            <div class="desc-time" v-if="item.msg.length !== 0">
                <!-- {{item.msg[item.msg.length-1].time|filterTime}} -->
            </div>
            </router-link>
    </li>
</template>

<script>
    import { Badge, dateFormat } from 'vux'
    export default {
        props: ["item"],
        components: {
            Badge,
            dateFormat,
        },
        filters: {
            filterTime: function (value) {
                let time = value * 1000;
                return dateFormat(time, 'MM-DD');
            },
        },
        data() {
            return {
                read: this.item.read,
            }
        },
        methods: {
            //切换消息未读/已读状态
            toggleMsgRead() {
                if (this.read) {
                    return ''
                }
                this.read = true
            },
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .message {
        padding: .8rem .5rem;
        border-bottom: 1px solid #ddd;
        background-color: #fff;
        .message_info {
            display: flex;
            .header-box {
                position: relative;
                margin-right: 10px;
                .new-msg-count {
                    position: absolute;
                    font-style: normal;
                    right: -3px;
                    top: -3px;
                    z-index: 2;
                    width: .3rem;
                    height: .8rem;
                    border-radius: 50%;
                    line-height: .8rem;
                    font-size: .6rem;
                }
                .headImg {
                    @include wh(2.2rem, 2.2rem);
                    img {
                        width: 100%;
                        border-radius: 50%;
                    }
                }
            }
            .desc-box {
                width: 70%;
                line-height: 1.5;
                .desc-author {
                    @include sc(.8rem, #000);
                }
                .desc-msg {
                    @include sc(.7rem, #666);
                }
            }
            .desc-time {
                float: right;
                @include sc(.6rem, #b8b8b8);
            }
        }
    }
</style>
<template>
    <div class="messageDetail">
        <x-header>{{this.$route.query.name}}</x-header>
        <div class="message_item" v-for="item in msgInfo.msg">
            <span>{{item.time|filterDate}}</span>
            <div class="detail">
                <h3>{{item.title}}</h3>
                <p>{{item.content}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader, dateFormat } from 'vux'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            XHeader,
            dateFormat
        },
        filters: {
            filterDate: function (value) {
                let time = value * 1000;
                return dateFormat(time, 'YYYY年MM月DD日 HH时mm分');
            }
        },
        created(){
            this.$store.dispatch('get_message_sys_list', {type: 1, begin: 0,offset: 100,uid: localStorage.getItem('loginopenid')});
            this.$store.dispatch('get_message_app_list', {type: 2, begin: 0,offset: 100,uid: localStorage.getItem('loginopenid')});
        },
        computed: {
            msgInfo() {
                if (this.$route.query.mid == 1) {
                    return this.$store.state.message.messagesyslist
                } else {
                    return this.$store.state.message.messageapplist
                }
            }
        },
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .messageDetail {
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
        .message_item {
            padding: .5rem;
            text-align: center;
            span {
                background-color: #999;
                @include sc(.5rem, #fff);
                border-radius: .2rem;
                padding: .1rem;
            }
            .detail {
                background-color: #fff;
                padding: .5rem;
                text-align: left;
                margin-top: .5rem;
                h3 {
                    @include sc(.8rem, #000);
                    font-weight: normal;
                }
                p {
                    @include sc(.7rem, #000);
                    margin: .5rem 0;
                    text-indent: 1rem;
                }
            }
        }
    }
</style>
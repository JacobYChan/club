<template>
    <div class="activity_detail">
        <x-header>活动详情</x-header>
        <div class="activity_head">
            <div class="headImg">
                <img :src="activity_detail.img">
            </div>
            <div class="title">
                <h3>{{activity_detail.title}}</h3>
                <span v-if="activity_detail.uid != 0">{{activity_detail.tid|filterType(activity_type)}}</span>
                <div class="creater">
                    <!-- <img :src="activity_detail.creater.headerUrl"> -->
                    <!-- <em>{{activity_detail.creater.name}}</em> -->
                </div>
            </div>
        </div>
        <div class="activity_time">
            <h3>活动时间</h3>
            <p>{{activity_detail.stime|filterTime_p(activity_detail.etime)}}</p>
        </div>
        <div class="activity_location">
            <h3>活动地点</h3>
            <p>{{activity_detail.place}}</p>
        </div>
        <div class="activity_des">
            <h3>活动介绍</h3>
            <p>{{activity_detail.content}}</p>
        </div>
        <div class="activity_members">
            <p>他们都报名了，共{{activity_detail.enroll.length}}人</p>
            <div class="headImg">
                <img :src="item.headimg" v-for="item in activity_detail.enroll">
            </div>
        </div>
        <div class="join">
            <x-button type="primary" @click.native="_activity_enroll" v-if="!activity_detail.is_in">报名</x-button>
            <x-button type="primary" disabled v-else>已成功报名</x-button>
        </div>
        <toast v-model="show_success">报名成功 </toast>
        <toast type="cancel" v-model="show_error">{{errorMsg}} </toast>
    </div>
</template>

<script>
    import { XHeader, dateFormat, Toast, XButton } from 'vux'
    import { mapGetters } from 'vuex'
    import api from '../../fetch/api'
    export default {
        components: {
            XHeader,
            dateFormat,
            Toast,
            XButton
        },
        data() {
            return {
                show_success: false,
                errorMsg: '',
                show_error: false
            }
        },
        created() {
            this.$store.dispatch('get_activity_detail', { id: this.$route.query.activityid, uid: localStorage.getItem('loginopenid') })
            this.$store.dispatch('get_activity_type', { uid: localStorage.getItem('loginopenid') })
        },
        computed: {
            ...mapGetters([
                'activity_detail',
                'activity_type'
            ])
        },
        methods: {
            _activity_enroll() {
                let data = {
                    uid: localStorage.getItem('loginopenid'),
                    aid: this.$route.query.activityid
                }
                console.log(data);
                api.v3_activity_enroll(data).then(res => {
                    console.log(res)
                    if (res.retcode == 200) {
                        this.show_success = true;
                    }else{
                        this.show_error = true;
                        this.errorMsg = res.errmsg;
                    }
                }).catch(error => {
                    this.errorMsg = error;
                    this.show_error = true;
                    console.log(error)
                })
            }
        },
        filters: {
            filterType: function (type, val) {
                var d
                val.forEach(value => {
                    if (parseInt(value.id) == parseInt(type)) {
                        d = value.name;
                    }
                })
                return d;
            },
            filterTime_p: function (starttime, endtime) {
                let startFormat = starttime * 1000;
                let endFormat = endtime * 1000;
                var start = dateFormat(startFormat, 'MM.DD HH:mm');
                var end = dateFormat(endFormat, 'MM.DD HH:mm');
                return `${start}-${end}`;
            },
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .activity_detail {
        background-color: #fff;
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
        .weui-icon_toast {
            margin: 22px 0 10px 0;
        }
        .activity_head {
            display: flex;
            padding: .5rem 0;
            margin: 0 .5rem;
            border-bottom: 1px solid #ddd;
            .headImg {
                @include wh(3rem, 3rem);
                img {
                    width: 100%;
                    height: 100%;
                }
            }
            .title {
                margin-left: .5rem;
                h3 {
                    @include sc(.7rem, #000);
                    font-weight: normal;
                }
                span {
                    border-radius: .4rem;
                    border: 1px solid #1bc114;
                    @include sc(.4rem, #1bc114);
                    padding: .05rem .2rem;
                }
                .creater {
                    display: flex;
                    margin-top: .3rem;
                    img {
                        @include wh(1.2rem, 1.2rem);
                        border-radius: 50%;
                    }
                    em {
                        @include sc(.5rem, #666);
                        font-style: normal;
                        margin-left: .5rem;
                        margin-top: .2rem;
                    }
                }
            }
        }
        .activity_time {
            line-height: 1.8;
            border-bottom: 1px solid #ddd;
            margin: 0 .5rem;
            padding: .5rem 0;
            h3 {
                @include sc(.8rem, #000);
                font-weight: normal;
            }
            p {
                @include sc(.7rem, #000);
            }
        }
        .activity_location {
            @extend .activity_time;
            p {
                color: #1bc114;
            }
        }
        .activity_des {
            @extend .activity_time;
        }
        .activity_members {
            margin: 0 .5rem;
            padding: .5rem 0;
            @include sc(.7rem, #000);
            .headImg {
                img {
                    display: inline;
                    @include wh(2rem, 2rem);
                    border-radius: 50%;
                    margin: .5rem .3rem;
                }
            }
        }
        .join {
            padding: .5rem;
            .weui-btn {
                font-size: .8rem;
            }
        }
    }
</style>
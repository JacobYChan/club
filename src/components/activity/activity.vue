<template>
    <div class="activity">
        <scroller lock-y :scrollbar-x=false ref="scroller">
            <div class="scroller" :style="{width:calWidth+'rem'}">
                <template v-for="(value,key) in activity_official_list">
                    <router-link class="officialActivity_ceil" :to="{path:'activity/find/check/detail',query:{activityid:item.id}}" tag="div"
                        v-for="(item,index) in value" :key="index">
                        <img :src="item.img"></img>
                        <p class="ellipsis">{{item.title}}</p>
                        <i :class="{'end':item.endTime<=nowDate,'notStart':item.stime>nowDate,'start':item.stime<=nowDate&&nowDate<item.etime}">{{item.stime|filterDate(item.etime)}}</i>
                        <em>{{item.stime|filterTime(item.etime)}}</em>
                        <span> {{item.nums}}人参与</span>
                        </router-link>
                </template>
            </div>
        </scroller>
        <div class="private_activity">
            <a :href="activityUrl"><img src="../../common/images/xingsheng.jpg"></a>
        </div>
        <div class="activity_list" v-if="calLength!==0">
            <template v-for="(value,key) in activity_list">
                <router-link class="activity_ceil" :to="{path:'activity/find/check/detail',query:{activityid:item.id}}" tag="div" v-for="(item,index) in value"
                    :key="index">
                    <div class="activity_img">
                        <img :src="item.img">
                    </div>
                    <div class="activity_info">
                        <h3>{{item.title}}</h3>
                        <p>{{item.stime|filterTime_p(item.etime)}}</p>
                        <!-- <p>{{item.location}}</p> -->
                        <span>{{item.tid|filterType(activity_type)}}</span>
                    </div>
                    <div class="activity_status">
                        <span :class="{'end':item.etime<=nowDate,'notStart':item.stime>nowDate,'start':item.stime<=nowDate&&nowDate<item.etime}">{{item.stime|filterDate(item.etime)}}</span>
                        <p> {{item.nums}}人参与</p>
                    </div>
                    </router-link>
            </template>
        </div>
        <router-link tag="div" to="activity/find/create/activity" class="create_activity">
            <div></div>
            <i class="iconfont icon-iconfontxinzeng"></i>
        </router-link>
    </div>
</template>

<script>
    import { Scroller, dateFormat } from 'vux'
    import { mapGetters } from 'vuex'
    import { count } from '../../config/mUtils'
    export default {
        components: {
            Scroller,
            dateFormat
        },
        filters: {
            filterDate: function (starttime, endtime) {
                let now = Date.parse(new Date()) / 1000;
                if (now < starttime) {
                    return "未开始"
                } else if (endtime <= now) {
                    return "已结束"
                } else if (starttime <= now < endtime) {
                    return "进行中"
                }
            },
            filterTime: function (starttime, endtime) {
                let startFormat = starttime * 1000;
                let endFormat = endtime * 1000;
                var start = dateFormat(startFormat, 'MM月DD');
                var end = dateFormat(endFormat, 'MM月DD');
                return `${start}至${end}`;
            },
            filterTime_p: function (starttime, endtime) {
                let startFormat = starttime * 1000;
                let endFormat = endtime * 1000;
                var start = dateFormat(startFormat, 'MM.DD HH:mm');
                var end = dateFormat(endFormat, 'MM.DD HH:mm');
                return `${start}-${end}`;
            },
            filterType: function (type, val) {
                var d
                val.forEach(value => {
                    if (parseInt(value.id) == parseInt(type)) {
                        d = value.name;
                    }
                })
                return d;
            }
        },
        created() {
            this.$store.dispatch('get_activity_list', { begin: 0, offset: 100, uid: localStorage.getItem('loginopenid') })
            this.$store.dispatch('get_activity_type', { uid: localStorage.getItem('loginopenid') })
        },
        computed: {
            activityUrl() {
                return `http://sport.jsheyun.net/home/activity?uid=${localStorage.getItem('loginopenid')}`
            },
            ...mapGetters([
                'activity_list',
                'activity_official_list',
                'activity_type'
            ]),
            nowDate() {
                return Date.parse(new Date()) / 1000
            },
            calLength() {
                return count(this.activity_list);
            },
            calWidth() {
                console.log(count(this.activity_official_list) + "----------------------")
                return count(this.activity_official_list) * 15.6 + .5;
            },
        },
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .activity {
        background-color: #fff;
        .scroller {
            height: 9rem;
            position: relative;
            margin-top: 1rem;
            .officialActivity_ceil {
                width: 15rem;
                height: 9rem;
                display: inline-block;
                margin-left: .5rem;
                float: left;
                text-align: left;
                line-height: 1.2;
                border: 1px solid #c91642;
                padding-bottom: .2rem;
                border-radius: .3rem;
                img {
                    width: 100%;
                    height: 6rem;
                    border-radius: .2rem;
                }
                p {
                    @include sc(.7rem, #333);
                    text-align: left;
                    text-indent: .5rem;
                }
                i {
                    @include sc(.5rem, #fff);
                    padding: .15rem;
                    margin-left: .5rem;
                }
                .end {
                    background-color: #999;
                }
                .start {
                    background-color: #1dc018;
                }
                .notStart {
                    background-color: #e99931;
                }
                em {
                    font-style: normal;
                    @include sc(.7rem, #000);
                    text-indent: .5rem;
                }
                span {
                    display: block;
                    @include sc(.6rem, #333);
                    text-indent: .5rem;
                    margin-top: .2rem;
                }
                &:last-child {
                    margin-right: .5rem;
                }
            }
        }
        .private_activity {
            @include wh(15rem, 9rem);
            margin: 1rem auto;
            img {
                width: 100%;
            }
        }
        .activity_list {
            margin: 1rem .5rem;
            border: 1px solid #c91642;
            border-radius: .3rem;
            padding: .2rem 0 .2rem .3rem;
            .activity_ceil {
                display: flex;
                padding: .5rem 0;
                border-bottom: 1px solid #ddd;
                .activity_img {
                    @include wh(2rem, 2rem);
                    img {
                        width: 100%;
                        height: 100%;
                    }
                }
                .activity_info {
                    margin-left: .5rem;
                    line-height: 1.5;
                    flex: .9;
                    h3 {
                        @include sc(.7rem, #000);
                        font-weight: normal;
                    }
                    p {
                        @include sc(.5rem, #666);
                    }
                    span {
                        border-radius: .4rem;
                        border: 1px solid #1bc114;
                        @include sc(.4rem, #1bc114);
                        padding: .05rem .2rem;
                    }
                }
                .activity_status {
                    margin-right: -.5rem;
                    span {
                        font-size: .6rem;
                        padding: .1rem;
                        border: 1px solid #fff;
                        border-radius: .2rem;
                    }
                    .end {
                        border-color: #999;
                        color: #999;
                    }
                    .start {
                        border-color: #1dc018;
                        color: #1dc018;
                    }
                    .notStart {
                        border-color: #e99931;
                        color: #e99931;
                    }
                    p {
                        @include sc(.5rem, #000);
                        margin-top: 1rem;
                    }
                }
            }
        }
        .create_activity {
            position: fixed;
            right: 2rem;
            bottom: 1rem;
            border-radius: 50%;
            div {
                background-color: #fff;
                @include wh(1.3rem, 1.3rem);
                position: absolute;
                right: .65rem;
                top: .9rem;
                z-index: 2;
            }
            i {
                @include sc(2.5rem, #1bc114);
                z-index: 10;
                position: relative;
            }
        }
    }
</style>
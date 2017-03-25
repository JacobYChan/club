<template>
    <div class="activity">
        <scroller lock-y :scrollbar-x=false>
            <div class="scroller" :style="{width:calWidth+'rem'}">
                <template v-for="(value,key) in officialActivityList">
                    <router-link class="officialActivity_ceil" :to="{path:'activity/find/check/detail',query:{activityid:item.activityid}}" tag="div"
                        v-for="(item,index) in value" :key="index">
                        <img :src="item.img"></img>
                        <p class="ellipsis">{{item.name}}</p>
                        <i :class="{'end':item.endTime<=nowDate,'notStart':item.startTime>nowDate,'start':item.startTime<=nowDate&&nowDate<item.endTime}">{{item.startTime|filterDate(item.endTime)}}</i>
                        <em>{{item.startTime|filterTime(item.endTime)}}</em>
                        <span>{{item.member}}人参与</span>
                        </router-link>
                </template>
            </div>
        </scroller>
        <div class="activity_list">
            <template v-for="(value,key) in activityList">
                <router-link class="activity_ceil" :to="{path:'activity/find/check/detail',query:{activityid:item.activityid}}" tag="div"
                    v-for="(item,index) in value" :key="index">
                    <div class="activity_img">
                        <img :src="item.img">
                    </div>
                    <div class="activity_info">
                        <h3>{{item.name}}</h3>
                        <p>{{item.startTime|filterTime_p(item.endTime)}}</p>
                        <p>{{item.location}}</p>
                        <span>{{item.type|filterType}}</span>
                    </div>
                    <div class="activity_status">
                        <span :class="{'end':item.endTime<=nowDate,'notStart':item.startTime>nowDate,'start':item.startTime<=nowDate&&nowDate<item.endTime}">{{item.startTime|filterDate(item.endTime)}}</span>
                        <p>{{item.member.length}}人参与</p>
                    </div>
                    </router-link>
            </template>
        </div>
        <router-link tag="div" to="activity/find/create/activity" class="create_activity">
            <i class="iconfont icon-iconfontxinzeng"></i>
        </router-link>
    </div>
</template>

<script>
    import { Scroller, dateFormat } from 'vux'
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
            filterType: function (type) {
                switch (parseInt(type)) {
                    case 1: return "徒步"; break;
                    case 2: return "跑步"; break;
                    case 3: return "骑行"; break;
                    case 4: return "其他"; break;
                }
            }
        },
        methods: {

        },
        computed: {
            nowDate() {
                return Date.parse(new Date()) / 1000
            },
            calWidth() {
                return this.$store.state.officialActivity.length * 15.6 + .5;
            },
            // 提取官方活动开始时间和结束时间，按状态排序
            initialOfficialList: function () {
                var initialList = [],
                    officialActivity = this.$store.state.officialActivity,
                    max = officialActivity.length
                for (var i = 0; i < max; i++) {
                    if (initialList.indexOf(officialActivity[i].endTime) == -1) {
                        initialList.push(officialActivity[i].endTime)
                    }
                }
                initialList.sort(function (a, b) {
                    return b - a
                })
                return initialList
            },
            // 官方活动按状态排序
            officialActivityList() {
                var officialActivityList = {},
                    officialActivity = this.$store.state.officialActivity,
                    max = officialActivity.length;
                for (var i = 0; i < this.initialOfficialList.length; i++) {
                    var protoTypeName = this.initialOfficialList[i]
                    officialActivityList[i] = []
                    for (var j = 0; j < max; j++) {
                        if (officialActivity[j].endTime === protoTypeName) {
                            officialActivityList[i].push(officialActivity[j])
                        }
                    }
                }
                return officialActivityList
            },
            // 提取个人活动开始时间和结束时间，按状态排序
            initialList: function () {
                var initialList = [],
                    activity = this.$store.state.activity,
                    max = activity.length
                for (var i = 0; i < max; i++) {
                    if (initialList.indexOf(activity[i].endTime) == -1) {
                        initialList.push(activity[i].endTime)
                    }
                }
                initialList.sort(function (a, b) {
                    return b - a
                })
                return initialList
            },
            // 个人活动按状态排序
            activityList() {
                var activityList = {},
                    activity = this.$store.state.activity,
                    max = activity.length;
                for (var i = 0; i < this.initialList.length; i++) {
                    var protoTypeName = this.initialList[i]
                    activityList[i] = []
                    for (var j = 0; j < max; j++) {
                        if (activity[j].endTime === protoTypeName) {
                            activityList[i].push(activity[j])
                        }
                    }
                }
                return activityList
            }
        }
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
                line-height: 1.5;
                border: 1px solid #c91642;
                padding-bottom: .2rem;
                border-radius: .3rem;
                img {
                    width: 100%;
                    height: 5rem;
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
            i {
                @include sc(2.5rem, #1bc114);
            }
        }
    }
</style>
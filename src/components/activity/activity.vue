<template>
    <div class="activity">
        <scroller lock-y :scrollbar-x=false>
            <div class="scroller">
                <template v-for="(value,key) in officialActivityList">
                    <router-link class="officialActivity_ceil" :to="{path:'activity/detail',query:{activityid:item.activityid}}" tag="div" v-for="(item,index) in value"
                        :key="index">
                        <x-img :src="item.img"></x-img>
                        <p>{{item.name}}</p>
                        <i :class="getStatus">{{}}</i>
                        </router-link>
                </template>
            </div>
        </scroller>
    </div>
</template>

<script>
    import { Scroller, XImg } from 'vux'
    export default {
        components: {
            Scroller,
            XImg
        },
        computed: {
            getStatus(item) {
                let now = new Date().getTime();
                console.log(item.startTime);
                let startTime = new Date(item.startTime);
                let endTime = new Date(item.endTime);
                return {
                    "notStart": now < startTime,
                    "start": startTime <= now < endTime,
                    "end": endTime <= now
                }
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
                    officialActivityList[protoTypeName] = []
                    for (var j = 0; j < max; j++) {
                        if (officialActivity[j].endTime === protoTypeName) {
                            officialActivityList[protoTypeName].push(officialActivity[j])
                        }
                    }
                }
                return officialActivityList
            }
        }
    }

</script>

<style lang="scss">

</style>
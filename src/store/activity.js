const activities = [{
    activityid: "mls",
    name: "史上最精美奖牌来袭，可支持团队报名！",
    img: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/google-dev.JPG",
    desc: "扬州马拉松活动即将开始了，快点报名加入我们的大队伍当中吧",
    member: ["http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG","http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"],
    startTime: "1490238000",//2017/3/23 11:0:0
    endTime: "1490497200",//2017/3/26 11:0:0
    location: "宋夹城南门",
    type: "1",//1代表徒步
    creater: {
        name: "轩轩",
        headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"
    }
}, {
    activityid: "run",
    name: "相约宋夹城，让我们一起奔跑吧",
    desc: "扬州瘦西湖跑吧周末报名活动已经开始了，想参加活动的跑友请抓紧时间报名",
    img: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/google-dev.JPG",
    member: ["http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG","http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"],
    startTime: "1490497200",//2017/3/26 11:0:0
    endTime: "1490756400",//2017/3/29 11:0:0
    location: "新城吾悦广场",
    type:"2",//2代表跑步
    creater: {
        name: "刘安",
        headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"
    }
}, {
    activityid: "mls2",
    name: "史上最精美奖牌来袭，可支持团队报名！",
    img: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/google-dev.JPG",
    desc: "扬州马拉松活动即将开始了，快点报名加入我们的大队伍当中吧",
    member: ["http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG","http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"],
    startTime: "1489892400",//2017/3/19 11:0:0
    endTime: "1490238000",//2017/3/23 11:0:0
    location: "宋夹城南门",
    type:"3",//2代表骑行
    creater: {
        name: "徐翔",
        headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"
    }
}, {
    activityid: "run2",
    name: "相约宋夹城，让我们一起奔跑吧",
    desc: "扬州瘦西湖跑吧周末报名活动已经开始了，想参加活动的跑友请抓紧时间报名",
    img: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/google-dev.JPG",
    member: ["http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG","http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"],
    startTime: "1490497200",//2017/3/26 11:0:0
    endTime: "1490756400",//2017/3/29 11:0:0
    location: "新城吾悦广场",
    type:"4",//4代表其他
    creater: {
        name: "韶华",
        headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG"
    }
}]

const activity = {
    activities
}
activity.getActivityInfo = function (activityid) {
    if (!activityid) {
        return;
    } else {
        for (var index in activities) {
            if (activities[index].activityid === activityid) {
                return activities[index]
            }
        }
    }
}
export default activity
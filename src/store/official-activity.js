const officialActivities = [{
    activityid: "mls",
    name: "史上最精美奖牌来袭，可支持团队报名！",
    img: "http://wx.jsheyun.cn/activityImg_2.jpg",
    desc: "扬州马拉松活动即将开始了，快点报名加入我们的大队伍当中吧",
    member: "37",
    startTime: "1490238000",//2017/3/23 11:0:0
    endTime: "1490497200",//2017/3/26 11:0:0
    location: "宋夹城南门"
}, {
    activityid: "run",
    name: "相约宋夹城，让我们一起奔跑吧",
    desc: "扬州瘦西湖跑吧周末报名活动已经开始了，想参加活动的跑友请抓紧时间报名",
    img: "http://wx.jsheyun.cn/activityImg_2.jpg",
    member: "24",
    startTime: 1490497200,//2017/3/26 11:0:0
    endTime: 1490756400,//2017/3/29 11:0:0
    location: "新城吾悦广场"
}, {
    activityid: "mls2",
    name: "史上最精美奖牌来袭，可支持团队报名！",
    img: "http://wx.jsheyun.cn/activityImg_2.jpg",
    desc: "扬州马拉松活动即将开始了，快点报名加入我们的大队伍当中吧",
    member: "37",
    startTime: 1489892400,//2017/3/19 11:0:0
    endTime: 1490238000,//2017/3/23 11:0:0
    location: "宋夹城南门"
}, {
    activityid: "run2",
    name: "相约宋夹城，让我们一起奔跑吧",
    desc: "扬州瘦西湖跑吧周末报名活动已经开始了，想参加活动的跑友请抓紧时间报名",
    img: "http://wx.jsheyun.cn/activityImg_2.jpg",
    member: "24",
    startTime: 1490497200,//2017/3/26 11:0:0
    endTime: 1490756400,//2017/3/29 11:0:0
    location: "新城吾悦广场"
}]

const officialActivity = {
    officialActivities
}
officialActivity.getOfficialActivityInfo = function (activityid) {
    if (!activityid) {
        return;
    } else {
        for (var index in officialActivities) {
            if (officialActivities[index].activityid === activityid) {
                return officialActivities[index]
            }
        }
    }
}
export default officialActivity
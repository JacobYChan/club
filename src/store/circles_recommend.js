const circles_recommend = [{
    circleid: "health",
    name: "健康就是快乐",
    headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/google-dev.JPG",
    desc: "挑战自己，获得健康，还拿红包，开心",
    initial: "J"
}, {
    circleid: "run",
    name: "跃动跑，一路爱",
    desc: "喜欢参加公益有爱心有毅力志同道合的人集结在一起",
    headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/overwatch.JPG",
    initial: "Y"
}, {
    circleid: "fly",
    name: "蝶舞飞扬",
    desc: "我们是一个跳舞的团队，我想建一个圈子大家都要运动",
    headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/frontend.JPG",
    initial: "D"
}, {
    circleid: "you",
    name: "悠悠健康圈",
    desc: "健康、快乐是我的终极目标！希望天天运动的人都健康！",
    headerUrl: "http://cdn.sinacloud.net/vue-wechat/images/OfficialAccount/xitu.JPG",
    initial: "Y"
}]
const circle_recommend = {
    circles_recommend
}
circle_recommend.getCircleInfo = function (circleid) {
    if (!circleid) {
        return;
    } else {
        for (var index in circles_recommend) {
            if (circles_recommend[index].circleid === circleid) {
                return circles_recommend[index]
            }
        }
    }
}
export default circle_recommend
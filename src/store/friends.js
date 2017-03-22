/**
 * wxid-微信id
 * initial-姓名首字母
 * headerUrl-头像地址
 * nickname-昵称
 * sex-性别 男1女0
 * remark-备注
 * signature-个性签名
 * telphone-电话号码
 * album-相册
 * area-地区
 * from-来源
 * desc-描述
 */
const friends = [{ //昵称备注都有的朋友
    "runid": "runid_jinxuan",
    "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/header01.png",
    "nickname": "轩轩",
    "sex": 1,
    "telphone": 18896586152,
    "area": ["扬州市", "邗江区", "三盛国际广场"],
    "zan": 5,
    "comments": [{
        nickname: '刘安',
        comment: "怎么长这么帅？"
    }, {
        nickname: '刘安',
        comment: "怎么长这么帅呢？"
    },]
}, {
    "runid": "runid_liuan",
    "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/baiqian.jpg",
    "nickname": "刘安",
    "sex": 1,
    "telphone": 18896586152,
    "area": ["扬州市", "邗江区", "三盛国际广场"],
    "zan": 4,

}, {
    "runid": "runid_xuxiang",
    "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/baiqian.jpg",
    "nickname": "徐翔",
    "sex": 1,
    "telphone": 18896586152,
    "area": ["扬州市", "邗江区", "三盛国际广场"],
    "zan": 1,
}]

const friend = {
    friends
}
friend.getUserInfo = function (runid) {
    if (!runid) {
        return;
    } else {
        for (var index in friends) {
            if (friends[index].runid === runid) {
                return friends[index]
            }
        }
    }
}

export default friend
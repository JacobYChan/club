
const yzCircles = [
        { //昵称备注都有的朋友
            "runid": "runid_jinxuan",
            "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/baiqian.jpg",
            "nickname": "轩轩",
            "sex": 1,
            "telphone": 18896586152,
            "area": ["扬州市", "邗江区", "三盛国际广场"],
            "zan": 5,
            "comments": [{
                "nickname": '刘安',
                "comment": "怎么长这么帅？"
            }, {
                "nickname": '刘安',
                "comment": "怎么长这么帅呢？"
            }],
            "title": '今个天气真不错啊',
            "img": ["http://fhg.jsheyun.net/upload/shop/store/goods/13/13_05261577105497673_480.jpg", "http://fhg.jsheyun.net/upload/shop/store/goods/116/116_05413372440496267_480.jpg"],
            "time": '2017-3-22 7:00',
            "isFocus": 0
        }, {
            "runid": "runid_liuan",
            "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/baiqian.jpg",
            "nickname": "刘安",
            "sex": 1,
            "telphone": 18896586152,
            "area": ["扬州市", "邗江区", "三盛国际广场"],
            "zan": 10,
            "title": '越运动越健康',
            "img": ["http://fhg.jsheyun.net/upload/shop/store/goods/13/13_05261577105497673_480.jpg", "http://fhg.jsheyun.net/upload/shop/store/goods/116/116_05413372440496267_480.jpg","http://fhg.jsheyun.net/upload/shop/store/goods/116/116_05416241731921873_480.jpg"],
            "time": '2017-3-22 5:00',
            "isFocus": 0
        }, {
            "runid": "runid_xuxiang",
            "headerUrl": "https://sinacloud.net/vue-wechat/images/headers/baiqian.jpg",
            "nickname": "徐翔",
            "sex": 1,
            "telphone": 18896586152,
            "area": ["扬州市", "邗江区", "三盛国际广场"],
            "zan": 1,
            "title": '变化无常的天气，真是郁闷啊',
            "img": ["http://fhg.jsheyun.net/upload/shop/store/goods/13/13_05261577105497673_480.jpg"],
            "time": '2017-3-22 11:00',
            "isFocus": 0
        }
    ]


const yzCircle = {
    yzCircles
}
yzCircle.getUserInfo = function (runid) {
    if (!runid) {
        return;
    } else {
        for (var index in yzCircles) {
            if (yzCircles[index].runid === runid) {
                return yzCircles[index]
            }
        }
    }
}

export default yzCircle
const getters = {

    //  从好友中提取出时间 再排序 

    friendsInitialList: state => {
        var initialList = [],
            allFriends = state.allFriends,
            max = allFriends.length
        for (var i = 0; i < max; i++) {
            if (initialList.indexOf(allFriends[i].time) == -1) {
                initialList.push(allFriends[i].time)
            }
        }
        initialList.sort(function (a, b) {
            return b - a
        })
        return initialList
    },

    //  从扬州圈子联系人中提取出点赞数 再排序 

    yzCirclesInitialList: state => {
        var yzInitialList = [],
            allCircles = state.yzCircles,
            max = allCircles.length
        for (var i = 0; i < max; i++) {
            if (yzInitialList.indexOf(allCircles[i].zan) == -1) {
                yzInitialList.push(allCircles[i].zan)
            }
        }
        yzInitialList.sort(function (a, b) {
            return b - a
        })
        return yzInitialList
    },

    // 将朋友根据时间进行分类
    friendsList: (state, getters) => {
        var friendsList = {},
            allFriends = state.allFriends,
            max = allFriends.length;
        for (var i = 0; i < getters.friendsInitialList.length; i++) {
            var protoTypeName = getters.friendsInitialList[i]
            friendsList[protoTypeName] = []
            for (var j = 0; j < max; j++) {
                if (allFriends[j].time === protoTypeName) {
                    friendsList[protoTypeName].push(allFriends[j])
                }
            }
        }
        return friendsList
    },


    // 将扬州圈子联系人根据点赞数进行分类、排序
    yzCirclesList: (state, getters) => {
        var yzCirclesList = {},
            allCircles = state.yzCircles,
            max = allCircles.length;
        for (var i = 0; i < getters.yzCirclesInitialList.length; i++) {
            var protoTypeName = getters.yzCirclesInitialList[i]
            yzCirclesList[i] = []
            for (var j = 0; j < max; j++) {
                if (allCircles[j].zan === protoTypeName) {
                    yzCirclesList[i].push(allCircles[j])
                }
            }
        }
        return yzCirclesList
    }
}

export default getters
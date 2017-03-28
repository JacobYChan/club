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

}

export default getters
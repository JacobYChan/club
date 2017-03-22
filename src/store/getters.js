const getters = {

    //  从联系人中提取出点赞数 再排序 

    friendsInitialList: state => {
        var initialList = [],
            allFriends = state.allFriends,
            max = allFriends.length
        for (var i = 0; i < max; i++) {
            if (initialList.indexOf(allFriends[i].zan) == -1) {
                initialList.push(allFriends[i].zan)
            }
        }
        return initialList.sort()
    },

    // 将联系人根据首字母进行分类
    friendsList: (state, getters) => {
        var friendsList = {},
            allFriends = state.allFriends,
            max = allFriends.length;
        for (var i = 0; i < getters.friendsInitialList.length; i++) {
            var protoTypeName = getters.friendsInitialList[i]
            friendsList[protoTypeName] = []
            for (var j = 0; j < max; j++) {
                if (allFriends[j].zan === protoTypeName) {
                    friendsList[protoTypeName].push(allFriends[j])
                }
            }
        }
        return friendsList
    }
}

export default getters
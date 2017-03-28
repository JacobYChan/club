const mutations = {
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    },
    toggleTipsStatus(state, status) {
        if (status == -1) {
            state.tipsStatus = false
        } else {
            state.tipsStatus = !state.tipsStatus
        }
    },
}
export default mutations
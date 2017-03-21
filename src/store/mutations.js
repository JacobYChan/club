
import {
    setStore,
    getStore,
} from '../config/mUtils'

const mutations = {
    updateLoadingStatus(state, payload) {
        state.isLoading = payload.isLoading
    }
}
export default mutations
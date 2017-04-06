import api from '../../fetch/api'
import * as types from '../mutation-types';

const state = {
    articlecategory : [],
	articlelist: [],
    articledetail: [],
}

const actions = {
    get_article_category_list({ commit }) {
        api.v3_article_getcategory().then(res => {
            commit(types.GET_ARTICLE_CATEGORY_LIST, res)
// 
        })
    },
    get_article_list({ commit }, id) {
        api.v3_article_list(id).then(res => {
            commit(types.GET_ARTICLE_LIST, res)
// 
        })
    },
    get_article_detail({ commit }, id) {
        api.v3_article_article(id).then(res => {
            commit(types.GET_ARTICLE_DETAIL, res)
// 
        })
    },
}

const getters = {
    articlecategory: state => state.articlecategory,
    articletext: state => {
        var article_text_list = [],
            articlelist = state.articlelist;
        articlelist.forEach(value => {
            if (value.url == "") {
                value.url = `/article/detail/show/${value.id}`;
            }
            value['src'] = value.img;
            value['desc'] = value.describtion;
        })
        article_text_list = articlelist;
        return article_text_list;
    },
    articleimg: state => {
        var article_img_list = [],
            articlelist = state.articlelist;
        articlelist.forEach(value => {
            if (value.url == "") {
                value.url = `/article/detail/show/${value.id}`;
            }
        })
        article_img_list = articlelist;
        return article_img_list.slice(0, 3);
    },
    articledetail: state => state.articledetail,
}

const mutations = {
    [types.GET_ARTICLE_CATEGORY_LIST](state, res) {
        state.articlecategory = res.retdata
    },
    [types.GET_ARTICLE_LIST](state, res) {
        state.articlelist = res.retdata
    },
    [types.GET_ARTICLE_DETAIL](state, res) {
        state.articledetail = res.retdata
    },
}

export default {
    state,
    actions,
    getters,
    mutations,
}
<template>
    <div class="articleList">
        <panel :list="articleInfo"></panel>
    </div>
</template>

<script>
    import { Panel } from 'vux'
    import articles from "../../store/articles"
    export default {
        components: {
            Panel,
        },
        computed: {
            articleInfo() {
                if(this.$route.query=''){
                    return articles.getArticleCategory('1').articles;
                }else{
                    return articles.getArticleCategory(this.$route.query.categoryid).articles;
                }
            },
        },
        data() {
            return {
                list: [],//所有文章列表
            }
        }
    }

</script>

<style lang="scss">
    .articleList {}
</style>
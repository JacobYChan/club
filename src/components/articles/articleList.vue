<template>
    <div class="articleList">
        <swiper loop auto :list="imgInfo"></swiper>
        <panel :list="articleInfo"></panel>
    </div>
</template>

<script>
    import { Panel, Swiper } from 'vux'
    import articles from "../../store/articles"

    export default {
        components: {
            Panel,
            Swiper
        },
        computed: {
            articleInfo() {
                let new_articles = [];
                new_articles = articles.getArticleCategory(this.$route.params.categoryid).articles;
                new_articles.forEach(value => {
                    if (value.url == "") {
                        value.url = `${this.$route.path}/detail/${value.articleid}`;
                    }
                })
                this.list = new_articles;
                return this.list;
            },
            imgInfo() {
                let new_imgs = [];
                new_imgs = articles.getArticleCategory(this.$route.params.categoryid).articles;
                new_imgs.forEach(value => {
                    if (value.url == "") {
                        value.url = `${this.$route.path}/detail/${value.articleid}`;
                    }
                    this.$set(value, "img", value.src);
                })
                this.imgList = new_imgs;
                return this.imgList.slice(0, 3);
            }
        },
        data() {
            return {
                list: [],  //所有文章列表
                imgList: []//所有轮播图列表
            }
        }
    }

</script>

<style lang="scss">
    .articleList {
        .weui-panel__bd {
            .weui-media-box__bd {
                margin-top: -.5rem;
            }
        }
    }
</style>
<template>
    <div class="articleList">
        <swiper loop auto :list="articleimg"></swiper>
        <panel :list="articletext"></panel>
    </div>
</template>

<script>
    import { Panel, Swiper } from 'vux'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Panel,
            Swiper
        },
        created(){
            this.$store.dispatch('get_article_list', this.$route.params.categoryid)
        },
        computed: {
            ...mapGetters([
                'articletext',
                'articleimg'
            ])
        },
        methods: {
            routechanged() {
                this.$store.dispatch('get_article_list', this.$route.params.categoryid)
            },
        },
        watch: {
            // 如果路由有变化，会再次执行该方法
            $route: 'routechanged',
        },
        data() {
            return {

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
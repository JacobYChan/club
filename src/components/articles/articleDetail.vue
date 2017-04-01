<template>
    <div class="articleDetail">
        <x-header>文章详情</x-header>
        <div class="head">
            <h3>{{articledetail.title}}</h3>
            <p>{{articledetail.time|filterTime}}</p>
            <!-- <span>内容摘要：{{articledetail.describtion}}</span> -->
        </div>
        <div v-html="articledetail.content" class="content"></div>
    </div>
</template>

<script>
    import { dateFormat, XHeader } from 'vux'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            dateFormat,
            XHeader
        },
        filters: {
            filterTime: function (value) {
                let time = value * 1000;
                return dateFormat(time, 'YYYY-MM-DD HH:mm');
            },
        },
        created(){
            this.$store.dispatch('get_article_detail', this.$route.params.articleid)
        },
        computed: {
            ...mapGetters([
                'articledetail'
            ])
        },
    }

</script>

<style lang="scss">
    .articleDetail {
        .vux-header {
            background-color: #eee;
            border-bottom: 1px solid #ddd;
            .vux-header-left {
                a {
                    color: #1CC019;
                }
                .left-arrow {
                    &:before {
                        border: 1px solid #1CC019;
                        border-width: 1px 0 0 1px;
                    }
                }
            }
            .vux-header-title {
                color: #000;
            }
        }
        .head{
            padding: .5rem;
            line-height: 1.8;
            background-color:#fff; 
            h3{
                font-size: .8rem;
            }
            p{
                font-size: .6rem;
                color:#666;
            }
            span{
                font-size: .7rem;
            }
        }
        .content{
            height: 100%;
            background-color: #fff;
            padding: 0rem .5rem .5rem .5rem;
            font-size: .7rem;
            img{
                width:100%;
                height: 10rem;
            }
        }
    }
</style>
<template>
    <div class="articles">
        <scroller lock-y :scrollbar-x=false>
            <div class="scroller" :style="{width:calWidth+'rem'}">
                <router-link class="article_category" :class="{active:index==activeIndex}" :to="{path:''}"
                    tag="div" v-for="(item,index) in $store.state.articleCategory" :key="index" @click.native="activeIndex=index">
                    <span>{{item.title}}</span>
                    </router-link>
            </div>
        </scroller>
        <swiper loop auto :list="demo06_list" :index="demo06_index" @on-index-change="demo06_onIndexChange"></swiper>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { Scroller, Swiper } from 'vux'
    const baseList = [{
        url: 'javascript:',
        img: 'https://static.vux.li/demo/1.jpg',
        title: '送你一朵fua'
    }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/2.jpg',
        title: '送你一辆车'
    }, {
        url: 'javascript:',
        img: 'https://static.vux.li/demo/3.jpg',
        title: '送你一次旅行'
    }]
    const urlList = baseList.map((item, index) => ({
        url: 'http://m.baidu.com',
        img: item.img,
        title: `(可点击)${item.title}`
    }))
    export default {
        components: {
            Scroller,
            Swiper
        },
        methods: {
            demo06_onIndexChange(index) {
                this.demo06_index = index
            },
        },
        data() {
            return {
                activeIndex: 0,
                demo06_list: urlList,
                demo06_index: 0,
            }
        },
        computed: {
            calWidth() {
                return this.$store.state.articleCategory.length * 4;
                console.log(this.$route.params.id)
            },
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .articles {
        background-color: #fff;
        .scroller {
            display: flex;
            line-height: 1.8;
            .active {
                span {
                    color: #04BE02 !important;
                }
            }
            .article_category {
                @include wh(4rem, 2rem);
                text-align: center;
                span {
                    @include sc(.8rem, #000);
                }
            }
        }
    }
</style>
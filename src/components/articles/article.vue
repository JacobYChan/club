<template>
    <div class="articles">
        <scroller lock-y :scrollbar-x=false>
            <div class="scroller" :style="{width:calWidth+'rem'}">
                <router-link class="article_category"  :to="{name:'articleList',params:{categoryid:item.id}}"
                    tag="div" v-for="(item,index) in articlecategory" :key="index">
                    <span>{{item.title}}</span>
                    </router-link>
            </div>
        </scroller>
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import { Scroller } from 'vux'
    import { mapGetters } from 'vuex'

    export default {
        components: {
            Scroller
        },
        created(){
            
        },
        data() {
            return {
                
            }
        },
        computed: {
            calWidth() {
                console.log(this.articlecategory.length+"======================")
                return this.articlecategory.length * 4;
            },
            ...mapGetters([
                'articlecategory'
            ])
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
            .router-link-active {
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
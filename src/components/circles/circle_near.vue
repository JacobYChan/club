<template>
    <div class="circle_near">
        <template v-for="(value,key) in circles_near_list">
            <router-link class="circle_ceil" :to="{path:'circle/circleDetail',query:{circleid:item.id}}" tag="div" v-for="(item,index) in value"
                :key="index">
                <div class="circle_img">
                    <img :src="item.icon">
                </div>
                <div class="circle_title">
                    <h3>{{item.name}}</h3>
                    <p class="ellipsis">{{item.describtion}}</p>
                </div>
                </router-link>
        </template>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'

    export default {
        created() {
        //     if (this.sportsList.length == 0) {
                this.$store.dispatch('get_circles_near_list')
        //     }
        },
        computed: {
            ...mapGetters([
                'circles_near_list'
            ])
        },
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_near {
        padding: .5rem;
        background-color: #f9f9f9;
        .circle_ceil {
            border-bottom: 1px solid #ddd;
            padding: .5rem 0;
            position: relative;
            display: flex;
            .circle_img {
                @include wh(2rem, 2rem);
                img {
                    @include wh(2rem, 2rem);
                }
            }
            .circle_title {
                margin-left: .5rem;
                line-height: 1.5;
                width: 80%;
                h3 {
                    @include sc(.7rem, #333);
                    font-weight: normal;
                    margin-top: -.1rem;
                }
                p {
                    @include sc(.7rem, #999);
                }
            }
        }
    }
</style>
<template>
    <div class="circle_detail">
        <x-header>{{circleInfo.name}}</x-header>
        <div class="circle_head">
            <div class="headImg">
                <img :src="circleInfo.headerUrl">
            </div>
            <div class="title">
                <h3>{{circleInfo.name}}</h3>
                <p>圈子ID：{{circleInfo.circleid}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    import { XHeader } from 'vux'
    import circles from "../../store/circles_near"
    export default {
        components: {
            XHeader
        },
        computed: {
            circleInfo() {
                return circles.getCircleInfo(this.$route.query.circleid)
            }
        },
        data() {
            return {

            }
        }
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_detail {
        .circle_head {
            display: flex;
            border-bottom: 1px solid #ddd;
            padding: .5rem;
            background-color: #f9f9f9;
            .headImg {
                @include wh(3rem, 3rem);
                img {
                    width: 100%;
                }
            }
            .title {
                margin-left: .5rem;
                line-height: 1.8;
                width: 80%;
                h3 {
                    @include sc(.8rem, #000);
                    font-weight: normal;
                    margin-top: .1rem;
                }
                p {
                    @include sc(.5rem, #999);
                }
            }
        }
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
    }
</style>
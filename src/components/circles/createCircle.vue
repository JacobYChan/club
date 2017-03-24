<template>
    <div class="circle_create">
        <x-header>创建我的圈子</x-header>
        <div class="circle_title margin">
            <img src="../../common/images/circle_img.png">
            <h3>创建超牛圈子</h3>
            <p>欢迎兴趣组织、线下运动团体、企业、家庭等团体入驻！</p>
        </div>
        <divider style="font-size:.7rem">圈子说明如下</divider>
        <div class="circle_explain">
            <p>通过圈子，你可以：</p>
            <p>1、组队参加官方比赛</p>
            <p>2、组织圈子挑战赛、线下活动</p>
            <p>3、发帖、即时群聊...</p>
        </div>
        <div class="circle_notice">
            注：为了稳定和支持圈子各项功能，目前圈子设2000人上限~满员请自建分舵！
        </div>
        <div class="create">
            <x-button type="primary" @click.native="$router.push('create_circle/circle_submit')">开始申请创建圈子</x-button>
        </div>
    </div>
</template>

<script>
    import { XHeader, XButton, Divider } from 'vux'
    export default {
        components: {
            XHeader,
            XButton,
            Divider
        },
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_create {
        background-color: #fff;
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
        .circle_title {
            padding: 1rem 1rem .5rem 1rem;
            text-align: center;
            width: 75%;
            img {
                @include wh(6rem, 6rem);
            }
            h3 {
                font-weight: normal;
                @include sc(.9rem, #000);
                margin-top: .5rem;
            }
            p {
                @include sc(.7rem, #666);
                margin-top: .4rem;
            }
        }
        .circle_explain {
            padding: .5rem .7rem;
            p {
                @include sc(.8rem, #333);
                line-height: 1.7;
            }
        }
        .circle_notice{
            @include sc(.6rem,#1AAD19);
            padding: .5rem;
            line-height: 1.7;
        }
        .create{
            padding: .5rem;
            .weui-btn{
                font-size: .8rem;
            }
        }
    }
</style>
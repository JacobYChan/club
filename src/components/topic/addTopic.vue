<template>
    <div class="addTopic">
        <x-header>编写话题</x-header>
        <group>
            <x-input placeholder="标题(可选)"></x-input>
            <x-textarea :max="200" name="description" placeholder="请填写有意思的内容"></x-textarea>
        </group>
        <div class="weui_uploader_bd">
            <ul class="weui_uploader_files">
            </ul>
            <div class="weui_uploader_input_wrp" @click.stop="add">
                <input class="weui_uploader_input" accept="image/*" @change="onFileChange" type="file" multiple>
            </div>
        </div>
        <!--<div class="location ellipsis">
            <i class="iconfont icon-10"></i>
            <span>{{address}}</span>
        </div> -->
        <div class="sub">
            <x-button type="primary">完成</x-button>
        </div>
        <actionsheet v-model="show" :menus="menus" @on-click-menu-take="take" @on-click-menu-select="select" show-cancel></actionsheet>
    </div>
</template>

<script>
    import { XButton, XHeader, XTextarea, Group, XInput, Actionsheet } from 'vux'
    export default {
        components: {
            XHeader,
            XTextarea,
            Group,
            XInput,
            Actionsheet,
            XButton
        },
        data() {
            return {
                show: false,
                menus: {
                    take: '拍照',
                    select: '从相册选择'
                },
                address: "海尔空调专卖店（文汇西路店）"
            }
        },
        methods: {
            add() {
                console.log(1);
            },
             onFileChange: function (e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.createImage(files, e);
            },
        },
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .addTopic {
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
        .vux-no-group-title {
            margin-top: 0;
            &:after {
                border-bottom: none;
            }
        }
        .weui_uploader_bd {
            background-color: #fff;
            padding: 10px 15px;
            .weui_uploader_input_wrp {
                position: relative;
                margin-right: 9px;
                margin-bottom: 9px;
                @include wh(3rem, 3rem);
                border: 1px solid #d9d9d9;
                @mixin line {
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background-color: #d9d9d9;
                }
                &:before {
                    @include line;
                    @include wh(2px, 39.5px);
                }
                &:after {
                    @include line;
                    @include wh(39.5px, 2px);
                }
                input {
                    @include wh(100%, 100%);
                }
                .weui_uploader_input {
                    position: absolute;
                    z-index: 1;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    opacity: 0;
                }
            }
        }
        // .location {
        //     padding: 10px 15px;
        //     background: #fff;
        //     margin-top: 1rem;
        //     i {
        //         font-size: 1rem;
        //     }
        //     span {
        //         @include sc(.8rem, #333);
        //     }
        // }
        .sub {
            position: fixed;
            width: 100%;
            bottom: 0;
        }
    }
</style>
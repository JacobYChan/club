<template>
    <div class="addTopic">
        <x-header>编写话题</x-header>
        <group>
            <x-input placeholder="标题(可选)"></x-input>
            <x-textarea :max="200" name="description" placeholder="请填写有意思的内容"></x-textarea>
        </group>
        <div class="weui_uploader_bd">
            <ul class="weui_uploader_files">
                <li class="list-li clear" v-for="(iu, index) in imgUrls">
                    <a class="list-link" @click='previewImage(iu)'>
                        <img :src="iu">
                    </a>
                    <span class="list-img-close" @click='delImage(index)'>X</span>
                </li>
            </ul>
            <div class="weui_uploader_input_wrp">
                <input class="weui_uploader_input" accept="image/jpeg,image/jpg,image/png" @change="onFileChange" type="file" multiple>
            </div>
        </div>
        <div class="add-preview" v-show="isPreview" @click="closePreview">
            <img :src="previewImg">
        </div>
        <!--<div class="location ellipsis">
            <i class="iconfont icon-10"></i>
            <span>{{address}}</span>
        </div> -->
        <div class="sub">
            <x-button type="primary">完成</x-button>
        </div>

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
                imgUrls: [],
                isPhoto: true,
                previewImg: '',
                isPreview: false,

                // address: "海尔空调专卖店（文汇西路店）"
            }
        },
        watch: {
            imgUrls: 'toggleAddPic'
        },
        methods: {
            toggleAddPic: function () {
                let vm = this;
                if (vm.imgUrls.length >= 1) {
                    vm.isPhoto = false;
                } else {
                    vm.isPhoto = true;
                }
            },
            createImage: function (file, e) {
                for (var i = 0; i < file.length; i++) {
                    this.imgUrls.push(window.URL.createObjectURL(file[i]));
                }
            },
            delImage: function (index) {
                this.imgUrls.splice(index, 1);
            },
            previewImage: function (url) {
                let vm = this;
                vm.isPreview = true;
                vm.previewImg = url;
            },
            closePreview: function () {
                let vm = this;
                vm.isPreview = false;
                vm.previewImg = "";
            },
            saveImage: function () {
                let vm = this;
                let urlArr = [],
                    imgUrls = this.imgUrls;
                for (let i = 0; i < imgUrls.length; i++) {
                    if (imgUrls.indexOf('file') == -1) {
                        urlArr.push(imgUrls.split(',')[1]);
                    } else {
                        urlArr.push(imgUrls);
                    }
                }
                //数据传输操作
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
            .weui_uploader_files {
                .list-li {
                    @include wh(4rem, 4rem);
                    margin: .3rem;
                    display: inline-block;
                    position: relative;
                    .list-img-close {
                        position: absolute;
                        right: -.4rem;
                        top: -.5rem;
                        color: #666;
                        border: 1px solid #666;
                        border-radius: 50%;
                        width: .8rem;
                        height: .8rem;
                        text-align: center;
                        font-size: .7rem;
                    }
                    a img {
                        @include wh(4rem, 4rem)
                    }
                }
            }
        }
        .add-preview {
            background-color: #333;
            position: fixed;
            z-index: 100;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            img {
                @include center width: 95%;
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
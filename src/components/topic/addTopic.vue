<template>
    <div class="addTopic">
        <x-header>编写话题</x-header>
        <group>
            <x-input placeholder="标题(可选)" v-model="value_title"></x-input>
            <x-textarea :max="200" name="description" placeholder="请填写有意思的内容" v-model="value_content"></x-textarea>
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
        <group>
            <cell :title="title" :value="selectedOption" is-link @click.native="showPopup=true"></cell>
        </group>
        <popup v-model="showPopup">
            <div class="options">
                <p>你想发布话题到哪个圈子？</p>
                <template v-for="(value,key) in circles_near_list">
                    <cell :title="item.name" @click.native="confirmOption(item.name)" v-for="item in value">
                        <img slot="icon" style="display:block;margin-right:5px;" :src="item.icon">
                    </cell>
                </template>
            </div>
        </popup>
        <div class="sub">
            <x-button type="primary" @click.native="_add_topic">完成</x-button>
        </div>
        <toast v-model="show_success">发表成功 </toast>
        <toast type="cancel" v-model="show_error"> {{errorMsg}} </toast>
    </div>
</template>

<script>
    import { XButton, XHeader, XTextarea, Group, XInput, Actionsheet, Checker, CheckerItem, Popup, Cell, Toast } from 'vux'
    import api from '../../fetch/api'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            XHeader,
            XTextarea,
            Group,
            XInput,
            Actionsheet,
            XButton,
            Checker,
            CheckerItem,
            Cell,
            Popup,
            Toast
        },
        data() {
            return {
                show: false,
                imgUrls: [],
                isPhoto: true,
                previewImg: '',
                isPreview: false,
                value_title: '',
                value_content: '',
                showPopup: false,
                title: '发表在：',
                selectedOption: '',
                show_success: false,
                show_error: false,
                errorMsg: ''
            }
        },
        watch: {
            imgUrls: 'toggleAddPic'
        },
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
        methods: {
            confirmOption(name) {
                this.showPopup = false;
                this.selectedOption = name;
            },
            _add_topic() {
                let data = {
                    uid: localStorage.getItem('loginopenid'),
                    title: this.value_title,
                    content: this.value_content,
                    cid: 15,
                    img: JSON.stringify(this.imgUrls),
                }
                console.log(data);
                api.v3_dynamic_update(data).then(res => {
                    console.log(res);
                    if (res.retcode == 200) {
                        this.show_success = true;
                        setTimeout(() => {
                            this.$router.replace('/home')
                        }, 2000)
                    } else {
                        this.show_error = true;
                        this.errorMsg = res.errmsg;
                    }
                }).catch(error => {
                    console.log(error)
                })
            },
            toggleAddPic: function () {
                let vm = this;
                if (vm.imgUrls.length >= 1) {
                    vm.isPhoto = false;
                } else {
                    vm.isPhoto = true;
                }
            },
            createImage: function (file) {
                if (typeof FileReader === 'undefined') {
                    alert('您的手机浏览器不支持图片上传，请升级您的软件');
                    return false;
                }
                var image = new Image();
                var vm = this;
                var leng = file.length;
                for (var i = 0; i < leng; i++) {
                    var reader = new FileReader();
                    reader.readAsDataURL(file[i]);
                    reader.onload = function (e) {
                        if (vm.imgUrls.length < 3) {
                            vm.imgUrls.push(e.target.result);
                        }
                        else {
                            vm.show_error = true;
                            vm.errorMsg = "最多上传3张图片";
                        }
                    };
                }
                // for (var i = 0; i < file.length; i++) {
                //     this.imgUrls.push(window.URL.createObjectURL(file[i]));
                // }
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
            // saveImage: function () {
            //     let vm = this;
            //     let urlArr = [],
            //         imgUrls = this.imgUrls;
            //     for (let i = 0; i < imgUrls.length; i++) {
            //         if (imgUrls.indexOf('file') == -1) {
            //             urlArr.push(imgUrls.split(',')[1]);
            //         } else {
            //             urlArr.push(imgUrls);
            //         }
            //     }
            //     //数据传输操作
            // },
            onFileChange: function (e) {
                var files = e.target.files || e.dataTransfer.files;
                if (!files.length) return;
                this.createImage(files);
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
        .vux-popup-dialog {
            @include center;
            background-color: #fff;
            width: 90%;
            border-radius: .2rem;
            overflow: scroll;
            .options {
                padding: .2rem;
                p {
                    color: #1AAD19 !important;
                    font-size: .9rem;
                    padding: .5rem !important;
                }
            }
            .weui-cell {
                border-bottom: 1px solid #eee;
            }
            .weui-cell__hd {
                img {
                    @include wh(2rem, 2rem);
                }
            }
            .vux-cell-bd {
                p {
                    font-size: .7rem;
                    color: #333 !important;
                }
            }
        }
        // .demo4-item {
        //     background-color: #ddd;
        //     color: #222;
        //     font-size: 14px;
        //     padding: 5px 10px;
        //     margin-right: 10px;
        //     line-height: 18px;
        //     border-radius: 15px;
        // }
        // .demo4-item-selected {
        //     background-color: #FF3B3B;
        //     color: #fff;
        // }
        // .demo4-item-disabled {
        //     color: #999;
        // }
        .sub {
            position: fixed;
            width: 100%;
            bottom: 0;
        }
    }
</style>
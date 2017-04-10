<template>
    <div class="create_activity">
        <x-header>创建活动</x-header>
        <group>
            <x-input title="活动名称"
                     placeholder="填写活动名称"
                     v-model="value_title"
                     required></x-input>
        </group>
        <div class="type">
            <div class="type_title">
                <label>活动类型</label>
            </div>
            <checker default-item-class="activity_type"
                     v-model="value_tid"
                     selected-item-class="activity_type-selected">
                <checker-item v-for="(item,index) in activity_type"
                              :key="index"
                              :value="item.id">{{item.name}}</checker-item>
            </checker>
        </div>
        <group title="活动介绍"
               class="activity_detail">
            <x-textarea :max="200"
                        :rows="4"
                        name="detail"
                        placeholder="请填写活动介绍"
                        :show-counter="false"
                        v-model="value_content"></x-textarea>
        </group>
        <group title="活动时间"
               class="activity_time">
            <datetime v-model="startTime"
                      placeholder="请选择开始时间"
                      :min-year=2017
                      :max-year=2050
                      format="YYYY-MM-DD HH:mm"
                      title="开始时间"
                      year-row="{value}年"
                      month-row="{value}月"
                      day-row="{value}日"
                      hour-row="{value}点"
                      minute-row="{value}分"
                      confirm-text="完成"
                      cancel-text="取消"></datetime>
            <datetime v-model="endTime"
                      placeholder="请选择结束时间"
                      :min-year=2017
                      :max-year=2050
                      format="YYYY-MM-DD HH:mm"
                      title="结束时间"
                      year-row="{value}年"
                      month-row="{value}月"
                      day-row="{value}日"
                      hour-row="{value}点"
                      minute-row="{value}分"
                      confirm-text="完成"
                      cancel-text="取消"></datetime>
        </group>
        <div class="activity_location">
            <group>
                <x-input title="活动地点"
                         placeholder="填写活动地点"
                         required
                         v-model="area"></x-input>
                <x-input style="width: 12rem;"
                         title="报名人数"
                         placeholder="填写人数"
                         type="number"
                         v-model="memberNum"
                         required>
                    <span slot="right">人</span>
                </x-input>
            </group>
            <div class="weui_uploader_bd">
                <div class="activity_cover">活动封面</div>
                <div class="weui_uploader_bd">
                    <ul class="weui_uploader_files">
                        <li class="list-li clear"
                            v-for="(iu, index) in imgUrls">
                            <a class="list-link"
                               @click='previewImage(iu)'>
                                <img :src="iu">
                            </a>
                            <span class="list-img-close"
                                  @click='delImage(index)'>X</span>
                        </li>
                    </ul>
                    <div class="weui_uploader_input_wrp"
                         v-show="imgUrls.length==0">
                        <input class="weui_uploader_input"
                               accept="image/jpeg,image/jpg,image/png"
                               @change="onFileChange"
                               type="file">
                    </div>
                </div>
            </div>
            <div class="add-preview"
                 v-show="isPreview"
                 @click="closePreview">
                <img :src="previewImg">
            </div>
        </div>
        <div class="create">
            <x-button type="primary"
                      @click.native="_create_activity"
                      v-if="addClickStatus">开始创建</x-button>
            <x-button type="primary"
                      show-loading
                      v-else>正在创建</x-button>
        </div>
        <toast v-model="show_success">创建成功 </toast>
        <toast type="cancel"
               v-model="show_error"> {{errorMsg}} </toast>
    </div>
</template>

<script>
import { XHeader, Group, dateFormat, Toast, XButton, XInput, Checker, CheckerItem, XTextarea, Datetime, Actionsheet } from 'vux'
import api from '../../fetch/api'
import { mapGetters } from 'vuex'
import lrz from 'lrz'
export default {
    components: {
        XHeader,
        dateFormat,
        Toast,
        XButton,
        XInput,
        Checker,
        CheckerItem,
        Group,
        XTextarea,
        Datetime,
        Actionsheet
    },
    data() {
        return {
            value_title: '',
            value_content: '',//活动介绍
            startTime: '',
            endTime: '',
            memberNum: 0,//报名人数
            area: '',
            show: false,
            imgUrls: [],
            isPhoto: true,
            previewImg: '',
            isPreview: false,
            value_tid: 0,
            show_success: false,
            show_error: false,
            errorMsg: '',
            addClickStatus: true
        }
    },
    computed: {
        ...mapGetters([
            'activity_type'
        ])
    },
    created() {
        this.$store.dispatch('get_activity_type', { uid: localStorage.getItem('loginopenid') })
    },
    methods: {
        _create_activity() {
            let data = {
                uid: localStorage.getItem('loginopenid'),
                userid: localStorage.getItem('loginopenid'),
                title: this.value_title,
                content: this.value_content,
                stime: this.startTime,
                etime: this.endTime,
                limit: this.memberNum,
                tid: this.value_tid,
                place: this.area,
                cid: 15,
                img: JSON.stringify(this.imgUrls),
            }
            this.addClickStatus = false;
            api.v3_activity_update(data).then(res => {
                if (res.retcode == 200) {
                    this.show_success = true
                    setTimeout(() => {
                        this.$router.replace('/activity')
                    }, 3000)
                    this.addClickStatus = true
                } else {
                    this.show_error = true;
                    this.errorMsg = res.errmsg;
                    this.addClickStatus = true
                }
            }).catch(error => {
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
        createImage: function (file, e) {
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
                    lrz(e.target.result, { width: 480 }).then(function (rst) {
                        return rst;
                    }).always(function () {
                        // 清空文件上传控件的值
                        e.target.value = null;
                    });
                    // vm.imgUrls.push(e.target.result);
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
.create_activity {
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
    .weui-icon_toast {
        margin: 22px 0 10px 0;
    }
    .weui-cells {
        margin-top: 0;
        .weui-cell {
            background-color: #fff;
            .weui-cell__hd {
                .weui-label {
                    font-size: .7rem;
                    color: #000;
                }
            }
            .weui-cell__bd {
                margin-top: -.12rem;

                input {
                    font-size: .7rem;
                    height: 100%;
                }
            }
        }
    }
    .type {
        display: flex;
        background-color: #fff;
        padding: 10px 15px;
        margin-top: .5rem;
        .type_title {
            width: 4.16rem;
            label {
                font-size: .7rem;
                color: #000;
            }
        }
        .vux-checker-box {
            line-height: 1.7;
            margin-top: -.2rem;
            .activity_type {
                border-radius: .5rem;
                font-size: .6rem;
                padding: .1rem .5rem;
                line-height: 1.3;
                margin-left: .5rem;
                &:nth-child(1) {
                    border: 1px solid #1bc114;
                    color: #1bc114;
                }
                &:nth-child(2) {
                    border: 1px solid #e99931;
                    color: #e99931;
                }
                &:nth-child(3) {
                    border: 1px solid #c427e0;
                    color: #c427e0;
                }
                &:nth-child(4) {
                    border: 1px solid #999;
                    color: #999;
                }
            }
            .activity_type-selected {
                color: #fff !important;
                &:nth-child(1) {
                    background-color: #1bc114;
                }
                &:nth-child(2) {
                    background-color: #e99931;
                }
                &:nth-child(3) {
                    background-color: #c427e0;
                }
                &:nth-child(4) {
                    background-color: #999;
                }
            }
        }
    }
    .activity_detail {
        background-color: #fff;
        padding: 10px 15px;
        .weui-cells__title {
            padding: 0;
            @include sc(.7rem, #000);
        }
        .weui-cells {
            .weui-cell {
                padding: 0;
                .weui-cell__bd {
                    margin-top: .3rem;
                    font-size: .7rem;
                }
            }
            &:after {
                border: none;
            }
        }
    }
    .activity_time {
        background-color: #fff;
        .weui-cells__title {
            padding-top: .5rem;
            font-size: .7rem;
            color: #000;
        }
        .weui-cells {
            font-size: .7rem;
            padding-bottom: .2rem;
            .vux-datetime {
                padding: 15px;
            }
        }
    }
    .activity_location {
        margin-top: .5rem;
        .vux-x-input {
            .weui-cell__ft {
                @include sc(.7rem, #000);
            }
        }
        .weui_uploader_bd {
            position: relative;
            display: flex;
            background-color: #fff;
            .activity_cover {
                padding: 15px;
                @include sc(.7rem, #000);
                margin-top: 10px;
            }
            .weui_uploader_files {
                .list-li {
                    @include wh(3rem, 3rem);
                    margin: .3rem;
                    display: inline-block;
                    position: relative;
                    top: 1rem;
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
                        @include wh(3rem, 3rem)
                    }
                }
            }
            .weui_uploader_input_wrp {
                position: absolute;
                width: 1rem;
                height: 1rem;
                right: -8rem;
                bottom: .7rem;
                &:before {
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    background-color: #d9d9d9;
                    width: 2px;
                    height: 20px;
                }
                &:after {
                    content: " ";
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translate(-50%, -50%);
                    transform: translate(-50%, -50%);
                    background-color: #d9d9d9;
                    width: 20px;
                    height: 2px;
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
    .create {
        padding: .5rem;
        margin-top: 2rem;
        .weui-btn {
            font-size: .8rem;
        }
    }
}
</style>
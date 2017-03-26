<template>
    <div class="create_activity">
        <x-header>创建活动</x-header>
        <group>
            <x-input title="活动名称" placeholder="填写活动名称" required></x-input>
        </group>
        <div class="type">
            <div class="type_title">
                <label>活动类型</label>
            </div>
            <checker default-item-class="activity_type" selected-item-class="activity_type-selected">
                <checker-item :value="2">跑步</checker-item>
                <checker-item :value="1">徒步</checker-item>
                <checker-item :value="3">骑行</checker-item>
                <checker-item :value="4">其他</checker-item>
            </checker>
        </div>
        <group title="活动介绍" class="activity_detail">
            <x-textarea :max="200" :rows="4" name="detail" v-model="infoValue" placeholder="请填写活动介绍" :show-counter="false"></x-textarea>
        </group>
        <group title="活动时间" class="activity_time">
            <datetime v-model="startTime" placeholder="请选择开始时间" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" title="开始时间"
                year-row="{value}年" month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成"
                cancel-text="取消"></datetime>
                <datetime v-model="endTime" placeholder="请选择结束时间" :min-year=2000 :max-year=2016 format="YYYY-MM-DD HH:mm" title="结束时间" year-row="{value}年"
                    month-row="{value}月" day-row="{value}日" hour-row="{value}点" minute-row="{value}分" confirm-text="完成" cancel-text="取消"></datetime>
        </group>
        <div class="activity_location">
            <group>
                <x-input title="活动地点" placeholder="填写活动地点" required v-model="area"></x-input>
                <x-input style="width: 12rem;" title="报名人数" placeholder="填写人数" type="number" v-model="memberNum" required>
                    <span slot="right">人</span>
                </x-input>
            </group>
            <div class="weui_uploader_bd">
                <div class="activity_cover">活动封面</div>
                <div class="weui_uploader_input_wrp" @click="show=!show"></div>
            </div>
        </div>
        <div class="create">
            <x-button type="primary" @click.native="$router.push('')">开始创建</x-button>
        </div>
        <actionsheet v-model="show" :menus="menus" @on-click-menu-take="take" @on-click-menu-select="select" show-cancel></actionsheet>
    </div>
</template>

<script>
    import { XHeader, Group, dateFormat, Toast, XButton, XInput, Checker, CheckerItem, XTextarea, Datetime, Actionsheet } from 'vux'
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
                infoValue: '',//活动介绍
                startTime: '',
                endTime: '',
                memberNum: 0,//报名人数
                area: '',
                show: false,
                menus: {
                    take: '拍照',
                    select: '从相册选择'
                },
            }
        },
        methods: {
            take() {
                console.log("拍照")
            },
            select() {
                console.log("相册");
            }
        }
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
                .activity_cover {
                    padding: 15px;
                    @include sc(.7rem, #000);
                    margin-top: 10px;
                }
                .weui_uploader_input_wrp {
                    position: absolute;
                    width: 1rem;
                    height: 1rem;
                    right: 2rem;
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
                }
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
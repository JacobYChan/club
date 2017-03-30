<template>
    <div class="circle_submit">
        <x-header>创建我的圈子</x-header>
        <group title="圈子名称" class="circle_name">
            <x-input placeholder="请为您的圈子起个名字" :max="20" name="name" required v-model="value_name"></x-input>
            <span>最大不超过10个汉字</span>
        </group>
        <group title="说说你的圈子梦想" class="circle_dream">
            <x-textarea :height="80" :max="200" name="detail" v-model="value_des" placeholder="请填写您的圈子梦想，如果你能打动我们，通过概率会更高" :show-counter="false"></x-textarea>
        </group>
        <group title="联系电话" class="circle_tel">
            <x-input v-model="value_tel" name="mobile" placeholder="请输入常用的联系电话" keyboard="number" is-type="china-mobile"></x-input>
            <span>提交申请后请耐心等待，审核结果我们会推送消息给您。</span>
        </group>
        <div class="create">
            <x-button type="primary" @click.native="_circle_apply">提交申请</x-button>
        </div>
        <toast v-model="show_success">申请成功 </toast>
        <toast v-model="show_error" type="cancel">{{errorMsg}}</toast>
    </div>
</template>

<script>
    import { XTextarea, Group, XHeader, Toast, XInput, XButton } from 'vux'
    import api from '../../fetch/api'
    export default {
        components: {
            XHeader,
            Toast,
            Group,
            XTextarea,
            XInput,
            XButton
        },
        data() {
            return {
                show_success: false,
                show_error: false,
                errorMsg: '',
                value_name: '',
                value_tel: '',
                value_des: ''
            }
        },
        methods: {
            _circle_apply() {
                let data = {
                    uid: localStorage.getItem('loginopenid'),
                    name: this.value_name,
                    describtion: this.value_des,
                    phone: this.value_tel,
                }
                console.log(data);
                api.v3_circle_apply(data).then(res => {
                    console.log(res)
                    if (res.retcode == 200) {
                        this.show_success = true;
                        // this.$router.replace('/home/join')
                    } else {
                        this.show_error = true;
                        this.errorMsg = res.errmsg;
                    }
                }).catch(error => {
                    console.log(error)
                })
            }
        },
    }

</script>

<style lang="scss">
    @import '../../common/style/mixin';
    .circle_submit {
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
        .circle_name {
            padding: .2rem .5rem;
            .weui-cells__title {
                padding-left: 0;
                @include sc(.8rem, #333);
            }
            .weui-cells {
                &:after {
                    border: none;
                }
                .vux-x-input {
                    background-color: #eee;
                    border: 1px solid #ddd;
                    padding: 5px 10px;
                    input {
                        font-size: .7rem;
                    }
                }
            }
            span {
                @include sc(.5rem, #999);
            }
        }
        .circle_dream {
            margin: 1rem .5rem;
            .weui-cells__title {
                padding-left: 0;
                @include sc(.8rem, #333);
            }
            .weui-cells {
                .weui-cell {
                    padding: 5px 10px;
                    background-color: #eee;
                    border: 1px solid #ddd;
                    .weui-cell__bd {
                        textarea {
                            background-color: #eee;
                            font-size: .7rem;
                        }
                    }
                }
            }
        }
        .circle_tel {
            padding: .2rem .5rem;
            .weui-cells__title {
                padding-left: 0;
                @include sc(.8rem, #333);
                margin-top: 0;
            }
            .weui-cells {
                &:after {
                    border: none;
                }
                .vux-x-input {
                    background-color: #eee;
                    border: 1px solid #ddd;
                    padding: 5px 10px;
                    input {
                        font-size: .7rem;
                    }
                }
            }
            span {
                @include sc(.5rem, #999);
            }
        }
        .create {
            padding:1.5rem .5rem;
            .weui-btn {
                font-size: .8rem;
            }
        }
    }
</style>
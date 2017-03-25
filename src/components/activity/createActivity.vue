<template>
    <div class="create_activity">
        <x-header>创建活动</x-header>

    </div>
</template>

<script>
    import { XHeader, dateFormat, Toast, XButton, XInput } from 'vux'
    export default {
        components: {
            XHeader,
            dateFormat,
            Toast,
            XButton,
            XInput
        },

    }

</script>

<style lang="scss">
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
    }
</style>
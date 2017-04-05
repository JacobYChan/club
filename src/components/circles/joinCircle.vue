<template>
    <div class="joinCircle">
        <!-- <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top
            top="5.2rem" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="getResult(value)" placeholder="输入圈子名称找到圈子"></search> -->

        <tab :line-width="2">
            <tab-item :selected="this.$route.path.split('/').length==3" @on-item-click="handler('/home/join')">推荐</tab-item>
            <tab-item :selected="this.$route.path.split('/')[3]=='near'" @on-item-click="handler('/home/join/near')">我的</tab-item>
            <tab-item :selected="this.$route.path.split('/')[3]=='hot'" @on-item-click="handler('/home/join/hot')">热门</tab-item>
        </tab>
        <transition name="router-fade" mode="out-in">
            <router-view style="margin-bottom:1.5rem;"></router-view>
        </transition>
        <div class="create_circle">
            <p>各种圈子福利等着你</p>
            <router-link tag="span" to="/home/join/circle/create_circle">创建圈子</router-link>
        </div>

    </div>
</template>

<script>
    import { Search, Tab, TabItem } from 'vux'
    export default {
        components: {
            Search,
            Tab,
            TabItem,
        },
        methods: {
            resultClick(item) {
                window.alert('you click the result item: ' + JSON.stringify(item))
            },
            getResult(val) {
                this.results = val ? getResult(this.value) : []
            },
            onFocus() {
                console.log('on focus')

            },
            onCancel() {
                console.log('on cancel')
            },
            handler: function (site) {
                this.$router.replace(site);
            }
        },
        data() {
            return {
                results: [],
                value: '',
            }
        }
    }
    function getResult(val) {
        let rs = []
        for (let i = 0; i < 8; i++) {
            rs.push({
                title: `${val} result: ${i + 1} `,
                other: i
            })
        }
        return rs
    }

</script>

<style lang="scss">
    .joinCircle {
        .vux-tab {
            height: 2.5rem;
            .vux-tab-item{
                line-height: 2.5rem;
            }
        }
        .weui-search-bar__cancel-btn {
            font-size: .8rem;
        }
        .create_circle {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            display: flex;
            background: #fafafa;
            box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.2);
            z-index: 999;
            height: 2rem;
            line-height: 2rem;
            p {
                font-size: .75rem;
                color: #999;
                text-indent: 1rem;
            }
            span {
                font-size: .7rem;
                position: absolute;
                right: 3.75%;
                color: #1CC019;
                top: 0;
            }
        }
    }
</style>
<template>
    <div class="joinCircle">
        <search @result-click="resultClick" @on-change="getResult" :results="results" v-model="value" position="absolute" auto-scroll-to-top
            top="5.2rem" @on-focus="onFocus" @on-cancel="onCancel" @on-submit="getResult(value)" placeholder="输入圈子名称找到圈子"></search>

            <tab :line-width="2">
                <tab-item :selected="this.$route.path.split('/').length==3" @on-item-click="handler('/home/join')">推荐</tab-item>
                <tab-item :selected="this.$route.path.split('/')[3]=='near'" @on-item-click="handler('/home/join/near')">附近</tab-item>
                <tab-item :selected="this.$route.path.split('/')[3]=='hot'" @on-item-click="handler('/home/join/hot')">热门</tab-item>
            </tab>
            <transition name="router-fade" mode="out-in">
                <router-view></router-view>
            </transition>
    </div>
</template>

<script>
    import { Search, Tab, TabItem } from 'vux'
    export default {
        components: {
            Search,
            Tab,
            TabItem
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
                value: ''
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
        .weui-search-bar__cancel-btn {
            font-size: .8rem;
        }
    }
</style>
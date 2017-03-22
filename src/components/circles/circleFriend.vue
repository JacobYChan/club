<template>
    <div class="circleFriend">
        <ul>
            <li v-for="(item,key) in $store.state.yzCircles" :key="item.runid">
                <div v-for="(src,index) in item.img" style="text-align:center;" @click="show(index)">
                     <img class="previewer-demo-img" :src="src" width="100" @click="show(index)">
                </div>
                <previewer :list="item.img" :ref="key" :options="options"></previewer>
            </li>
        </ul>
    </div>
</template>

<script>
    import { Previewer } from 'vux'

    export default {
        components: {
            Previewer
        },
        methods: {
            show(index) {
                this.$refs.key.show(index)
            }
        },
        data() {
            return {
                list: [{
                    src: 'https://placekitten.com/800/400',
                    w: 600,
                    h: 400
                },
                {
                    src: 'https://placekitten.com/1200/900',
                    w: 1200,
                    h: 9.00
                }],
                options: {
                    getThumbBoundsFn(index) {
                        // find thumbnail element
                        let thumbnail = document.querySelectorAll('.previewer-demo-img')[index]
                        // get window scroll Y
                        let pageYScroll = window.pageYOffset || document.documentElement.scrollTop
                        // optionally get horizontal scroll
                        // get position of element relative to viewport
                        let rect = thumbnail.getBoundingClientRect()
                        // w = width
                        return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
                        // Good guide on how to get element coordinates:
                        // http://javascript.info/tutorial/coordinates
                    }
                }
            }
        }
    }

</script>

<style lang="scss">
    .circleFriend {}
</style>
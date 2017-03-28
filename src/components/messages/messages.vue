<template>
    <div class="messages">
        <ul class="messages_list">
            <!-- <div v-for="msgObj in $store.state.messages" :item="msgObj" :key="msgObj.mid"></div> -->
        </ul>
    </div>
</template>

<script>
    import msgItem from './message-item'
    export default {
        components: {
            msgItem
        },
    }

</script>

<style lang="scss">

</style>
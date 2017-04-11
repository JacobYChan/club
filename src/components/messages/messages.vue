<template>
    <div class="messages">
        <ul class="messages_list">
            <msg-item :item="messagesyslist"></msg-item>
            <msg-item  v-if="messageapplist.length!=undefined" :item="messageapplist"></msg-item>
        </ul>
    </div>
</template>

<script>
    import msgItem from './message-item'
    import { mapGetters } from 'vuex'
    export default {
        components: {
            msgItem
        },
        created(){
        },
        computed: {
            ...mapGetters([
                'messagesyslist',
                'messageapplist'
            ])
        }
    }

</script>

<style lang="scss">

</style>
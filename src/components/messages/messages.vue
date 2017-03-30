<template>
    <div class="messages">
        <ul class="messages_list">
            <msg-item :item="messagesyslist"></msg-item>
            <msg-item :item="messageapplist"></msg-item>
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
        beforeCreate(){
            this.$store.dispatch('get_message_sys_list', {type: 1, begin: 0,offset: 100,uid: localStorage.getItem('loginopenid')});
            this.$store.dispatch('get_message_app_list', {type: 2, begin: 0,offset: 100,uid: localStorage.getItem('loginopenid')});
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
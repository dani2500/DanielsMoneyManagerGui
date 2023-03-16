<template>
    <p>User Name: {{ userName }}</p>
    <p>Email: {{ userEmail }}</p>
    <p>User ID: {{ userId }}</p>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { AUTH_MODULE, GET_USER_NAME_GETTER, GET_USER_EMAIL_GETTER, GET_USER_ID_GETTER } from '../store/storeconstants';
    import { GetUser } from '../services/ApiRequests';

    export default {
        data() {
            return {
            };
        },
        computed: {
        ...mapGetters(AUTH_MODULE, {
            userName: GET_USER_NAME_GETTER,
            userEmail: GET_USER_EMAIL_GETTER,
            userId: GET_USER_ID_GETTER,
            }),
        },
        mounted() {
            GetUser();
        },
        methods: {
        },  
    };
</script>
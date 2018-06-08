<template>
    <div class="themes">
        themes
        <button @click="signOut">Sign Out</button>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'

    export default {
        name: 'themes',

        methods: {
            async signOut () {
                await firebase.auth().signOut()
                this.$router.push({ name: 'sign-in' })
            }
        }
    }
</script>

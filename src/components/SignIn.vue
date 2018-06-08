<template>
    <div class="sign-in">
        <button @click="signInWithGoogle">Google</button>
        <button @click="signInWithGithub">Github</button>
        <p v-if="error">There was a problem signing in.</p>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'

    export default {
        name: 'sign-in',

        data () {
            return {
                error: false
            }
        },

        methods: {
            async signInWithGoogle () {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider()
                    await firebase.auth().signInWithPopup(provider)
                    this.$router.push({ name: 'themes' })
                } catch (error) {
                    this.error = true
                    console.error(error)
                }
            },

            async signInWithGithub () {
                try {
                    const provider = new firebase.auth.GithubAuthProvider()
                    await firebase.auth().signInWithPopup(provider)
                    this.$router.push({ name: 'themes' })
                } catch (error) {
                    this.error = true
                    console.error(error)
                }
            }
        }
    }
</script>

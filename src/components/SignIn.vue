<template>
    <div class="sign-in">
        <div class="sign-in-wrapper">
            <figure class="logo">
                <img src="../assets/img/hiq-logo.svg" alt="HiQ">
            </figure>
            <h1>Sign in to view your themes</h1>
            <button class="is-secondary" @click="signInWithGoogle">
                <icon-base iconName="Google"><icon-google></icon-google></icon-base>
                Sign in with Google
            </button>
            <button class="is-secondary" @click="signInWithGithub">
                <icon-base iconName="Github"><icon-github></icon-github></icon-base>
                Sign in with Github
            </button>
            <p v-if="error" class="error">There was a problem signing in.</p>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import IconBase from './icons/IconBase'
    import IconGoogle from './icons/IconGoogle'
    import IconGithub from './icons/IconGithub'

    export default {
        name: 'sign-in',

        components: {
            IconBase,
            IconGoogle,
            IconGithub
        },

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

<style scoped>
    .sign-in {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        padding: 2rem;
    }

    .sign-in-wrapper {
        width: 100%;
        max-width: 30rem;
        padding: 2rem;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        background-color: var(--editor-panel-background-color);
        text-align: center;
    }

    .logo {
        display: inline-block;
        & img {
            width: 3rem;
        }
    }

    h1 {
        margin-bottom: 1.5rem;
        font-size: var(--hiq-font-size-3);
        color: var(--hiq-text-color);
    }

    button {
        width: 14rem;
        justify-content: flex-start;
        &:not(:last-child) {
            margin-bottom: 0.5rem;
        }
        & svg {
            width: 1.125rem;
            margin-right: 0.5rem;
        }
    }

    .error {
        margin-top: 1rem;
        color: var(--hiq-color-danger);
    }
</style>

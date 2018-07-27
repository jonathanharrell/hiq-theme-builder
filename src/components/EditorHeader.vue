<template>
    <header class="navbar">
        <div class="container is-fluid">
            <figure class="logo">
                <img src="../assets/img/hiq-logo.svg" alt="HiQ">
            </figure>
            <form v-if="editMode" @submit.prevent="saveThemeName">
                <label for="theme-name" class="is-visually-hidden"></label>
                <input
                    type="text"
                    id="theme-name"
                    name="theme_name"
                    :value="themeName"
                    ref="input"
                >
                <button type="submit">Save</button>
            </form>
            <div class="theme-name" v-else>
                <span class="theme-name-text">{{ themeName }}</span>
                <button class="edit-theme-name" @click="editMode = true">
                    <icon-base iconName="Edit" iconColor="var(--hiq-gray-light)">
                        <icon-pencil></icon-pencil>
                    </icon-base>
                </button>
            </div>
            <a href="https://jonathanharrell.github.io/hiq/" class="documentation-link">Documentation</a>
            <span class="user-links" v-if="currentUser">
                <router-link to="/themes">Themes</router-link>
                <a @click="signOut">Sign Out</a>
            </span>
            <router-link to="/sign-in" v-else>Sign In</router-link>
        </div>
    </header>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import IconBase from './icons/IconBase'
    import IconPencil from './icons/IconPencil'

    const collection = firebase.firestore().collection('themes')

    export default {
        name: 'editor-header',

        components: {
            IconBase,
            IconPencil
        },

        data () {
            return {
                editMode: false
            }
        },

        computed: {
            themeName () {
                return this.$store.state.themeName
            },

            currentUser () {
                return this.$store.state.currentUser
            }
        },

        watch: {
            'editMode' (value) {
                this.$nextTick(() => {
                    if (value) this.$refs.input.focus()
                })
            }
        },

        methods: {
            async signOut () {
                await firebase.auth().signOut()
                this.$router.push({ name: 'sign-in' })
            },

            async saveThemeName (event) {
                const formData = new FormData(event.target)
                const value = formData.get('theme_name')
                this.$store.commit('setThemeName', value)

                if (this.currentUser && this.$route.params.id) {
                    const entryRef = collection.doc(this.$route.params.id)
                    await entryRef.update({
                        name: value
                    })
                }

                this.editMode = false
            }
        }
    }
</script>

<style scoped>
    .container {
        position: relative;
    }

    .theme-name,
    form {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .theme-name {
        display: flex;
        align-items: center;
    }

    .theme-name-text {
        font-weight: var(--hiq-font-weight-medium);
        color: var(--hiq-text-color);
        transition: color var(--hiq-speed) var(--hiq-easing);
    }

    .edit-theme-name {
        height: auto;
        border-color: transparent;
        background-color: transparent;
        &:hover,
        &:focus,
        &:active {
            & /deep/ g {
                fill: var(--hiq-gray);
            }
        }
    }

    form {
        display: flex;
        align-items: center;
        & button {
            height: 2.5rem;
            margin-left: 0.5rem;
        }
    }

    input {
        width: auto;
    }

    .documentation-link {
        margin-right: 1rem;
        margin-left: auto;
    }

    .user-links {
        & a:not(:last-child) {
            margin-right: 1rem;
        }
    }
</style>

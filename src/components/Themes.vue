<template>
    <div class="themes">
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <header class="navbar" v-else>
            <div class="container is-fluid">
                <figure class="logo">
                    <img src="../assets/img/hiq-logo.svg" alt="HiQ">
                </figure>
                <h1>{{ username ? `${username}'s ` : ''}}Themes</h1>
                <a @click="signOut">Sign Out</a>
            </div>
        </header>
        <div class="themes-grid">
            <theme-thumbnail
                :key="theme.id"
                :name="theme.name"
                :id="theme.id"
                :primary-color="theme['color-primary']"
                v-for="theme in themes"
            ></theme-thumbnail>
            <button @click="createTheme" class="create-theme" :disabled="creating">
                {{ creating ? 'Creating...' : 'Create New Theme' }}
            </button>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import 'firebase/firestore'
    import ThemeThumbnail from './ThemeThumbnail'

    const collection = firebase.firestore().collection('themes')

    export default {
        name: 'themes',

        components: {
            ThemeThumbnail
        },

        data () {
            return {
                loading: false,
                creating: false
            }
        },

        computed: {
            username () {
                if (this.$store.state.currentUser) return this.$store.state.currentUser.displayName
            },

            themes () {
                return this.$store.state.themes
            }
        },

        created () {
            this.getThemes()
        },

        methods: {
            async signOut () {
                await firebase.auth().signOut()
                this.$router.push({ name: 'sign-in' })
            },

            async getThemes () {
                this.loading = true
                const themes = []

                const snapshot = await collection.get()
                snapshot.forEach(doc => {
                    themes.push({
                        id: doc.id,
                        name: doc.data().name,
                        'color-primary': doc.data().variables['--hiq-color-primary'].value
                    })
                })

                this.$store.commit('setThemes', themes)
                this.loading = false
            },

            async createTheme () {
                this.creating = true
                const { id } = await collection.add({
                    editorTheme: 'light',
                    name: 'Untitled Theme',
                    variables: this.$store.state.defaultVariables
                })
                this.creating = false
                this.$router.push({ name: 'theme', params: { id } })
            }
        }
    }
</script>

<style scoped>
    .themes {
        height: 100vh;
    }

    .themes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        grid-gap: var(--hiq-container-horizontal-gap);
        width: 100%;
        padding: var(--hiq-container-horizontal-gap);
    }

    h1 {
        margin: 0;
        font-size: var(--hiq-font-size-base);
        color: var(--hiq-text-color);
    }

    .create-theme {
        height: 8rem;
    }
</style>

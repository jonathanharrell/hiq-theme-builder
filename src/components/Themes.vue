<template>
    <div class="themes">
        <transition-group
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            mode="out-in"
        >
            <div class="loading" key="loading" v-if="loading">
                Loading...
            </div>
            <header class="navbar" key="navbar" v-if="!loading">
                <div class="container is-fluid">
                    <figure class="logo">
                        <img src="../assets/img/hiq-logo.svg" alt="HiQ">
                    </figure>
                    <h1>{{ username ? `${username}'s ` : ''}}Themes</h1>
                    <a href="https://jonathanharrell.github.io/hiq/" class="documentation-link">Documentation</a>
                    <a @click="signOut">Sign Out</a>
                </div>
            </header>
            <div class="themes-grid" key="grid" v-if="!loading">
                <theme-thumbnail
                    :key="theme.id"
                    :name="theme.name"
                    :id="theme.id"
                    :colors="theme.colors"
                    v-for="theme in themes"
                ></theme-thumbnail>
                <button @click="createTheme" class="create-theme" :disabled="creating">
                    {{ creating ? 'Creating...' : 'Create New Theme' }}
                </button>
            </div>
        </transition-group>
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
                let themes = []

                const snapshot = await collection.get()
                snapshot.forEach(doc => {
                    themes.push({
                        id: doc.id,
                        name: doc.data().name,
                        colors: {
                            'color-primary': doc.data().variables['--hiq-color-primary'].value,
                            'gray-darker': doc.data().variables['--hiq-gray-darker'].value,
                            'gray': doc.data().variables['--hiq-gray'].value,
                            'gray-lighter': doc.data().variables['--hiq-gray-lighter'].value
                        },
                        dateCreated: doc.data().dateCreated
                    })
                })

                themes = themes.sort((a, b) => {
                    if (a.dateCreated > b.dateCreated) return -1
                    if (a.dateCreated < b.dateCreated) return 1
                    return 0
                })

                this.$store.commit('setThemes', themes)
                this.loading = false
            },

            async createTheme () {
                this.creating = true
                const { id } = await collection.add({
                    editorTheme: 'light',
                    name: 'Untitled Theme',
                    variables: this.$store.state.defaultVariables,
                    dateCreated: new Date()
                })
                this.creating = false
                this.$router.push({ name: 'theme', params: { id } })
            }
        }
    }
</script>

<style scoped>
    .navbar .container {
        position: relative;
    }

    h1 {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
    }

    .documentation-link {
        margin-right: 1rem;
        margin-left: auto;
    }

    .themes-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(20rem, 1fr));
        grid-gap: var(--hiq-container-horizontal-gap);
        width: 100%;
        height: calc(100vh - var(--navbar-height));
        margin-top: var(--navbar-height);
        padding: var(--hiq-container-horizontal-gap);
    }

    h1 {
        margin: 0;
        font-size: var(--hiq-font-size-base);
        color: var(--hiq-text-color);
    }

    .create-theme {
        height: var(--theme-thumbnail-height);
        border: 2px dotted var(--hiq-gray-light);
        background-color: transparent;
        color: var(--hiq-gray-light);
        &:hover,
        &:focus,
        &:active {
            border-color: var(--hiq-gray);
            color: var(--hiq-gray);
        }
    }
</style>

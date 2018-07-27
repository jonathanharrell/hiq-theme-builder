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
            <article
                class="theme-thumbnail"
                :key="theme.id"
                v-for="theme in themes"
                @click="loadTheme(theme.id)"
            >
                {{ theme.name }}
                {{ theme.id }}
                {{ theme['color-primary'] }}
                <button @click.stop="deleteTheme(theme.id)">Delete</button>
            </article>
            <button @click="createTheme">Create New Theme</button>
        </div>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import 'firebase/auth'
    import 'firebase/firestore'

    const collection = firebase.firestore().collection('themes')

    export default {
        name: 'themes',

        data () {
            return {
                loading: false
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
                const { id } = await collection.add({
                    editorTheme: 'light',
                    name: 'Untitled Theme',
                    variables: this.$store.state.defaultVariables
                })
                this.$router.push({ name: 'theme', params: { id } })
            },

            async deleteTheme (id) {
                await collection.doc(id).delete()
                const themes = this.themes.filter(theme => theme.id !== id)
                this.$store.commit('setThemes', themes)
            },

            loadTheme (id) {
                this.$router.push({ name: 'theme', params: { id } })
            }
        }
    }
</script>

<style scoped>
    .themes {
        height: 100vh;
    }

    h1 {
        margin: 0;
        font-size: var(--hiq-font-size-base);
        color: var(--hiq-text-color);
    }
</style>

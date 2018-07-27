<template>
    <div class="editor">
        <editor-header></editor-header>
        <div class="loading" v-if="loading">
            Loading...
        </div>
        <main v-else>
            <editor-nav></editor-nav>
            <editor-category></editor-category>
            <router-view></router-view>
            <editor-settings></editor-settings>
        </main>
    </div>
</template>

<script>
    import firebase from 'firebase'
    import EditorHeader from './EditorHeader'
    import EditorNav from './EditorNav'
    import EditorCategory from './EditorCategory'
    import EditorSettings from './EditorSettings'

    const collection = firebase.firestore().collection('themes')

    export default {
        name: 'editor',

        components: {
            EditorHeader,
            EditorNav,
            EditorCategory,
            EditorSettings
        },

        data () {
            return {
                loading: true
            }
        },

        computed: {
            currentUser () {
                return this.$store.state.currentUser
            }
        },

        created () {
            if (!this.currentUser) {
                this.getTempValues()
            } else {
                this.getSavedValues()
            }
        },

        methods: {
           getTempValues () {
                const variables = localStorage.getItem('hiqThemeBuilderVariables')
                if (variables) this.$store.commit('setVariables', JSON.parse(variables))

                const editorTheme = localStorage.getItem('hiqThemeBuilderEditorTheme')
                const themeName = localStorage.getItem('hiqThemeBuilderThemeName')

                this.$store.commit('setEditorTheme', editorTheme)
                this.$store.commit('setThemeName', themeName)

               this.loading = false
            },

            async getSavedValues () {
                const snapshot = await collection.doc(this.$route.params.id).get()
                this.loading = false
                const { editorTheme, name, variables } = snapshot.data()

                this.$store.commit('setEditorTheme', editorTheme)
                this.$store.commit('setThemeName', name)
                this.$store.commit('setVariables', variables)
            }
        }
    }
</script>

<style scoped>
    .editor {
        display: flex;
        flex-direction: column;
        height: 100vh;
    }

    main {
        display: flex;
        flex: 1;
    }
</style>

<template>
    <article
        class="theme-thumbnail"
        @click="loadTheme()"
    >
        <header class="theme-thumbnail-header">
            <h2 class="theme-name">
                {{ name }}
            </h2>
            <button @click.stop="deleteTheme()">Delete</button>
        </header>
        <span class="color-swatch" :style="{ backgroundColor: primaryColor }"></span>
    </article>
</template>

<script>
    import firebase from 'firebase/app'

    const collection = firebase.firestore().collection('themes')

    export default {
        name: 'them-thumbnail',

        props: [
            'name',
            'id',
            'primaryColor'
        ],

        computed: {
            themes () {
                return this.$store.state.themes
            }
        },

        methods: {
            async deleteTheme () {
                await collection.doc(this.id).delete()
                const themes = this.themes.filter(theme => theme.id !== this.id)
                this.$store.commit('setThemes', themes)
            },

            loadTheme () {
                this.$router.push({ name: 'theme', params: { id: this.id } })
            }
        }
    }
</script>

<style scoped>
    .theme-thumbnail {
        height: 8rem;
        padding: 1.25rem 1.5rem;
        border-radius: var(--hiq-border-radius);
        background-color: white;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        cursor: pointer;
    }

    .theme-thumbnail-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .theme-name {
        margin-bottom: 0;
        font-size: var(--hiq-font-size-base);
        font-weight: var(--hiq-font-weight-medium);
    }

    .color-swatch {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        border-radius: var(--hiq-border-radius);
    }
</style>

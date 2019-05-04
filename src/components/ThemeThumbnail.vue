<template>
    <article
        class="theme-thumbnail"
        @click="loadTheme()"
        tabindex="0"
    >
        <header class="theme-thumbnail-header">
            <h2 class="theme-name">
                {{ name }}
            </h2>
            <button @click.stop="deleteTheme()" class="delete-theme">
                <icon-base iconName="Delete" :height="24"><icon-trash></icon-trash></icon-base>
            </button>
        </header>
        <span
            v-for="(value, color) in colors"
            :key="color"
            class="color-swatch"
            :style="{ backgroundColor: value }"
        ></span>
    </article>
</template>

<script>
    import firebase from 'firebase/app'
    import IconBase from './icons/IconBase'
    import IconTrash from './icons/IconTrash'

    const collection = firebase.firestore().collection('themes')

    export default {
        name: 'them-thumbnail',

        components: {
            IconBase,
            IconTrash
        },

        props: [
            'name',
            'id',
            'colors'
        ],

        computed: {
            themes () {
                return this.$store.state.themes
            }
        },

        methods: {
            async deleteTheme () {
                try {
                    await collection.doc(this.id).delete()
                } catch (error) {
                    console.error(error)
                }

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
        height: var(--theme-thumbnail-height);
        padding: 1.25rem 1.5rem;
        border-radius: var(--hiq-border-radius);
        background-color: var(--editor-panel-background-color);
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
        color: var(--hiq-text-color);
        transition: transform var(--hiq-speed) var(--hiq-easing);
        cursor: pointer;

        &:hover {
            box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
            transform: scale(1.025);
        }
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

    .delete-theme {
        padding: 0;
        border: 0;
        background-color: transparent;
        color: var(--hiq-color-gray-6);
        &:hover,
        &:focus,
        &:active {
            color: var(--hiq-color-gray-5);
        }
    }

    .color-swatch {
        display: inline-block;
        width: 2rem;
        height: 2rem;
        margin-right: 0.5rem;
        border-radius: var(--hiq-border-radius);
    }
</style>

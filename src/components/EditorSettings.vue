<template>
    <div class="editor-settings">
        <section class="settings-section editor-theme">
            <h3 class="settings-section-title">Editor Theme</h3>
            <button-group>
                <button
                    @click="setEditorTheme('light')"
                    :class="{ active: editorTheme === 'light' }"
                >
                    <color-swatch color="var(--hiq-color-gray-7)"></color-swatch>
                    <span>Light</span>
                </button>
                <button
                    @click="setEditorTheme('dark')"
                    :class="{ active: editorTheme === 'dark' }"
                >
                    <color-swatch color="var(--hiq-color-gray-3)"></color-swatch>
                    <span>Dark</span>
                </button>
            </button-group>
        </section>
        <section class="settings-section save-theme" v-if="currentUser && $route.params.id">
            <h3 class="settings-section-title">Save Theme</h3>
            <button class="is-primary is-full-width" @click="saveTheme" :disabled="saving">
                <span v-if="saving">Saving...</span>
                <span v-else>Save</span>
            </button>
        </section>
        <section class="settings-section reset-theme">
            <h3 class="settings-section-title">Reset Theme</h3>
            <button class="is-secondary is-full-width" @click="resetTheme">Reset</button>
        </section>
        <section class="settings-section export-theme">
            <h3 class="settings-section-title">Export Theme</h3>
            <button class="is-full-width" @click="exportVariables">Download</button>
        </section>
    </div>
</template>

<script>
    import firebase from 'firebase/app'
    import ButtonGroup from './base/ButtonGroup'
    import ColorSwatch from './base/ColorSwatch'
    import { createVariablesString } from '../helpers'

    const collection = firebase.firestore().collection('themes')

    export default {
        name: 'editor-settings',

        components: {
            ButtonGroup,
            ColorSwatch
        },

        data () {
            return {
                activeFileFormat: 'css',
                saving: false
            }
        },

        computed: {
            editorTheme () {
                return this.$store.state.editorTheme
            },

            variables () {
                return this.$store.state.variables
            },

            currentUser () {
                return this.$store.state.currentUser
            }
        },

        methods: {
            async setEditorTheme (theme) {
                this.$store.commit('setEditorTheme', theme)

                if (this.currentUser && this.$route.params.id) {
                    const entryRef = collection.doc(this.$route.params.id)

                    try {
                        await entryRef.update({
                            editorTheme: theme
                        })
                    } catch (error) {
                        console.error(error)
                    }
                }
            },

            async saveTheme () {
                if (this.currentUser && this.$route.params.id) {
                    this.saving = true

                    try {
                        const entryRef = await collection.doc(this.$route.params.id)
                        await entryRef.update({
                            variables: this.$store.state.variables
                        })
                    } catch (error) {
                        console.error(error)
                    }

                    this.saving = false
                }
            },

            resetTheme () {
                this.$store.commit('setVariables', this.$store.state.defaultVariables)
            },

            setFileFormat (format) {
                this.activeFileFormat = format
            },

            exportVariables () {
                const finalString = createVariablesString(this.variables)

                const link = document.createElement('a')
                link.setAttribute('href', `data:text/plain;charset=utf-8,${encodeURIComponent(finalString)}`)
                link.setAttribute('download', `variables.${this.activeFileFormat}`)
                link.style.display = 'none'

                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            }
        }
    }
</script>

<style scoped>
    .editor-settings {
        display: flex;
        position: absolute;
        top: 0;
        right: 0;
        flex-direction: column;
        flex: 0 0 14rem;
        width: var(--editor-settings-width);
        height: calc(100vh - var(--navbar-height));
        margin-top: var(--navbar-height);
        border-left: 1px solid var(--editor-panel-border-color);
        background-color: var(--editor-panel-background-color);
        transition:
            border-color var(--hiq-speed) var(--hiq-easing),
            background-color var(--hiq-speed) var(--hiq-easing);
    }

    .settings-section {
        padding: 1rem 1.25rem;
        border-top: 1px solid var(--editor-panel-border-color);
        transition: border-color var(--hiq-speed) var(--hiq-easing);
    }

    .settings-section-title {
        margin-bottom: 0.5rem;
        font-size: var(--hiq-font-size-base);
        color: var(--hiq-text-color);
    }

    .settings-subsection-title {
        margin: 1rem 0 0.5rem;
        font-size: var(--hiq-font-size-base);
        font-weight: var(--hiq-font-weight-normal);
        color: var(--label-color);
    }

    .save-theme {
        margin-top: auto;
        & + .reset-theme {
            margin-top: unset;
        }
    }

    .reset-theme {
        margin-top: auto;
    }

    .file-formats {
        margin-bottom: 0.75rem;
    }
</style>

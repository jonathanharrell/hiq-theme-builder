<template>
    <div class="preview" :class="['theme-' + editorTheme]">
        <div class="preview-content-wrapper">
            <component :is="$route.params.category"></component>
        </div>
    </div>
</template>

<script>
    import Colors from './previews/Colors'
    import Typography from './previews/Typography'
    import Buttons from './previews/Buttons'
    import FormsInputs from './previews/FormsInputs'
    import MediaElements from './previews/MediaElements'
    import Tables from './previews/Tables'
    import CodeInput from './previews/CodeInput'
    import Spacing from './previews/Spacing'
    import Motion from './previews/Motion'

    export default {
        name: 'preview',

        components: {
            Colors,
            Typography,
            Buttons,
            FormsInputs,
            MediaElements,
            Tables,
            CodeInput,
            Spacing,
            Motion
        },

        computed: {
            variables () {
                return this.$store.state.variables
            },

            editorTheme () {
                return this.$store.state.editorTheme
            }
        },

        watch: {
            'variables' (value) {
                this.applyThemeToPreview(value)
            }
        },

        mounted () {
            this.applyThemeToPreview(this.variables)
        },

        methods: {
            applyThemeToPreview (variables) {
                Object.entries(variables).forEach(entry => {
                    const [ variableName, config ] = entry
                    this.$el.style.setProperty(variableName, config.value)
                })
            }
        }
    }
</script>

<style scoped>
    .preview {
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex: 1;
        width: calc(100% - var(--editor-nav-width) - var(--editor-category-width) - var(--editor-settings-width));
        min-width: 30rem;
        height: calc(100vh - var(--navbar-height));
        overflow-y: auto;
        margin-left: calc(var(--editor-nav-width) + var(--editor-category-width));
        padding: 2rem;
        background-color: var(--editor-preview-background-color);
        transition: background-color var(--hiq-speed) var(--hiq-easing);
    }

    .preview-content-wrapper {
        flex: 0 1 50rem;
        max-width: 100%;
        margin: 0 auto;
        padding: 2rem;
        border: 1px solid var(--editor-panel-border-color);
        background-color: var(--controls-background-color);
        transition:
            border-color var(--hiq-speed) var(--hiq-easing),
            background-color var(--hiq-speed) var(--hiq-easing);
    }

    .theme-dark .preview-content-wrapper {
        color: white;
    }

    /deep/ h1 {
        font-size: var(--hiq-font-size-2);
    }

    /deep/ h2 {
        font-size: var(--hiq-font-size-4);
        font-weight: var(--hiq-font-weight-normal);
        color: var(--hiq-color-gray-4);
    }

    .theme-dark /deep/ h2 {
        color: var(--hiq-color-gray-5);
    }

    /deep/ .variable-label {
        margin: 0.5rem 0 0;
        font-weight: var(--hiq-font-weight-medium);
        color: var(--hiq-color-gray-4);
    }

    .theme-dark /deep/ .variable-label {
        color: var(--hiq-color-gray-5);
    }

    /deep/ .color-swatch {
        border: 1px solid var(--hiq-color-gray-6);
    }

    .theme-dark /deep/ .color-swatch {
        border-color: var(--hiq-color-gray-2);
    }
</style>

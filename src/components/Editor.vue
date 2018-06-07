<template>
    <div class="editor">
        <editor-header></editor-header>
        <main>
            <editor-nav></editor-nav>
            <editor-category></editor-category>
            <router-view></router-view>
            <editor-settings></editor-settings>
        </main>
    </div>
</template>

<script>
    import EditorHeader from './EditorHeader'
    import EditorNav from './EditorNav'
    import EditorCategory from './EditorCategory'
    import EditorSettings from './EditorSettings'

    export default {
        name: 'editor',

        components: {
            EditorHeader,
            EditorNav,
            EditorCategory,
            EditorSettings
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

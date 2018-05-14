<template>
    <div class="editor">
        <header class="navbar">
            <div class="container is-fluid">

            </div>
        </header>
        <main>
            <editor-nav></editor-nav>
            <editor-category></editor-category>
            <router-view></router-view>
            <editor-settings></editor-settings>
        </main>
    </div>
</template>

<script>
    import EditorNav from './EditorNav'
    import EditorCategory from './EditorCategory'
    import EditorSettings from './EditorSettings'

    export default {
        name: 'editor',

        components: {
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

    .navbar {
        display: flex;
        align-items: center;
        position: relative;
        height: 4rem;
        background-color: white;
        box-shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.1);
    }

    main {
        display: flex;
        flex: 1;
    }
</style>

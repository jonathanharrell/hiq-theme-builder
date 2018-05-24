<template>
    <div class="preview">
        {{ $route.params.category }}
    </div>
</template>

<script>
    export default {
        name: 'preview',

        data () {
            return {

            }
        }
    }
</script>

<style scoped>
    .preview {
        flex: 1;
        background-color: var(--editor-preview-background-color);
    }
</style>

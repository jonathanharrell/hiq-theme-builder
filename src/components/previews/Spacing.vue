<template>
    <div class="spacing">
        <h1>Spacing & Structure</h1>
        <h2>Containers</h2>
        <div class="spacing-section">
            <div style="background-color: var(--editor-panel-background-color);">
                <div class="container" style="height: 20rem; border: 1px solid var(--editor-panel-border-color); background-color: var(--controls-background-color);"></div>
            </div>
        </div>
        <h2>Margins</h2>
        <div class="spacing-section">
            <div style="border: 1px solid var(--editor-panel-border-color); background-color: var(--editor-panel-background-color);">
                <figure style="height: 20rem; background-color: var(--controls-background-color);"></figure>
            </div>
        </div>
        <h2>Borders & Outlines</h2>
        <div class="spacing-section">
            <button ref="button">Button</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'spacing',

        mounted () {
            this.$refs.button.focus()
        }
    }
</script>

<style scoped>
    .spacing-section {
        &:not(:last-of-type) {
            margin-bottom: 2rem;
        }
    }
</style>

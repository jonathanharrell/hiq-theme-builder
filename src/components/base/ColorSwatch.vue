<template>
    <span class="color-swatch" :style="{ backgroundColor: color }"></span>
</template>

<script>
    export default {
        name: 'color-swatch',

        props: {
            color: {
                type: String,
                required: true
            }
        }
    }
</script>

<style scoped>
    .color-swatch {
        display: inline-block;
        width: 1.25rem;
        height: 1.25rem;
        margin-right: 0.5rem;
        border: 1px solid var(--hiq-input-border-color);
        border-radius: var(--hiq-border-radius);
    }
</style>

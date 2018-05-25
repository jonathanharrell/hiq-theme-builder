<template>
    <div class="colors">
        <h1>Colors</h1>
        <h2>Gray Color Palette</h2>
        <div class="color-thumbnails">
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-gray-darkest)"></div>
                <p class="variable-label">Darkest Gray</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-gray-darker)"></div>
                <p class="variable-label">Darker Gray</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-gray-dark)"></div>
                <p class="variable-label">Dark Gray</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-gray)"></div>
                <p class="variable-label">Gray</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-gray-light)"></div>
                <p class="variable-label">Light Gray</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-gray-lighter)"></div>
                <p class="variable-label">Lighter Gray</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-gray-lightest)"></div>
                <p class="variable-label">Lightest Gray</p>
            </div>
        </div>
        <h2>Semantic Color Palette</h2>
        <div class="color-thumbnails">
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-primary)"></div>
                <p class="variable-label">Primary</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-success)"></div>
                <p class="variable-label">Success</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-warning)"></div>
                <p class="variable-label">Warning</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-danger)"></div>
                <p class="variable-label">Danger</p>
            </div>
        </div>
        <h2>Applied Colors</h2>
        <div class="color-thumbnails">
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-html-background-color)"></div>
                <p class="variable-label">HTML Background Color</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-body-background-color)"></div>
                <p class="variable-label">Body Background Color</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-disabled-border-color)"></div>
                <p class="variable-label">Disabled Border Color</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-disabled-background-color)"></div>
                <p class="variable-label">Disabled Background Color</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-disabled-text-color)"></div>
                <p class="variable-label">Disabled Text Color</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'colors'
    }
</script>

<style scoped>
    .color-thumbnails {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(7rem, 1fr));
        grid-gap: 1.25rem;
        &:not(:last-of-type) {
            margin-bottom: 3rem;
        }
    }

    .color-swatch {
        padding: 35% 0;
        border-radius: var(--hiq-border-radius);
    }
</style>

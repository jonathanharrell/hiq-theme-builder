<template>
    <div class="colors">
        <h1>Colors</h1>
        <h2>Gray Color Palette</h2>
        <section class="color-thumbnails">
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-1)"></div>
                <p class="variable-label">Gray 1</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-2)"></div>
                <p class="variable-label">Gray 2</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-3)"></div>
                <p class="variable-label">Gray 3</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-4)"></div>
                <p class="variable-label">Gray 4</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-5)"></div>
                <p class="variable-label">Gray 5</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-6)"></div>
                <p class="variable-label">Gray 6</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-7)"></div>
                <p class="variable-label">Gray 7</p>
            </div>
            <div class="color-thumbnail">
                <div class="color-swatch" style="background-color: var(--hiq-color-gray-8)"></div>
                <p class="variable-label">Gray 8</p>
            </div>
        </section>
        <h2>Semantic Color Palette</h2>
        <section class="color-thumbnails">
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
        </section>
        <h2>Applied Colors</h2>
        <section class="color-thumbnails">
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
        </section>
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
        transition: border-color var(--hiq-speed) var(--hiq-easing);
    }
</style>

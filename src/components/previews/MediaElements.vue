<template>
    <div class="media-elements">
        <h1>Media & Elements</h1>
        <h2>Figures</h2>
        <section class="media-section">
            <div class="variable-group">
                <figure style="margin-top: var(--hiq-figcaption-margin-top);">
                    <placeholder style="border-radius: var(--hiq-image-border-radius);"></placeholder>
                    <figcaption>Figure caption</figcaption>
                </figure>
            </div>
        </section>
    </div>
</template>

<script>
    import Placeholder from './Placeholder'

    export default {
        name: 'media-elements',

        components: {
            Placeholder
        }
    }
</script>

<style scoped>
    /deep/ svg {
        width: 100%;
        height: auto;
    }
</style>

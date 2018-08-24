<template>
    <div class="editor-category">
        <h2 class="is-visually-hidden">Controls</h2>
        <div class="editor-sub-categories" ref="subcategories">
            <editor-sub-category
                v-for="subCategory in subCategories"
                :key="subCategory.id"
                :id="subCategory.id"
                :label="subCategory.label"
            ></editor-sub-category>
        </div>
    </div>
</template>

<script>
    import categories from '../categories'
    import EditorSubCategory from './EditorSubCategory'

    export default {
        name: 'editor-category',

        components: {
            EditorSubCategory
        },

        watch: {
            '$route.params.category': async function () {
                await this.$nextTick()
                if (this.$refs.subcategories) {
                    this.$refs.subcategories.children[0].querySelector('.sub-category-title button').focus()
                }
            }
        },

        computed: {
            subCategories () {
                return categories
                    .find(category => category.id === this.$route.params.category)
                    .subcategories
            }
        }
    }
</script>

<style scoped>
    .editor-category {
        flex: 0 0 18rem;
        position: absolute;
        width: var(--editor-category-width);
        height: calc(100vh - var(--navbar-height));
        margin-left: var(--editor-nav-width);
        border-right: 1px solid var(--editor-panel-border-color);
        background-color: var(--editor-panel-background-color);
        transition:
            border-color var(--hiq-speed) var(--hiq-easing),
            background-color var(--hiq-speed) var(--hiq-easing);
    }

    .editor-sub-categories {
        height: 100%;
        overflow-y: auto;
    }
</style>

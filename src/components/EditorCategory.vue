<template>
    <div class="editor-category">
        <h2 class="is-visually-hidden">Controls</h2>
        <div class="editor-sub-categories" ref="subcategories">
            <editor-sub-category
                v-for="(subCategory, index) in subCategories"
                :key="subCategory.id"
                :id="subCategory.id"
                :label="subCategory.label"
                @keydown.native="handleKeydown($event, index)"
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
                this.$refs.subcategories.children[0].querySelector('.sub-category-title button').focus()
            }
        },

        computed: {
            subCategories () {
                return categories
                    .find(category => category.id === this.$route.params.category)
                    .subcategories
            }
        },

        methods: {
            handleKeydown (event, index) {
                const subcategories = this.$refs.subcategories.children

                if (event.code === 'ArrowDown') {
                    if (index + 1 > subcategories.length - 1) subcategories[0].querySelector('.sub-category-title button').focus()
                    else subcategories[index + 1].querySelector('.sub-category-title button').focus()
                }

                if (event.code === 'ArrowUp') {
                    if (index - 1 < 0) subcategories[subcategories.length - 1].querySelector('.sub-category-title button').focus()
                    else subcategories[index - 1].querySelector('.sub-category-title button').focus()
                }
            }
        }
    }
</script>

<style scoped>
    .editor-category {
        flex: 0 0 16rem;
        overflow-y: auto;
        border-right: 1px solid var(--hiq-gray-lighter);
        background-color: hsl(0, 0%, 98%);
    }
</style>

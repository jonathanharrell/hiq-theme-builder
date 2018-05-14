<template>
    <nav class="editor-nav">
        <h2 class="is-visually-hidden">Categories</h2>
        <router-link
            :to="{ params: { category: category.id, subcategory: category.subcategories[0].id } }"
            v-for="category in categories"
            :key="category.id"
        >
            <icon-base :iconName="category.label">
                <component :is="getComponentName(category.id)"></component>
            </icon-base>
            <span class="is-visually-hidden">{{ category.label }}</span>
        </router-link>
    </nav>
</template>

<script>
    import categories from '../categories'
    import IconBase from './icons/IconBase'
    import IconButtons from './icons/IconButtons'
    import IconCode from './icons/IconCode'
    import IconColors from './icons/IconColors'
    import IconFormsInputs from './icons/IconFormsInputs'
    import IconMediaElements from './icons/IconMediaElements'
    import IconMotion from './icons/IconMotion'
    import IconSpacing from './icons/IconSpacing'
    import IconTables from './icons/IconTables'
    import IconTypography from './icons/IconTypography'

    export default {
        name: 'editor-nav',

        components: {
            IconBase,
            IconButtons,
            IconCode,
            IconColors,
            IconFormsInputs,
            IconMediaElements,
            IconMotion,
            IconSpacing,
            IconTables,
            IconTypography
        },

        data () {
            return {
                categories
            }
        },

        methods: {
            getComponentName (iconId) {
                return `icon-${iconId}`
            }
        }
    }
</script>

<style scoped>
    .editor-nav {
        display: flex;
        flex-direction: column;
        width: 4rem;
        padding: 1rem 0;
        border-right: 1px solid var(--hiq-gray-lighter);
    }

    .editor-nav a {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 1rem;
        padding-bottom: 1rem;
        border-color: transparent;
        border-radius: 0;
        background-color: transparent;
        color: var(--hiq-text-color);
        &.router-link-active {
            color: var(--hiq-color-primary);
        }
        & img {
            width: 1.25rem;
            height: 1.25rem;
        }
    }
</style>

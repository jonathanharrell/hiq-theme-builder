<template>
    <nav class="editor-nav">
        <h2 class="is-visually-hidden">Categories</h2>
        <div class="editor-categories" ref="categories">
            <popper
                v-for="(category, index) in categories"
                :key="category.id"
                trigger="hover"
                :options="{ placement: 'right' }"
                :delay-on-mouse-out="0"
            >
                <span class="controls tooltip">
                    {{ category.label }}
                </span>
                <router-link
                    :to="{ params: { category: category.id, subcategory: category.subcategories[0].id } }"
                    slot="reference"
                    @keydown.native="handleKeydown($event, index)"
                >
                    <icon-base :iconName="category.label">
                        <component :is="getComponentName(category.id)"></component>
                    </icon-base>
                    <span class="is-visually-hidden">{{ category.label }}</span>
                </router-link>
            </popper>
        </div>
    </nav>
</template>

<script>
    import Popper from 'vue-popperjs'
    import categories from '../categories'
    import IconBase from './icons/IconBase'
    import IconButtons from './icons/IconButtons'
    import IconCodeInput from './icons/IconCodeInput'
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
            Popper,
            IconBase,
            IconButtons,
            IconCodeInput,
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
            },

            handleKeydown (event, index) {
                const categories = this.$refs.categories.children

                if (event.code === 'ArrowDown') {
                    if (index + 1 > categories.length - 1) categories[0].focus()
                    else categories[index + 1].focus()
                }

                if (event.code === 'ArrowUp') {
                    if (index - 1 < 0) categories[categories.length - 1].focus()
                    else categories[index - 1].focus()
                }
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
        border-right: 1px solid var(--editor-nav-border-color);
        background-color: var(--editor-nav-background-color);
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

    .tooltip {
        margin-left: -0.5rem;
    }
</style>

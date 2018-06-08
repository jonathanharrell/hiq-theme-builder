<template>
    <section class="editor-sub-category">
        <h3 class="sub-category-title">
            <button
                :aria-expanded="[expanded ? 'true' : 'false']"
                :aria-controls="id"
                @click="toggle"
            >
                <icon-base
                    icon-name="caret"
                    icon-color="var(--hiq-gray-light)"
                    :width="10"
                >
                    <icon-caret></icon-caret>
                </icon-base>
                {{ label }}
            </button>
        </h3>
        <transition name="grow-height">
            <div
                class="sub-category-controls"
                :id="id"
                v-if="expanded"
            >
                <div
                    class="sub-category-control"
                    v-for="(config, variable) in filteredVariables"
                    :key="variable"
                >
                    <label :for="variable">
                        <span class="variable-name">{{ variable }}</span>
                        <popper trigger="hover" :options="{ placement: 'bottom' }">
                            <span class="controls tooltip" style="position: relative; z-index: 1000;">
                                {{ config.description }}
                            </span>
                            <span slot="reference" class="get-info">
                                <icon-base
                                    icon-color="var(--info-icon-color)"
                                    :width="12"
                                    height="12"
                                >
                                    <icon-info></icon-info>
                                </icon-base>
                            </span>
                        </popper>
                    </label>
                    <editor-input
                        :type="config.type"
                        :name="variable"
                        :value="config.value"
                        @input="updateVariable"
                    ></editor-input>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
    import Popper from 'vue-popperjs'
    import IconBase from './icons/IconBase'
    import IconCaret from './icons/IconCaret'
    import IconInfo from './icons/IconInfo'
    import EditorInput from './EditorInput'

    export default {
        name: 'editor-sub-category',

        components: {
            Popper,
            IconBase,
            IconCaret,
            IconInfo,
            EditorInput
        },

        props: {
            id: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        },

        data () {
            return {
                expanded: false
            }
        },

        computed: {
            filteredVariables () {
                return Object.entries(this.$store.state.variables)
                    .filter(entry => entry[1].category === this.id)
                    .reduce((obj, item) => {
                        const [ variable, config ] = item
                        obj[variable] = config
                        return obj
                    }, {})
            }
        },

        methods: {
            async toggle () {
                this.expanded = !this.expanded

                await this.$nextTick()
                if (this.expanded) this.$el.scrollIntoView()
            },

            async updateVariable ({ name, value }) {
                await this.$store.commit('updateVariable', { name, value })
            }
        }
    }
</script>

<style scoped>
    .sub-category-title {
        margin: 0;
        font-size: var(--hiq-font-size-base);
        & button {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            height: auto;
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
            border-radius: 0;
            border-color: transparent;
            border-top-color: var(--editor-panel-border-color);
            background-color: transparent;
            color: var(--hiq-text-color);
            &[aria-expanded=true] {
                & svg {
                    transform: rotate(90deg);
                }
            }
            & svg {
                margin-right: 0.25rem;
                transition: transform var(--hiq-speed) var(--hiq-easing);
            }
        }
    }

    .sub-category-controls {
        padding: 1rem;
    }

    .sub-category-control {
        & label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: var(--hiq-font-weight-medium);
            color: var(--label-color);
            & .variable-name {
                flex: 1;
                overflow: hidden;
                padding-right: 0.5rem;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
        &:not(:last-child) {
            margin-bottom: 0.75rem;
        }
    }

    .tooltip {
        max-width: 12rem;
        margin-top: 0.5rem;
        text-align: center;
    }
</style>

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
                    <span>{{ variable }}</span>
                    <icon-base
                        icon-name="info"
                        icon-color="var(--hiq-gray-lighter)"
                        :width="12"
                        height="12"
                    >
                        <icon-info></icon-info>
                    </icon-base>
                </label>
                <editor-input
                    :type="config.type"
                    :name="variable"
                    v-model="config.value"
                    @input="updateVariable"
                ></editor-input>
            </div>
        </div>
    </section>
</template>

<script>
    import IconBase from './icons/IconBase'
    import IconCaret from './icons/IconCaret'
    import IconInfo from './icons/IconInfo'
    import EditorInput from './EditorInput'

    export default {
        name: 'editor-sub-category',

        components: {
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

            updateVariable ({ name, value }) {
                this.$store.commit('updateVariable', { name, value })
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
            border-top-color: var(--hiq-gray-lighter);
            background-color: transparent;
            color: var(--hiq-text-color);
            &[aria-expanded=true] {
                & svg {
                    transform: rotate(90deg);
                }
            }
            & svg {
                margin-right: 0.25rem;
            }
        }
    }

    .sub-category-controls {
        padding: 1rem;
        & label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-weight: var(--hiq-font-weight-medium);
            color: var(--hiq-gray);
            & span {
                flex: 1;
                overflow: hidden;
                padding-right: 0.5rem;
                white-space: nowrap;
                text-overflow: ellipsis;
            }
        }
    }

    .sub-category-control:not(:last-child) {
        margin-bottom: 0.75rem;
    }
</style>

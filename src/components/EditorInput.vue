<template>
    <div class="editor-input">
        <color-input
            v-if="type === 'color'"
            :value="value"
            @input="handleInput"
        ></color-input>
        <text-input
            v-if="type === 'text'"
            :value="value"
            @input="handleInput"
        ></text-input>
    </div>
</template>

<script>
    import ColorInput from './color/ColorInput'
    import TextInput from './TextInput'

    export default {
        name: 'editor-input',

        components: {
            ColorInput,
            TextInput
        },

        props: {
            type: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        },

        methods: {
            handleInput (value) {
                this.$emit('input', {
                    name: this.name,
                    value
                })
            }
        }
    }
</script>

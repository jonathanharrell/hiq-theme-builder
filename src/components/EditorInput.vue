<template>
    <div class="editor-input">
        <color-input
            v-if="type === 'color'"
            :name="name"
            :value="value"
            @input="handleInput"
        ></color-input>
        <text-input
            v-if="type === 'text'"
            :name="name"
            :value="value"
            @input="handleInput"
        ></text-input>
        <number-input
            v-if="type === 'number'"
            :name="name"
            :value="value"
            @input="handleInput"
        ></number-input>
    </div>
</template>

<script>
    import ColorInput from './color/ColorInput'
    import TextInput from './TextInput'
    import NumberInput from './NumberInput'

    export default {
        name: 'editor-input',

        components: {
            ColorInput,
            TextInput,
            NumberInput
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

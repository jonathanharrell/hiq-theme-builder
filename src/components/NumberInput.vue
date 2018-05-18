<template>
    <div class="number-input">
        <input type="number" :value="value">
    </div>
</template>

<script>
    export default {
        name: 'number-input',

        props: {
            name: {
                type: String,
                required: true
            },

            value: {
                type: String,
                required: true
            }
        }
    }
</script>

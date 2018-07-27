<template>
    <svg xmlns="http://www.w3.org/2000/svg"
         :width="width"
         :height="height"
         viewBox="0 0 22 20"
         :aria-labelledby="iconName"
         role="presentation"
    >
        <title :id="iconName" lang="en" v-if="iconName">{{iconName}} icon</title>
        <g :fill="iconColor">
            <slot />
        </g>
    </svg>
</template>

<script>
    export default {
        name: 'icon-base',

        props: {
            iconName: {
                type: String
            },
            width: {
                type: [Number, String],
                default: 20
            },
            height: {
                type: [Number, String],
                default: 20
            },
            iconColor: {
                type: String,
                default: 'currentColor'
            }
        }
    }
</script>

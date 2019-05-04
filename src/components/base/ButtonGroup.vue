<template>
    <div class="button-group">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'button-group'
    }
</script>

<style scoped>
    .button-group {
        display: flex;
        border: 1px solid var(--hiq-input-border-color);
        border-radius: var(--hiq-border-radius);
        transition: border-color var(--hiq-speed) var(--hiq-easing);

        & > * {
            flex: 1;
            padding: 0;
            border-radius: 0;
            border: 0;
            background-color: var(--hiq-input-background-color);
            font-size: var(--hiq-font-size-small);
            font-weight: var(--hiq-font-weight-normal);
            text-transform: uppercase;
            color: var(--secondary-button-text-color);
            transition:
                border-color var(--hiq-speed) var(--hiq-easing),
                background-color var(--hiq-speed) var(--hiq-easing);

            &:hover {
                color: var(--secondary-button-hover-text-color);
            }

            &.active {
                position: relative;
                color: var(--hiq-color-primary);
            }

            &:first-child {
                border-top-left-radius: var(--hiq-border-radius);
                border-bottom-left-radius: var(--hiq-border-radius);
            }

            &:last-child {
                border-top-right-radius: var(--hiq-border-radius);
                border-bottom-right-radius: var(--hiq-border-radius);
            }

            &:not(:last-child) {
                border-right: 1px solid var(--hiq-input-border-color);
            }
        }
    }
</style>

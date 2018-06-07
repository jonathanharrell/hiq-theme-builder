<template>
    <div class="motion">
        <h1>Motion</h1>
        <div class="motion-wrapper">
            <div class="ball"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'motion'
    }
</script>

<style scoped>
    .motion-wrapper {
        position: relative;
        height: 3rem;
    }

    .ball {
        position: absolute;
        left: 0;
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        background-color: var(--hiq-color-primary);
        animation: back-and-forth var(--hiq-speed) var(--hiq-easing) infinite alternate;
        animation-timing-function: var(--hiq-easing);
    }

    @keyframes back-and-forth {
        from { left: 0; }
        to { left: 100px; }
    }
</style>

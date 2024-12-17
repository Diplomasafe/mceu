<template>
    <div :class="$style.root">
        <TheHeader />

        <main class="flex-1">
            <slot />
        </main>

        <TheFooter />
    </div>
</template>

<script setup lang="ts">
    import TheHeader from '@/components/TheHeader/TheHeader.vue';
    import TheFooter from '@/components/TheFooter/TheFooter.vue';
</script>

<style module lang="scss">
    .root {
        display: flex;
        flex-direction: column;
        max-width: 1440px;
        min-height: 100vh;
        margin: 0 auto;
        padding: 16px;
    }
</style>

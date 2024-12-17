<template>
    <Toast />

    <div class="flex justify-between">
        <div class="flex">
            <img
                class="max-w-72"
                src="../../assets/images/logo.png"
                alt="Logo"
            />
        </div>

        <nav class="flex">
            <Button
                class="text-black"
                label="Request Credential"
                link
                @click="showDialog"
            />

            <Button
                class="text-black"
                label="My credentials"
                link
                @click="router.push('/my-credentials')"
            />
        </nav>

        <RequestCredentialDialog v-model:visible="isDialogVisible" />
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import Toast from 'primevue/toast';
    import RequestCredentialDialog from '../Dialogs/RequestCredentialDialog.vue';

    const showDialog = () => {
        isDialogVisible.value = true;
    };

    const isDialogVisible = ref(false);
    const router = useRouter();
</script>

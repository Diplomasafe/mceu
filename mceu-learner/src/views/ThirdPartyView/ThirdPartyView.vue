<template>
    <div class="flex justify-center max-w-lg mx-auto mt-14">
        <CredentialCard
            is-third-party-view
            :credential="credential"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref, type Ref } from 'vue';
    import type { Credential } from '@/dtos/credential.dto';
    import CredentialService from '@/services/credential.service';
    import { useRoute } from 'vue-router';
    import CredentialCard from '@/components/CredentialList/CredentialCard/CredentialCard.vue';

    const route = useRoute();
    const credential: Ref<Credential | null> = ref(null);

    const fetchCredential = async (): Promise<void> => {
        try {
            const response = await CredentialService.getCredentialById(route.params.id as string);

            credential.value = response.data;
        } catch (error) {
            console.error(error);
        }
    };

    fetchCredential();
</script>

<style module lang="scss"></style>

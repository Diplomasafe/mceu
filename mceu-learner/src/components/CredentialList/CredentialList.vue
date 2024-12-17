<template>
    <div class="flex flex-col items-center gap-8 max-w-lg mx-auto">
        <CredentialCard
            v-for="credential in credentialsData.data"
            :credential="credential"
            :key="credential.id"
        />

        <Button
            v-if="hasMoreCredentials || loading"
            label="Load more"
            @click="fetchCredentials(true)"
        />
    </div>
</template>

<script setup lang="ts">
    import { ref, type Ref, reactive } from 'vue';
    import { type PaginatedResponse } from '@/dtos/paginated-response.dto';
    import type { Credential } from '@/dtos/credential.dto';
    import CredentialCard from './CredentialCard/CredentialCard.vue';
    import CredentialService from '@/services/credential.service';

    const loading: Ref<boolean> = ref(false);
    const hasMoreCredentials: Ref<boolean> = ref(true);

    let credentialsData: PaginatedResponse<Credential> = reactive({
        data: [],
        limit: 5,
        offset: 0,
        page: 1,
        total_pages: 0,
        total_records: 0,
    });

    const fetchCredentials = async (loadMore?: boolean): Promise<void> => {
        try {
            loading.value = true;

            if (loadMore) {
                credentialsData.page++;
            }

            const response = await CredentialService.getCredentialsPaginated(
                credentialsData.page,
                credentialsData.limit,
            );

            Object.assign(credentialsData, response.data);

            if (response.data.page === response.data.total_pages) {
                hasMoreCredentials.value = false;
            }
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    fetchCredentials();
</script>

<style module lang="scss"></style>

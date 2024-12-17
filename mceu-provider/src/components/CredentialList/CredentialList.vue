<template>
    <div>
        <DataTable
            class="shadow-2xl"
            :value="credentialsData.data"
            dataKey="id"
            showGridlines
            stripedRows
            lazy
            paginator
            :rows="credentialsData.limit"
            :rowsPerPageOptions="rowsPerPageOptions"
            :loading="loading"
            :totalRecords="credentialsData.total_records"
            @page="onPageChange"
        >
            <Column
                field="title"
                header="Credential name"
            />

            <Column
                field="learnerName"
                header="Recipient name"
            />

            <Column
                field="learnerMail"
                header="Recipient email"
            />

            <Column
                field="issueDate"
                header="Issue date"
            >
                <template #body="{ data }">
                    {{ convertIsoToDateString(data.issueDate) }}
                </template>
            </Column>

            <Column
                field="status"
                header="Status"
            >
                <template #body="{ data }">
                    {{ data.status?.charAt(0).toUpperCase() + data.status?.slice(1) }}
                </template>
            </Column>

            <Column header="Action">
                <template #body="{ data }">
                    <Button
                        :class="[$style.revoke, { [$style.underline]: data.status !== Status.Revoked }]"
                        label="Revoke"
                        link
                        :disabled="data.status === Status.Revoked"
                        @click="revoke(data.id)"
                    />
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import type { Ref } from 'vue';
    import type { PaginatedResponse } from '@/types/paginatedResponse';
    import { type Credential, Status } from '@/types/credential';
    import type { DataTablePageEvent } from 'primevue/datatable';

    import CredentialsService from '@/services/credentials';

    import { useToast } from 'primevue/usetoast';

    const toast = useToast();

    const rowsPerPageOptions: Ref<number[]> = ref([10, 20, 50]);
    const loading: Ref<boolean> = ref(false);

    let credentialsData: PaginatedResponse<Credential> = reactive({
        data: [],
        limit: rowsPerPageOptions.value[0],
        offset: 0,
        page: 0,
        total_pages: 0,
        total_records: 0,
    });

    const fetchCredentials = async (): Promise<void> => {
        try {
            loading.value = true;

            const response = await CredentialsService.getCredentialsPaginated(
                credentialsData.page + 1, // BE pages start from 1 while the DataTable components start from 0
                credentialsData.limit,
            );

            Object.assign(credentialsData, response.data);
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    fetchCredentials();

    const onPageChange = (e: DataTablePageEvent): void => {
        credentialsData.page = e.page;
        credentialsData.limit = e.rows;
        fetchCredentials();
    };

    const convertIsoToDateString = (isoString: string): string => {
        return isoString.split('T')[0];
    };

    const revoke = async (id: string) => {
        try {
            await CredentialsService.revokeCredential(id);

            const index = credentialsData.data.findIndex((credential: Credential) => credential.id === id);

            if (index !== -1) {
                credentialsData.data.splice(index, 1, {
                    ...credentialsData.data[index],
                    status: Status.Revoked,
                });
            }

            showSuccess();
        } catch (error: any) {
            console.error(error);
            showError(error.response?.data?.message);
        }
    };

    const showSuccess = () => {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Credential revoked',
            life: 3000,
        });
    };

    const showError = (detail?: string) => {
        toast.add({
            severity: 'error',
            summary: 'Error',
            detail: detail,
            life: 3000,
        });
    };
</script>

<style module lang="scss">
    .revoke {
        padding: 0;
    }

    .underline {
        text-decoration: underline;
        text-underline-offset: 4px;
    }
</style>

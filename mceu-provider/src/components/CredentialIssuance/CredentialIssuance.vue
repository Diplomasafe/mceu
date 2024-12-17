<template>
    <Card
        :class="$style.root"
        class="max-w-lg mx-auto"
    >
        <template #content>
            <div class="flex flex-col gap-5">
                <div
                    v-for="(value, key) in data"
                    class="flex flex-col gap-2"
                    :key="key"
                >
                    <label :for="key">{{ toTitleCase(key) }}</label>
                    <InputText
                        v-if="key !== 'issueDate'"
                        :id="key"
                        v-model="data[key]"
                    />

                    <DatePicker
                        v-else
                        :id="key"
                        v-model="data[key] as Date"
                        dateFormat="yy-mm-dd"
                    />
                </div>

                <Button
                    label="Issue"
                    class="w-max px-6 ml-auto"
                    @click="issueCredential"
                />
            </div>
        </template>
    </Card>
</template>

<script setup lang="ts">
    import { reactive } from 'vue';
    import type { Credential } from '@/types/credential';
    import CredentialsService from '@/services/credentials';
    import { useToast } from 'primevue/usetoast';

    const toast = useToast();

    const data = reactive<Credential>({
        learnerName: '',
        learnerMail: '',
        title: '',
        issueDate: new Date(),
        country: '',
        criteria: '',
        credits: '',
        level: '',
        assessmentType: '',
        participationForm: '',
        verifiedBy: '',
    });

    const issueCredential = async (): Promise<void> => {
        try {
            if (data.issueDate instanceof Date) {
                data.issueDate = formatDate(data.issueDate);
            }

            await CredentialsService.issueCredential(data);

            showSuccess();
        } catch (error: any) {
            console.error(error);

            let customMessage: string;

            if (error.response?.data?.errors && Object.keys(error.response?.data?.errors).length) {
                const customMessageSplit: string[] =
                    error.response?.data?.errors[Object.keys(error.response?.data?.errors)[0]].split(' ');
                customMessageSplit[0] = toTitleCase(customMessageSplit[0]);
                customMessage = customMessageSplit.join(' ');
            } else {
                customMessage = error.response?.data?.message;
            }

            showError(customMessage);
        }
    };

    function toTitleCase(str: string): string {
        return str
            .replace(/([A-Z])/g, ' $1') // Insert space before each capital letter
            .toLowerCase() // Convert the entire string to lowercase
            .replace(/^./, (char) => char.toUpperCase()) // Capitalize only the first letter
            .trim();
    }

    const formatDate = (date: Date): string => {
        const year = date.getFullYear().toString();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Get month and pad with leading zero
        const day = date.getDate().toString().padStart(2, '0'); // Get day and pad with leading zero

        return `${year}-${month}-${day}`;
    };

    const showSuccess = () => {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Credential issued',
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
    .root {
        box-shadow:
            rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    }
</style>

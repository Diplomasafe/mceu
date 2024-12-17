<template>
    <Dialog
        modal
        header="Request Credential"
        :dismissableMask="true"
        :visible="visible"
        @update:visible="hideDialog"
    >
        <div class="p-field">
            <label for="courseName">Course name</label>
            <InputText
                id="courseName"
                v-model="courseName"
                placeholder="Enter course name"
            />
        </div>
        <div class="p-d-flex p-jc-end">
            <Button
                label="Cancel"
                icon="pi pi-times"
                class="p-button-text"
                @click="hideDialog"
            />
            <Button
                label="Request"
                icon="pi pi-check"
                @click="submitRequest"
            />
        </div>
    </Dialog>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import CredentialService from '../../services/credential.service';
    import Dialog from 'primevue/dialog';
    import InputText from 'primevue/inputtext';
    import { useToast } from 'primevue/usetoast';

    const toast = useToast();

    // Define props
    defineProps<{
        visible: boolean;
    }>();

    // Define emits
    const emit = defineEmits<{
        (e: 'update:visible', value: boolean): void;
    }>();

    // Define state
    const courseName = ref<string>('');

    // Methods
    const hideDialog = () => {
        emit('update:visible', false);
    };

    const submitRequest = async () => {
        if (!courseName.value) {
            showError('Course name is empty');

            return;
        }

        await CredentialService.requestCredential(courseName.value)
            .then((response) => {
                showSuccess();

                hideDialog();
            })
            .catch((error) => showError('Request not send'));
    };

    const showSuccess = () => {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Request send',
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

<style scoped></style>

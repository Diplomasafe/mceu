<template>
    <div
        v-if="credentialClaimed.learnerTemporaryPassword"
        class="flex justify-center"
    >
        <Card class="w-96">
            <template #title>Login Information</template>
            <template #content>
                <Divider
                    align="center"
                    type="solid"
                >
                    <b>Email</b>
                </Divider>

                <div class="text-center">{{ credentialClaimed.learnerEmail }}</div>
                <Divider
                    align="center"
                    type="solid"
                >
                    <b>Temporary Password</b>
                </Divider>

                <div class="text-center">{{ credentialClaimed.learnerTemporaryPassword }}</div>
            </template>
            <template #footer>
                <div class="flex gap-4 mt-1">
                    <Button
                        label="Login"
                        class="w-full"
                        @click="goToKeycloakLogin()"
                    />
                </div>
            </template>
        </Card>
    </div>
</template>

<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';
    import CredentialService from '@/services/credential.service';
    import KeycloakService from '@/services/keycloak';
    import type { ClaimDetailsDto, CredentialClaimedDto } from '@/dtos';
    import { useToast } from 'primevue/usetoast';
    import { ref } from 'vue';
    import type { KeycloakLoginOptions } from 'keycloak-js';

    // Access the current route
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    // Extract the parameters
    const id = route.params.id as string;
    const hash = route.params.hash as string;

    // Declare a reactive data variable
    let claimDetails: ClaimDetailsDto;

    // Define state
    const credentialClaimed = ref<CredentialClaimedDto>({
        credentialId: '',
    });

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

    // Fetch the data when the component is mounted
    const claimCredential = async (): Promise<any> => {
        try {
            const response = await CredentialService.getClaimDetails(id, hash);

            if (!response.data) {
                throw new Error('Credential details are empty');
            }
            claimDetails = response.data;

            if (!claimDetails.authenticatedLearner && claimDetails.learnerExists) {
                await KeycloakService.GoToLogin();
            }

            const claimResponse = await CredentialService.claimCredential(id, hash);
            credentialClaimed.value = claimResponse.data;

            if (!credentialClaimed.value.learnerTemporaryPassword) {
                router.push('my-credentials');
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    const goToKeycloakLogin = async (): Promise<void> => {
        const options: KeycloakLoginOptions = {
            redirectUri: import.meta.env.VITE_APP_URL + '/my-credentials',
        };

        await KeycloakService.GoToLogin(options);
    };

    claimCredential();
</script>

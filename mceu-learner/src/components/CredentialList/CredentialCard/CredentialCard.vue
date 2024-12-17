<template>
    <Card
        v-if="credential"
        :class="$style.root"
        class="flex flex-col w-full"
    >
        <template #title>
            <h1 class="mt-0 mb-4">{{ credential.title }}</h1>
        </template>

        <template #content>
            <div class="flex justify-between mb-4">
                <span>Recipient name</span>

                <span>{{ credential.learnerName }}</span>
            </div>

            <div class="flex justify-between mb-4">
                <span>Issue date</span>

                <span>{{ convertIsoToDateString(credential.issueDate) }}</span>
            </div>

            <div class="flex justify-between">
                <span>Issuer name</span>

                <span>{{ credential.issuerName }}</span>
            </div>

            <div class="flex justify-end gap-3 mt-6">
                <template v-if="!props.isThirdPartyView">
                    <Button
                        label="Share"
                        @click="copyToClipboard(credential.id)"
                    />

                    <Button
                        label="Download"
                        @click="copyJwtToClipboard(credential.id)"
                    />
                </template>

                <template v-else>
                    <Button
                        class="bg-green-500 border-green-500 cursor-default"
                        label="Verified"
                        icon="pi pi-check-circle"
                        iconPos="left"
                    />
                </template>
            </div> </template
        >>
    </Card>
</template>

<script setup lang="ts">
    import CredentialService from '@/services/credential.service';
    import type { Credential } from '@/dtos/credential.dto';
    import type { PropType } from 'vue';

    const props = defineProps({
        isThirdPartyView: {
            type: Boolean,
            default: false,
        },
        credential: {
            type: Object as PropType<Credential | null>,
            required: true,
        },
    });

    const copyToClipboard = async (id: string) => {
        try {
            await navigator.clipboard.writeText(import.meta.env.VITE_APP_URL + `/credentials/${id}`);

            alert('Shared link copied to clipboard!');
        } catch (err) {
            alert('Failed to copy share link.');
        }
    };

    const copyJwtToClipboard = async (id: string) => {
        try {
            await CredentialService.getJwt(id).then(async (response) => {
                if (!response.data.vcToken) {
                    throw new Error('EBSI token is empty');
                }

                await navigator.clipboard.writeText(response.data.vcToken);
                alert('EBSI Jwt copied to clipboard!');
            });
        } catch (err) {
            alert('Failed to copy Ebsi jwt.');
        }
    };

    const convertIsoToDateString = (isoString: string): string => {
        return isoString.split('T')[0];
    };
</script>

<style module lang="scss">
    .root {
        box-shadow:
            rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
            rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
    }
</style>

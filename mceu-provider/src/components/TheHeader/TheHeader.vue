<template>
    <div class="flex justify-between">
        <div class="flex">
            <img
                class="max-w-72"
                src="../../assets/images/logo.png"
                alt="Logo"
            />
        </div>

        <nav class="flex justify-evenly">
            <Button
                class="text-black"
                label="Credential issuance"
                link
                @click="router.push('/credential-issuance')"
            />

            <Button
                class="text-black"
                label="Credential listing"
                link
                @click="router.push('/credential-list')"
            />

            <Button
                class="text-black"
                label="Users"
                link
                @click="router.push('/users')"
            />

            <Button
                v-if="KeycloakService.IsLoggedIn()"
                class="text-black"
                label="Logout"
                link
                @click="KeycloakService.CallLogOut()"
            />
        </nav>
    </div>
</template>

<script setup lang="ts">
    import KeycloakService from '@/services/keycloak';
    import { useRouter } from 'vue-router';

    const router = useRouter();
</script>

<template>
    <div>
        <DataTable
            class="shadow-2xl"
            :value="usersData.data"
            dataKey="id"
            showGridlines
            stripedRows
            lazy
            paginator
            :rows="usersData.limit"
            :rowsPerPageOptions="rowsPerPageOptions"
            :loading="loading"
            :totalRecords="usersData.total_records"
            @page="onPageChange"
        >
            <template #header>
                <Button
                    label="Create user"
                    @click="openCreateModal"
                />
            </template>

            <Column
                field="name"
                header="Name"
            />

            <Column
                field="email"
                header="Email"
            />

            <Column
                field="role"
                header="Role"
            />

            <Column
                field="status"
                header="Status"
            >
                <template #body="{ data }">
                    {{ data.status?.charAt(0).toUpperCase() + data.status?.slice(1) }}
                </template>
            </Column>

            <Column :header="'Actions'">
                <template #body="slotProps">
                    <Button
                        icon="pi pi-ellipsis-h"
                        aria-haspopup="true"
                        aria-controls="overlay_menu"
                        @click="(e) => toggleRowMenu(e, slotProps.data.id)"
                    />

                    <Menu
                        id="overlay_menu"
                        :ref="(el) => setDynamicRef(`menu-${slotProps.data.id}`, el)"
                        :model="menuItems"
                        :popup="true"
                    />
                </template>
            </Column>
        </DataTable>

        <Dialog
            v-if="showUserModal"
            v-model:visible="showUserModal"
            modal
            :header="ModalHeader[modalMode]"
            :style="{ width: '25rem' }"
        >
            <div class="flex flex-col gap-5">
                <div class="flex flex-col gap-2">
                    <label for="name">Name</label>
                    <InputText
                        id="name"
                        class="flex-auto"
                        v-model="targetUser.name"
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="email">Email</label>
                    <InputText
                        id="email"
                        class="flex-auto"
                        v-model="targetUser.email"
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="role">Role</label>
                    <Select
                        id="role"
                        v-model="targetUser.role"
                        :options="roleOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select a role"
                    />
                </div>

                <div class="flex flex-col gap-2">
                    <label for="status">Status</label>
                    <Select
                        id="status"
                        v-model="targetUser.status"
                        :options="statusOptions"
                        optionLabel="label"
                        optionValue="value"
                        placeholder="Select a status"
                    />
                </div>

                <div class="flex justify-end gap-2">
                    <Button
                        type="button"
                        label="Save"
                        @click="saveUser(modalMode)"
                    />
                </div>
            </div>
        </Dialog>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive } from 'vue';
    import type { Ref } from 'vue';

    import UsersService from '@/services/users';

    import type { DataTablePageEvent } from 'primevue/datatable';
    import type { User, UserResponse } from '@/types/users';
    import { UserRole, UserStatus } from '@/types/users';
    import type { PaginatedResponse } from '@/types/paginatedResponse';

    import { useToast } from 'primevue/usetoast';

    const toast = useToast();

    enum ModalMode {
        Create = 'Create',
        Update = 'Update',
    }

    enum ModalHeader {
        Create = 'Create user',
        Update = 'Update user',
    }

    const roleOptions = Object.values(UserRole).map((role) => ({
        label: role.charAt(0).toUpperCase() + role.slice(1), // Capitalize the first letter
        value: role,
    }));

    const statusOptions = Object.values(UserStatus).map((status) => ({
        label: status.charAt(0).toUpperCase() + status.slice(1), // Capitalize the first letter
        value: status,
    }));

    const loading: Ref<boolean> = ref(false);

    const rowsPerPageOptions: Ref<number[]> = ref([10, 20, 50]);

    let usersData: PaginatedResponse<UserResponse> = reactive({
        data: [],
        limit: rowsPerPageOptions.value[0],
        offset: 0,
        page: 0,
        total_pages: 0,
        total_records: 0,
    });

    const fetchUsers = async (): Promise<void> => {
        try {
            loading.value = true;

            const response = await UsersService.getUsersPaginated(
                usersData.page + 1, // BE pages start from 1 while the DataTable components start from 0
                usersData.limit,
            );

            Object.assign(usersData, response.data);
        } catch (error) {
            console.error(error);
        } finally {
            loading.value = false;
        }
    };

    fetchUsers();

    const onPageChange = (e: DataTablePageEvent): void => {
        usersData.page = e.page;
        usersData.limit = e.rows;
        fetchUsers();
    };

    const menuItems = [
        {
            label: 'Actions',
            items: [
                {
                    label: 'Update',
                    icon: 'pi pi-user-edit',
                    command: (): void => {
                        showUserModal.value = true;
                        modalMode.value = ModalMode.Update;
                    },
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    command: (): void => {
                        deleteUser();
                    },
                },
            ],
        },
    ];

    const showUserModal: Ref<boolean> = ref(false);
    const modalMode: Ref<ModalMode> = ref(ModalMode.Update);

    const targetUser: User = reactive({
        id: null,
        name: null,
        email: null,
        role: null,
        status: null,
    });

    const saveUser = async (action: ModalMode): Promise<void> => {
        try {
            // Copy targetUser without the id property
            const { id, ...targetUserCopy } = targetUser;

            if (action === ModalMode.Create) {
                const response = await UsersService.createUser(targetUserCopy);

                usersData.data.unshift(response.data);

                showSuccess('User created');
            } else {
                if (!targetUser.id) return;

                const response = await UsersService.updateUser(targetUser.id, targetUserCopy);

                const index = usersData.data.findIndex((user: UserResponse) => user.id === targetUser.id);
                if (index !== -1) {
                    usersData.data.splice(index, 1, response.data);
                }

                showSuccess('User updated');
            }
        } catch (error: any) {
            console.error(error);
            showError(error.response?.data?.message);
        } finally {
            showUserModal.value = false;
        }
    };

    const deleteUser = async (): Promise<void> => {
        try {
            if (!targetUser.id) return;

            await UsersService.deleteUser(targetUser.id);

            usersData.data = usersData.data.filter((user) => user.id !== targetUser.id);

            showSuccess('User deleted');
        } catch (error: any) {
            console.error(error);
            showError(error.response?.data?.message);
        }
    };

    const dynamicRefs = ref<{ [key: string]: any }>({});

    const setDynamicRef = (key: string, el: any) => {
        if (el) {
            dynamicRefs.value[key] = el;
        }
    };

    const toggleRowMenu = (event: Event, id: string) => {
        const user = usersData.data.find((user: UserResponse) => user.id === id);
        if (!user) return;

        const { name, email, role, status } = user;
        Object.assign(targetUser, { id, name, email, role, status });

        dynamicRefs.value[`menu-${id}`].toggle(event);
    };

    const openCreateModal = () => {
        // Reset state
        Object.keys(targetUser).forEach((key) => {
            targetUser[key as keyof User] = null;
        });

        showUserModal.value = true;
        modalMode.value = ModalMode.Create;
    };

    const showSuccess = (detail: string) => {
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: detail,
            life: 3000,
        });
    };

    const showError = (detail: string) => {
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

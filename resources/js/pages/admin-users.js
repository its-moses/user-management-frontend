import API from '../api.js';
import SweetAlert from '../sweetalert.js';

class AdminUsersPage {
    constructor() {
        this.searchInput = document.getElementById('searchInput');
        this.addUserBtn = document.getElementById('addUserBtn');
        this.usersTableBody = document.getElementById('usersTableBody');
        this.paginationContainer = document.getElementById('paginationContainer');

        this.currentPage = 1;
        this.searchDebounceTimer = null;

        this.init();
    }

    init() {
        this.loadUsers();
        this.attachEventListeners();
    }

    attachEventListeners() {
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
        this.addUserBtn.addEventListener('click', () => this.showCreateModal());
    }

    handleSearch(e) {
        clearTimeout(this.searchDebounceTimer);
        const query = e.target.value.trim();

        this.searchDebounceTimer = setTimeout(() => {
            if (query.length > 0) {
                this.searchUsers(query);
            } else {
                this.loadUsers();
            }
        }, 500);
    }

    async searchUsers(query) {
        try {
            const response = await API.get(`/admin/users/search?q=${encodeURIComponent(query)}`);
            this.renderUsersTable(response.data.data.users || []);
            this.paginationContainer.innerHTML = '';
        } catch (error) {
            SweetAlert.error('Search failed');
        }
    }

    async loadUsers(page = 1) {
        try {
            this.currentPage = page;
            const response = await API.get(`/admin/users?page=${page}`);
            // console.log(response.data.data.users)
            console.log(typeof (response.data.data.users))

            this.renderUsersTable(response.data.data.users);
            this.renderPagination(response.data.data.pagination);
        } catch (error) {
            SweetAlert.error('Failed to load users');
        }
    }

    renderUsersTable(users) {
        if (users.length === 0) {
            this.usersTableBody.innerHTML = `
                <tr>
                    <td colspan="7" class="text-center py-4">
                        <i data-feather="users" class="text-muted mb-2"></i>
                        <p class="text-muted">No users found</p>
                    </td>
                </tr>
            `;
            if (typeof feather !== 'undefined') feather.replace();
            return;
        }

        this.usersTableBody.innerHTML = users.map(user => `
            <tr data-user-id="${user.id}">
                <td>${user.id}</td>
                <td>${this.escapeHtml(user.name)}</td>
                <td>${this.escapeHtml(user.email)}</td>
                <td>
                    <span class="badge bg-${user.role.name === 'admin' ? 'danger' : 'primary'}">
                        ${user.role.name.charAt(0).toUpperCase() + user.role.name.slice(1)}
                    </span>
                </td>
                <td>
                    <span class="badge bg-${user.status === 'active' ? 'success' : 'secondary'}">
                        ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                </td>
                <td>${this.formatDate(user.last_login_at)}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button class="icon-btn icon-btn-success" onclick="adminUsersPage.showViewModal(${user.id})" title="View">
                            <i data-feather="eye"></i>
                        </button>
                        <button class="icon-btn icon-btn-primary" onclick="adminUsersPage.showEditModal(${user.id})" title="Edit">
                            <i data-feather="edit"></i>
                        </button>
                        <button class="icon-btn icon-btn-danger" onclick="adminUsersPage.confirmDelete(${user.id}, '${this.escapeHtml(user.name)}')" title="Delete">
                            <i data-feather="trash-2"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        if (typeof feather !== 'undefined') feather.replace();
    }

    renderPagination(data) {
    if (!data.last_page || data.last_page <= 1) {
        this.paginationContainer.innerHTML = '';
        return;
    }

    const current = data.current_page;
    const last = data.last_page;

    const pages = [];

    // Previous Button
    pages.push(`
        <li class="page-item ${current === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="adminUsersPage.loadUsers(${current - 1}); return false;">Previous</a>
        </li>
    `);

    // Helper: add page button
    const addPage = (page) => {
        pages.push(`
            <li class="page-item ${page === current ? 'active' : ''}">
                <a class="page-link" href="#" onclick="adminUsersPage.loadUsers(${page}); return false;">${page}</a>
            </li>
        `);
    };

    // Page 1
    addPage(1);

    // Left dots
    if (current > 4) {
        pages.push(`<li class="page-item disabled"><span class="page-link">...</span></li>`);
    }

    // Middle pages
    for (let page = current - 2; page <= current + 2; page++) {
        if (page > 1 && page < last) addPage(page);
    }

    // Right dots
    if (current < last - 3) {
        pages.push(`<li class="page-item disabled"><span class="page-link">...</span></li>`);
    }

    // Last page
    if (last > 1) addPage(last);

    // Next Button
    pages.push(`
        <li class="page-item ${current === last ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="adminUsersPage.loadUsers(${current + 1}); return false;">Next</a>
        </li>
    `);

    this.paginationContainer.innerHTML = `
        <nav>
            <ul class="pagination justify-content-center">
                ${pages.join("")}
            </ul>
        </nav>
    `;
}


    showCreateModal() {
        Swal.fire({
            title: 'Create New User',
            html: `
                <form id="createUserForm" class="text-start">
                    <div class="mb-3">
                        <label for="createName" class="form-label">Name</label>
                        <input type="text" class="form-control" id="createName" required>
                    </div>
                    <div class="mb-3">
                        <label for="createEmail" class="form-label">Email</label>
                        <input type="email" class="form-control" id="createEmail" required>
                    </div>
                    <div class="mb-3">
                        <label for="createPassword" class="form-label">Password</label>
                        <input type="password" class="form-control" id="createPassword" required>
                    </div>
                    <div class="mb-3">
                        <label for="createRole" class="form-label">Role</label>
                        <select class="form-select" id="createRole" required>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="createStatus" class="form-label">Status</label>
                        <select class="form-select" id="createStatus" required>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </form>
            `,
            showCancelButton: true,
            confirmButtonText: 'Create User',
            cancelButtonText: 'Cancel',
            customClass: {
                confirmButton: 'btn btn-primary',
                cancelButton: 'btn btn-secondary'
            },
            preConfirm: () => {
                const name = document.getElementById('createName').value;
                const email = document.getElementById('createEmail').value;
                const password = document.getElementById('createPassword').value;
                const role = document.getElementById('createRole').value;
                const status = document.getElementById('createStatus').value;

                if (!name || !email || !password) {
                    Swal.showValidationMessage('Please fill all required fields');
                    return false;
                }

                return { name, email, password, role, status };
            }
        }).then(async (result) => {
            if (result.isConfirmed) {
                await this.createUser(result.value);
            }
        });
    }

    async createUser(userData) {
        try {
            SweetAlert.loading('Creating user...');
            await API.post('/admin/users', userData);
            SweetAlert.close();
            SweetAlert.toast('User created successfully', 'success');
            this.loadUsers(this.currentPage);
        } catch (error) {
            SweetAlert.error(error.message || 'Failed to create user');
        }
    }

    async showViewModal(userId) {
        try {
            SweetAlert.loading('Loading user details...');
            const response = await API.get(`/admin/users/${userId}`);
            const user = response.data.data;
            // console.log(user)

            const roleName = typeof user.role === 'string'
                ? user.role
                : user.role?.name ?? 'N/A';

            const statusName = typeof user.status === 'string'
                ? user.status
                : user.status?.value ?? user.status?.name ?? 'N/A';
            Swal.fire({
                title: 'User Details',
                html: `
                    <div class="text-start">
                        <div class="mb-3">
                            <strong>ID:</strong> ${user.id}
                        </div>
                        <div class="mb-3">
                            <strong>Name:</strong> ${this.escapeHtml(user.name)}
                        </div>
                        <div class="mb-3">
                            <strong>Email:</strong> ${this.escapeHtml(user.email)}
                        </div>
                        <div class="mb-3">
                            <strong>Role:</strong> 
                           <span class="badge bg-${roleName === 'admin' ? 'danger' : 'primary'}">
                                ${roleName.charAt(0).toUpperCase() + roleName.slice(1)}
                            </span>
                        </div>
                        <div class="mb-3">
                            <strong>Status:</strong> 
                            <span class="badge bg-${statusName === 'active' ? 'success' : 'secondary'}">
                                ${statusName.charAt(0).toUpperCase() + statusName.slice(1)}
                            </span>
                        </div>
                        <div class="mb-3">
                            <strong>Last Login:</strong> ${this.formatDate(user.last_login_at)}
                        </div>
                        <div class="mb-3">
                            <strong>Login IP:</strong> ${user.login_ip || 'N/A'}
                        </div>
                        <div class="mb-3">
                            <strong>Created:</strong> ${this.formatDate(user.created_at)}
                        </div>
                    </div>
                `,
                confirmButtonText: 'Close',
                customClass: {
                    confirmButton: 'btn btn-primary'
                }
            });
        } catch (error) {
            // console.log(error)
            SweetAlert.error('Failed to load user details');
        }
    }

    async showEditModal(userId) {
        try {
            SweetAlert.loading('Loading user details...');
            const response = await API.get(`/admin/users/${userId}`);
            const user = response.data.data;
            // console.log(user)

            Swal.fire({
                title: 'Edit User',
                html: `
                    <form id="editUserForm" class="text-start">
                        <div class="mb-3">
                            <label for="editName" class="form-label">Name</label>
                            <input type="text" class="form-control" id="editName" value="${this.escapeHtml(user.name)}" required>
                        </div>
                        <div class="mb-3">
                            <label for="editEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="editEmail" value="${this.escapeHtml(user.email)}" required>
                        </div>
                        <div class="mb-3">
                            <label for="editPassword" class="form-label">Password (leave blank to keep current)</label>
                            <input type="password" class="form-control" id="editPassword">
                        </div>
                        <div class="mb-3">
                            <label for="editRole" class="form-label">Role</label>
                            <select class="form-select" id="editRole" required>
                                <option value="user" ${user.role.name === 'user' ? 'selected' : ''}>User</option>
                                <option value="admin" ${user.role.name === 'admin' ? 'selected' : ''}>Admin</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label for="editStatus" class="form-label">Status</label>
                            <select class="form-select" id="editStatus" required>
                                <option value="active" ${user.status === 'active' ? 'selected' : ''}>Active</option>
                                <option value="inactive" ${user.status === 'inactive' ? 'selected' : ''}>Inactive</option>
                            </select>
                        </div>
                    </form>
                `,
                showCancelButton: true,
                confirmButtonText: 'Update User',
                cancelButtonText: 'Cancel',
                customClass: {
                    confirmButton: 'btn btn-primary',
                    cancelButton: 'btn btn-secondary'
                },
                preConfirm: () => {
                    const name = document.getElementById('editName').value;
                    const email = document.getElementById('editEmail').value;
                    const password = document.getElementById('editPassword').value;
                    const role = document.getElementById('editRole').value;
                    const status = document.getElementById('editStatus').value;

                    if (!name || !email) {
                        Swal.showValidationMessage('Name and email are required');
                        return false;
                    }

                    const data = { name, email, role, status };
                    if (password) {
                        data.password = password;
                    }

                    return data;
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    await this.updateUser(userId, result.value);
                }
            });
        } catch (error) {
            SweetAlert.error('Failed to load user details');
        }
    }

    async updateUser(userId, userData) {
        try {
            SweetAlert.loading('Updating user...');
            await API.put(`/admin/users/${userId}`, userData);
            SweetAlert.close();
            SweetAlert.toast('User updated successfully', 'success');
            this.loadUsers(this.currentPage);
        } catch (error) {
            SweetAlert.error(error.message || 'Failed to update user');
        }
    }

    async confirmDelete(userId, userName) {
        const result = await SweetAlert.confirm(
            'Are you sure?',
            `You are about to delete "${userName}". This action cannot be undone.`,
            'Yes, delete it!'
        );

        if (result.isConfirmed) {
            await this.deleteUser(userId);
        }
    }

    async deleteUser(userId) {
        try {
            SweetAlert.loading('Deleting user...');
            await API.delete(`/admin/users/${userId}`);
            SweetAlert.close();
            SweetAlert.toast('User deleted successfully', 'success');
            this.loadUsers(this.currentPage);
        } catch (error) {
            SweetAlert.error(error.message || 'Failed to delete user');
        }
    }

    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

let adminUsersPage;
document.addEventListener('DOMContentLoaded', () => {
    window.adminUsersPage = new AdminUsersPage();
});
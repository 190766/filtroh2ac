document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
    const loginForm = document.getElementById('loginForm');
    const adminSection = document.getElementById('adminSection');
    const paymentForm = document.getElementById('paymentForm');
    
    // Sample data for CRUD operations
    let sampleData = [
        { id: 1, name: "Admin User", email: "admin@example.com", role: "Administrator" },
        { id: 2, name: "John Doe", email: "john@example.com", role: "User" },
        { id: 3, name: "Jane Smith", email: "jane@example.com", role: "User" }
    ];

    // Show login modal when login button is clicked
    loginBtn.addEventListener('click', function() {
        loginModal.show();
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Simple admin check (in real app, use proper authentication)
        if (email === "admin@example.com" && password === "admin123") {
            adminSection.classList.remove('d-none');
            loginModal.hide();
            loadDataTable();
            alert('Admin login successful!');
        } else {
            alert('Invalid credentials. Only admin can access the dashboard.');
        }
    });

    // CRUD Operations
    function loadDataTable() {
        const tableBody = document.getElementById('dataTable');
        tableBody.innerHTML = '';
        
        sampleData.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
                <td>${item.role}</td>
                <td>
                    <button class="btn btn-sm btn-warning edit-btn" data-id="${item.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${item.id}">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
        
        // Add event listeners to edit and delete buttons
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editItem(id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                deleteItem(id);
            });
        });
    }
    
    // Create button functionality
    document.getElementById('createBtn').addEventListener('click', function() {
        // In a real app, you would show a modal or form to create a new item
        const newId = sampleData.length > 0 ? Math.max(...sampleData.map(item => item.id)) + 1 : 1;
        const newItem = {
            id: newId,
            name: `New User ${newId}`,
            email: `user${newId}@example.com`,
            role: "User"
        };
        sampleData.push(newItem);
        loadDataTable();
        alert(`Created new item with ID ${newId}`);
    });
    
    // Read button functionality
    document.getElementById('readBtn').addEventListener('click', function() {
        loadDataTable();
        alert('Data refreshed');
    });
    
    // Edit functionality
    function editItem(id) {
        const item = sampleData.find(item => item.id === id);
        if (item) {
            // In a real app, you would show a form to edit the item
            const newName = prompt('Enter new name:', item.name);
            if (newName) {
                item.name = newName;
                loadDataTable();
                alert(`Item ${id} updated`);
            }
        }
    }
    
    // Delete functionality
    function deleteItem(id) {
        if (confirm(`Are you sure you want to delete item ${id}?`)) {
            sampleData = sampleData.filter(item => item.id !== id);
            loadDataTable();
            alert(`Item ${id} deleted`);
        }
    }
    
    // Handle payment form submission
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // In a real app, you would integrate with a payment gateway like Stripe
        alert('Payment would be processed here. This is a demo.');
        // Reset form
        this.reset();
    });
});
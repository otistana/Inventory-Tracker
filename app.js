// Simple inventory table renderer
// - `inventory`: order of columns to show for each item
// - `table`: the HTML <table> where rows will be added
// Functions below create a row for each inventory item and
// fill a cell for every field listed in `inventory`.
const inventory = ["id", "name", "sku", "location", "quantity"]; // column names (order matters)
const table = document.getElementById("table"); // find the table element on the page
let items = JSON.parse(localStorage.getItem("items")) || []; // list of inventory items (not used yet)


// Add a single item to the HTML table
function addItemToTable(item) {
    const row = table.insertRow(); // make a new row (like a shelf row)
    const cells = [];
    // For each field name (id, name, sku, ...), make a cell and put the item's value there
    inventory.forEach((field) => {
        const cell = row.insertCell(); // make a new cell (a little box on the row)
        const text = document.createTextNode(item[field]); // get the text for this field from the item
        cell.appendChild(text); // put the text into the cell so it appears on the page
        cells.push(cell);
    });
    
    // delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete-btn';
    deleteBtn.onclick = function() {
        row.remove();
        // remove items from array
        items = items.filter(i => i.id !== item.id);
        // save update array
        localStorage.setItem("items", JSON.stringify(items) );
    };

    // edit button
    const editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    editBtn.className = 'edit-btn';
    editBtn.onclick = function() {
        const quantityCell = cells[4]; // quantity is at index 4
        if (editBtn.textContent === 'Edit') {
            const input = document.createElement('input');
            input.type = 'number';
            input.value = item.quantity;
            quantityCell.textContent = '';
            quantityCell.appendChild(input);
            editBtn.textContent = 'Save';
        } else {
            item.quantity = quantityCell.querySelector('input').value;
            quantityCell.textContent = item.quantity;
            editBtn.textContent = 'Edit';

            localStorage.setItem("items", JSON.stringify(items) );
        }
    };

    const actionCell = row.insertCell();
    actionCell.appendChild(editBtn);
    actionCell.appendChild(deleteBtn);
}

// Render a list of inventory items into the HTML table
function renderInventory(items) {
    // Show every item in the provided list by adding it to the table
    items.forEach((item) => {
        addItemToTable(item); // put this item on the table
    });     
}

// Load items from localStorage when the page loads
renderInventory(items);

// Wire the HTML form so submitted items are added to the table
const form = document.getElementById('addItemForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const f = e.target;
        const item = {
            id: Date.now().toString(),
            name: f.elements['name'].value,
            sku: f.elements['sku'].value,
            location: f.elements['location'].value,
            quantity: f.elements['quantity'].value,
        };
        items.push(item);
        localStorage.setItem("items", JSON.stringify(items) );
        addItemToTable(item);
        f.reset();
    });
} else {
    console.warn('Add-item form not found: #addItemForm');
}


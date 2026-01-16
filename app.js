// Simple inventory table renderer
// - `inventory`: order of columns to show for each item
// - `table`: the HTML <table> where rows will be added
// Functions below create a row for each inventory item and
// fill a cell for every field listed in `inventory`.
const inventory = ["id", "name", "sku", "location", "quantity"]; // column names (order matters)
const table = document.getElementById("table"); // find the table element on the page
let items = []; // list of inventory items (not used yet)


// Add a single item to the HTML table
function addItemToTable(item) {
    const row = table.insertRow(); // make a new row (like a shelf row)
    // For each field name (id, name, sku, ...), make a cell and put the item's value there
    inventory.forEach((field) => {
        const cell = row.insertCell(); // make a new cell (a little box on the row)
        const text = document.createTextNode(item[field]); // get the text for this field from the item
        cell.appendChild(text); // put the text into the cell so it appears on the page
    });
}

function renderInventory(items) {
    // Show every item in the provided list by adding it to the table
    items.forEach((item) => {
        addItemToTable(item); // put this item on the table
    });     
}

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
        addItemToTable(item);
        f.reset();
    });
} else {
    console.warn('Add-item form not found: #addItemForm');
}

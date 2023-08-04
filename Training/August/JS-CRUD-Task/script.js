document.addEventListener("DOMContentLoaded", () => {
    const addItemButton = document.getElementById("addItem");
    const updateItemButton = document.getElementById("updateItem");
    const deleteItemButton = document.getElementById("deleteItem");
    const itemList = document.getElementById("itemList");

    addItemButton.addEventListener("click", addItem);
    updateItemButton.addEventListener("click", updateItem);
    deleteItemButton.addEventListener("click", deleteItem);

    // Load initial items from local storage
    loadItems();

    function addItem() {
        const itemText = document.getElementById("itemText").value;
        if (itemText.trim() !== "") {
            const items = getItems();
            items.push(itemText);
            saveItems(items);
            updateItemList();
        }
    }

    function updateItem() {
        const updatedText = document.getElementById("updatedText").value;
        if (updatedText.trim() !== "") {
            const selectedIndex = prompt("Enter the index of the item to update:");
            if (selectedIndex !== null) {
                const items = getItems();
                if (selectedIndex >= 0 && selectedIndex < items.length) {
                    items[selectedIndex] = updatedText;
                    saveItems(items);
                    updateItemList();
                } else {
                    alert("Invalid index");
                }
            }
        }
    }

    function deleteItem() {
        const selectedIndex = prompt("Enter the index of the item to delete:");
        if (selectedIndex !== null) {
            const items = getItems();
            if (selectedIndex >= 0 && selectedIndex < items.length) {
                items.splice(selectedIndex, 1);
                saveItems(items);
                updateItemList();
            } else {
                alert("Invalid index");
            }
        }
    }

    function getItems() {
        return JSON.parse(localStorage.getItem("items")) || [];
    }

    function saveItems(items) {
        localStorage.setItem("items", JSON.stringify(items));
    }

    function updateItemList() {
        const items = getItems();
        itemList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.textContent = item;
            li.addEventListener("click", () => promptUpdateItem(index));
            itemList.appendChild(li);
        });
    }

    function promptUpdateItem(index) {
        const updatedText = prompt("Enter updated text:", getItems()[index]);
        if (updatedText !== null) {
            const items = getItems();
            items[index] = updatedText;
            saveItems(items);
            updateItemList();
        }
    }

    function loadItems() {
        updateItemList();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const breadth = document.getElementById("breadthInput");
    const height = document.getElementById("heightInput");
    const length = document.getElementById("lengthInput");
    const quantity = document.getElementById("quantityInput");
    const purpose = document.getElementById("AccPurInput");
    const tableBody = document.getElementById('orderSummaryTable');

    let serialCounter = 1;
    let orderItems = []; // To store the items

    const getColorSelection = () => {
        // Get the selected color
        const colorRadios = document.getElementsByName("choice");
        for (const radio of colorRadios) {
            if (radio.checked) {
                return radio.value; // Return the selected value
            }
        }
        return "NA"; // Default value if no color is selected
    };

    const checkEmptyField = () => {
        return breadth.value === "" || height.value === "" || length.value === "" || quantity.value === "" || purpose.value === "";
    };

    const updateSerialNumbers = () => {
        // Update all the serial numbers in the table
        Array.from(tableBody.children).forEach((row, index) => {
            const serialNumberCell = row.querySelector('.serialNum');
            if (serialNumberCell) {
                serialNumberCell.innerText = index + 1; // Set serial number starting from 1
            }
        });
    };

    const addFunction = () => {
        if (checkEmptyField()) {
            alert("Please fill in all fields.");
            return;
        }

        const selectedColor = getColorSelection(); // Get selected color

        // Create a new row
        const newRow = document.createElement('tr');

        // Create cells and populate them
        newRow.innerHTML = `
            <td class="tableEntry firstcol serialNum">${serialCounter}</td>
            <td class="tableEntry secondcol">${breadth.value}</td>
            <td class="tableEntry thirdcol">${height.value}</td>
            <td class="tableEntry fourthcol">${length.value}</td>
            <td class="tableEntry fifthcol">${quantity.value}</td>
            <td class="tableEntry sixthcol">${selectedColor}</td>
            <td class="tableEntry seventhcol">
                <i class="fa fa-trash-o" style="font-size:20px;color:red;cursor:pointer"></i>
            </td>
        `;

        // Append the new row to the table body
        tableBody.appendChild(newRow);

        // Add the item to the orderItems array
        orderItems.push({
            breadth: breadth.value,
            height: height.value,
            length: length.value,
            quantity: quantity.value,
            color: selectedColor,
            purpose: purpose.value
        });

        // Increment serialCounter only after adding a row
        serialCounter += 1;

        // Clear input fields after adding the item
        resetFunction();

        // Add event listener to the remove button
        const removeButton = newRow.querySelector('.fa-trash-o');
        removeButton.addEventListener('click', () => {
            const rowIndex = Array.from(tableBody.children).indexOf(newRow);
            tableBody.removeChild(newRow);

            // Remove the corresponding item from the orderItems array
            orderItems.splice(rowIndex, 1);

            // Update serial numbers after removal
            updateSerialNumbers();

            // Reset serialCounter if the table is empty
            if (tableBody.children.length === 0) {
                serialCounter = 1;
            }
        });

        // Update serial numbers after each add
        updateSerialNumbers();
    };

    const resetFunction = () => {
        breadth.value = "";
        height.value = "";
        length.value = "";
        quantity.value = "";
        purpose.value = "NA";
        // Reset color selection
        const colorRadios = document.getElementsByName("choice");
        for (const radio of colorRadios) {
            radio.checked = false;
        }
    };

    const submitOrder = () => {
        // Prepare data to send to API
        const orderData = {
            items: orderItems
        };

        // Send data to the API
        fetch('http://127.0.0.1:8000/api/orders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
        .then(response => response.json())
        .then(data => {
            alert("Order submitted successfully!");
            console.log('Success:', data);
            // Optionally clear the table and reset orderItems
            tableBody.innerHTML = "";
            orderItems = [];
            serialCounter = 1;
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    const addButton = document.getElementById("addItemButton");
    const resetButton = document.getElementById("reset");
    const submitButton = document.getElementById("placeOrdButton"); // Assuming there is a submit button in your HTML

    addButton.addEventListener("click", addFunction);
    resetButton.addEventListener("click", resetFunction);
    submitButton.addEventListener("click", submitOrder); // Event listener for the submit button
});

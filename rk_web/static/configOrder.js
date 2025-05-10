
document.addEventListener('DOMContentLoaded', () => {
    const breadth = document.getElementById("breadthInput");
    const height = document.getElementById("heightInput");
    const length = document.getElementById("lengthInput");
    const quantity = document.getElementById("quantityInput");
    const purpose = document.getElementById("AccPurInput");
    const tableBody = document.getElementById('orderSummaryTable');
    const usernameElement = document.getElementById("login_button");
    // const userID = document.getElementById("f_userID").textContent
    // console.log(userID)
    let serialCounter = 1;
    let orderItems = [];
    let firmID = null;

    const getColorSelection = () => {
        const colorRadios = document.getElementsByName("choice");
        for (const radio of colorRadios) {
            if (radio.checked) {
                return radio.value;
            }
        }
        return "NA";
    };

    const checkEmptyField = () => {
        return breadth.value === "" || height.value === "" || length.value === "" || quantity.value === "" || purpose.value === "";
    };

    const updateSerialNumbers = () => {
        Array.from(tableBody.children).forEach((row, index) => {
            const serialNumberCell = row.querySelector('.serialNum');
            if (serialNumberCell) {
                serialNumberCell.innerText = index + 1;
            }
        });
    };

    const addFunction = () => {
        if (checkEmptyField()) {
            alert("Please fill in all fields.");
            return;
        }

        const selectedColor = getColorSelection();

        const newRow = document.createElement('tr');
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
        tableBody.appendChild(newRow);

        orderItems.push({
            breadth: breadth.value,
            height: height.value,
            length: length.value,
            quantity: quantity.value,
            color: selectedColor,
            purpose: purpose.value
        });

        serialCounter += 1;
        resetFunction();

        const removeButton = newRow.querySelector('.fa-trash-o');
        removeButton.addEventListener('click', () => {
            const rowIndex = Array.from(tableBody.children).indexOf(newRow);
            tableBody.removeChild(newRow);
            orderItems.splice(rowIndex, 1);
            updateSerialNumbers();
            if (tableBody.children.length === 0) {
                serialCounter = 1;
            }
        });

        updateSerialNumbers();
    };

    const resetFunction = () => {
        breadth.value = "";
        height.value = "";
        length.value = "";
        quantity.value = "";
        purpose.value = "NA";
        const colorRadios = document.getElementsByName("choice");
        for (const radio of colorRadios) {
            radio.checked = false;
        }
    };

    const getFirmDetails = (userID) => {
        const firmApiUrl = `http://127.0.0.1:8000/api/firm/${userID}/`;

        return fetch(firmApiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to fetch firm details: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.length > 0) {
                    firmID = data[0].id; // Assuming the firm ID is in the response
                }
                console.log("Firm details retrieved:", data);
            })
            .catch(error => {
                console.error("Error fetching firm details:", error);
                alert("Unable to retrieve firm details. Please try again.");
            });
    };

    const submitOrder = () => {
        if (orderItems.length === 0) {
            alert("Please add at least one item to the order.");
            return;
        }

        if (!confirm("Are you sure you want to place this order?")) {
            return;
        }

        if (!firmID) {
            alert("Firm details not available. Unable to proceed.");
            return;
        }

        const orderData = {
            items: orderItems,
            firm_id: firmID
        };

        fetch('http://127.0.0.1:8000/api/placeOrders/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Failed to submit order.");
                }
                return response.json();
            })
            .then(data => {
                alert("Order submitted successfully!");
                console.log('Success:', data);
                tableBody.innerHTML = "";
                orderItems = [];
                serialCounter = 1;
            })
            .catch(error => {
                console.error('Error:', error);
                alert("Failed to place order. Please try again.");
            });
    };

    const initializePage = () => {
        let userID = document.getElementById("f_userID").textContent
        getFirmDetails(userID); // Fetch the firm details
    };

    const addButton = document.getElementById("addItemButton");
    const resetButton = document.getElementById("reset");
    const submitButton = document.getElementById("placeOrdButton");

    addButton.addEventListener("click", addFunction);
    resetButton.addEventListener("click", resetFunction);
    submitButton.addEventListener("click", submitOrder);

    initializePage(); // Initialize the page by fetching firm details
});

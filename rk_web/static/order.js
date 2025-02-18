// Fetch order details and populate the table
const userID = window.variableId;
document.addEventListener("DOMContentLoaded", () => {
    const orderTable = document.getElementById("orderDetailTable");
    // console.log(userID);

    // Replace with your backend API URL
    const apiUrl = `http://127.0.0.1:8000/api/order/${userID}`;

    // Fetch data from the API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            populateTable(data);
        })
        .catch(error => {
            console.error("Error fetching order details:", error);
        });

    // Populate table with fetched data
    function populateTable(orders) {
        orders.forEach(order => {
            const row = document.createElement("tr");

            const orderIdCell = document.createElement("td");
            orderIdCell.textContent = order.id || "N/A";
            orderIdCell.className = "tabledata";

            const statusCell = document.createElement("td");
            statusCell.textContent = order.status || "N/A";
            statusCell.className = "tabledata";

            // Assign font color based on status
            switch (order.status.toLowerCase()) {
                case "requested":
                    statusCell.style.color = "#E0A526";
                    break;
                case "accepted":
                    statusCell.style.color = "Navy";
                    break;
                case "completed":
                    statusCell.style.color = "Green";
                    break;
                case "cancelled":
                    statusCell.style.color = "red";
                    break;
                default:
                    statusCell.style.color = "black"; // Default color
            }

            const pickupDateCell = document.createElement("td");
            pickupDateCell.textContent = order.order_date || "N/A";
            pickupDateCell.className = "tabledata";

            const viewOrderCell = document.createElement("td");
            viewOrderCell.className = "tabledata";
            const viewButton = document.createElement("button");
            viewButton.textContent = "View";
            viewButton.className = "viewButton";
            viewButton.onclick = () => {
                // Define what happens when the view button is clicked
                alert(`View details for Order ID: ${order.id}`);
            };
            viewOrderCell.appendChild(viewButton);

            row.appendChild(orderIdCell);
            row.appendChild(statusCell);
            row.appendChild(pickupDateCell);
            row.appendChild(viewOrderCell);

            orderTable.appendChild(row);
        });
    }
});

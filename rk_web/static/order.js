// Fetch order details and populate the table
const userID = window.variableId;

document.addEventListener("DOMContentLoaded", () => {
    const orderTable = document.getElementById("orderDetailTable");

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

    // Function to download order details as a PDF
    async function downloadOrderDetailsAsPDF(orderId) {
        const viewApiUrl = `http://127.0.0.1:8000/api/order/details/${orderId}`;
        try {
            const response = await fetch(viewApiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Create a new jsPDF instance
            const { jsPDF } = window.jspdf;
            const pdf = new jsPDF();

            // Add Order Details to the PDF
            pdf.setFontSize(16);
            pdf.text(`Order Details for Order ID: ${data.order_id}`, 10, 10);
            pdf.setFontSize(12);
            pdf.text(`Status: ${data.status}`, 10, 20);
            pdf.text(`Pickup Date: ${data.pickup_date}`, 10, 30);

            // Add a table for the Order Items
            pdf.text(`Order Items:`, 10, 40);
            let startY = 50;
            const startX = 10;

            // Add table headers
            const headers = ["S.No.", "Breadth (in)", "Height (in)", "Length (f)", "Quantity", "Category"];
            headers.forEach((header, index) => {
                pdf.text(header, startX + index * 30, startY);
            });

            // Add table rows
            data.items.forEach((item, index) => {
                startY += 10;
                const row = [
                    `${index + 1}`,
                    `${item.breadth}`,
                    `${item.height}`,
                    `${item.length}`,
                    `${item.quantity}`,
                    `${item.category}`
                ];
                row.forEach((cell, cellIndex) => {
                    pdf.text(cell, startX + cellIndex * 30, startY);
                });
            });

            // Save the PDF
            pdf.save(`Order_${data.order_id}.pdf`);
        } catch (error) {
            console.error("Error downloading order details as PDF:", error);
            alert("Failed to download order details. Please try again.");
        }
    }

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

            // On button click, download the order details as a PDF
            viewButton.onclick = () => {
                downloadOrderDetailsAsPDF(order.id);
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

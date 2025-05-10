const welcome_heading = document.getElementById("firm_welcome")
const page_title =document.getElementById("page_title")
const feed_firm_name=document.getElementById("feed_firm_name")
const feed_phone=document.getElementById("feed_phone")
const feed_email=document.getElementById("feed_email")
const userID = window.variableId

console.log(userID)

async function getFirmData() {
    
    const url = `http://127.0.0.1:8000/api/firm/${userID}`;
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      welcome_heading.textContent=`Welcome ${data[0].firm_name}`;
      page_title.textContent=`Welcome ${data[0].firm_name}`;
      feed_firm_name.value=`${data[0].firm_name}`;
      feed_phone.value=`${data[0].phone}`;
      feed_email.value=`${data[0].email}`;
      return (data);
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
  }


  async function getDataByUsername(username) {
    const url = `http://127.0.0.1:8000/api/order/${userID}`;  // API url for the firms orders the
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
  
      // Find all objects with the specific username
      const items = data.filter(obj => obj.username === username);
  
      // Check if any items were found
      if (items.length > 0) {
        createElements(items);
      } else {
        console.log(`Items with username ${username} not found.`);
      }
    } catch (error) {
      console.error(`Fetch error: ${error.message}`);
    }
  }
  
  function createElements(items) {
    const container = document.getElementById('orders-container');
    container.innerHTML = '';  // Clear any existing content
  
    // Limit the items to the first four if there are more than four
    const limitedItems = items.slice(0, 4);
  
    limitedItems.forEach(item => {
      // Create the order box div
      const orderBoxDiv = document.createElement('div');
      orderBoxDiv.className = 'order-box';
  
      // Create and populate the order ID element
      const orderIdH3 = document.createElement('h3');
      orderIdH3.className = 'or-id';
      orderIdH3.innerHTML = `Or. Id. <br> ${String(item.id).padStart(7, '0')}`;
      orderBoxDiv.appendChild(orderIdH3);
  
      // Create and append a line div
      const lineDiv1 = document.createElement('div');
      lineDiv1.className = 'line';
      orderBoxDiv.appendChild(lineDiv1);
  
      // Create and populate the order status element
      const orderStatusH1 = document.createElement('h1');
      orderStatusH1.className = 'or-status';
      if (item.status == "Requested"){
        orderStatusH1.style.color="yellow";
      }
      else if (item.status == "Accepted"){
        orderStatusH1.style.color="cyan";
      }
      else if (item.status == "Completed"){
        orderStatusH1.style.color="#90EE90";
      }
      else if (item.status == "Cancelled"){
        orderStatusH1.style.color="red";
      }
      orderStatusH1.textContent = item.status; // Modify based on your data
      orderBoxDiv.appendChild(orderStatusH1);
  
      // Create and append another line div
      const lineDiv2 = document.createElement('div');
      lineDiv2.className = 'line';
      orderBoxDiv.appendChild(lineDiv2);
  
      // Create and populate the pickup date element
      const pickupH3 = document.createElement('h3');
      pickupH3.className = 'pickup';
      pickupH3.innerHTML = `Pickup till <br> ${item.order_date}`;
      orderBoxDiv.appendChild(pickupH3);
  
      // Append the order box div to the container
      container.appendChild(orderBoxDiv);
    });
  }
  
  // Call the function to fetch and get data by username
  
  getDataByUsername(Number(userID));  // Replace with the username you want to search for
  
  
  
const firm_info = getFirmData();

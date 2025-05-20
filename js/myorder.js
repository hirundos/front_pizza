 document.addEventListener('DOMContentLoaded', function () {
        axios.post('/api/myorder',
            { withCredentials: true })
            .then(response => {
                const orders = response.data; 
                const tbody = document.getElementById('order-table-body');
                tbody.innerHTML = ""; 
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.order_id}</td>
                        <td>${order.pizza_id}</td>
                        <td>${order.quantity}</td>
                        <td>${order.date}</td>
                        <td>${order.time}</td>
                    `;
                    tbody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching orders:', error);
            });
    });
 document.addEventListener('DOMContentLoaded', function () {

     const token = localStorage.getItem('jwt_token');

    if(!token) {
        // 토큰이 없으면 로그인 페이지로 리다이렉트
        window.location.href = 'index.html';
        return;
    }

    axios.get('/api/order/myorder/',  {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
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
        
            // 401 에러 처리
            if (error.response?.status === 401) {
                alert('로그인이 만료되었습니다. 다시 로그인해주세요.');
                localStorage.removeItem('jwt_token'); // 만료된 토큰 제거
                window.location.href = '/index.html';
            } else {
                alert('주문 내역을 불러오는 중 오류가 발생했습니다.');
            }
        });
    });
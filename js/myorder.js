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
                console.error('⚠️ [Authentication Error] Server returned 401 Unauthorized.');
                
                // 서버 응답 본문이 있다면 추가로 출력하여 분석에 활용
                if (error.response?.data) {
                    console.error('Server 401 Response Data:', error.response.data);
                }

                // 로그아웃 대신 경고창만 띄우고 디버깅을 위해 페이지는 유지
                alert('인증 오류 (401) 발생: 토큰이 유효하지 않습니다. 콘솔을 확인해주세요.');
                
            //    localStorage.removeItem('jwt_token'); 
            //    window.location.href = '/index.html';
            } else {
                alert('주문 내역을 불러오는 중 오류가 발생했습니다.');
            }
        });
    });
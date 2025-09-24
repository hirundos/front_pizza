async function logout() {
    const token = localStorage.getItem('jwt_token');
    try {
        const response = await axios.get('/api/login/logout/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.status === 200) {
            // JWT 토큰 삭제
            localStorage.removeItem('jwt_token');
            
            alert('로그아웃 되었습니다.');
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('로그아웃 실패:', error);
        alert('로그아웃 중 오류가 발생했습니다.');
    }
}
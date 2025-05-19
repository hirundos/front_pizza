async function logout() {
    try {
        const response = await axios.get('http://localhost:3000/api/logout', 
            { withCredentials: true });
        if (response.status === 200) {
            alert('로그아웃 되었습니다.');
            window.location.href = '/index.html';
        }
    } catch (error) {
        console.error('로그아웃 실패:', error);
        alert('로그아웃 중 오류가 발생했습니다.');
    }
}
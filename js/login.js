document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const id = loginForm.querySelector('#login-id').value;
        const pw = loginForm.querySelector('#login-password').value;

        console.log('로그인 요청:', { id, pw });

        try {
            const response = await axios.post('/api/login', {
                 id, pw 
                },{ withCredentials: true});
            console.log('로그인 성공:', response.data);
            window.location.href = 'home.html';
            
        } catch (error) {
            console.error('로그인 실패:', error.response ? error.response.data : error.message);
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
        }

        loginForm.reset();
    });
});

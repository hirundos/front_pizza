        document.addEventListener('DOMContentLoaded', () => {
            const signupForm = document.getElementById('signup-form');
            const errorMessage = document.getElementById('error-message');

            signupForm.addEventListener('submit', async (event) => {
                event.preventDefault();
                const id = signupForm.querySelector('#signup-id').value;
                const name = signupForm.querySelector('#signup-name').value;
                const pw = signupForm.querySelector('#signup-password').value;

                try {
                    const response = await axios.post('http://localhost:3000/api/signup', { id, name, pw });

                    console.log('회원가입 성공:', response.data);
                    window.location.href = 'index.html'

                } catch (error) {
                    console.error('회원가입 실패:', error.response ? error.response.data : error.message);
                    errorMessage.textContent = '회원가입에 실패했습니다. 다시 시도해주세요.';
                }
                signupForm.reset();
            });
        });
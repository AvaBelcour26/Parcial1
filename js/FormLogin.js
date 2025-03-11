
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const userInput = document.getElementById('inputUser');
    const passwordInput = document.getElementById('inputPassword');
    const userError = document.getElementById('userError');
    const passwordError = document.getElementById('passwordError');
    
    // Función para validar si un campo está vacío
    function validateEmpty(input, errorElement) {
        if (input.value.trim() === '') {
            errorElement.textContent = 'Este campo es obligatorio.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        } else {
            errorElement.textContent = '';
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            return true;
        }
    }
    
    function validateUser() {
        return validateEmpty(userInput, userError);
    }
    function validatePassword() {
        return validateEmpty(passwordInput, passwordError);
    }
    
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const isUserValid = validateUser();
        const isPasswordValid = validatePassword();
        
        if (isUserValid && isPasswordValid) {
            const username = userInput.value;
            const password = passwordInput.value;
            
            console.log('Usuario:', username);
            console.log('Contraseña:', password);
            
        }
    });
});
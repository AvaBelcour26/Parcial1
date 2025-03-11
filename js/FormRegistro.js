
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');

    //Inputs
    const inputName = document.getElementById('inputName');
    const inputLastName = document.getElementById('inputLastName');
    const inputEmail = document.getElementById('inputEmail');
    const inputPhone = document.getElementById('inputPhone');
    const inputEstrato = document.getElementById('inputEstrato');
    const inputFecha = document.getElementById('inputFecha');
    const grupoSanguineo = document.getElementById('grupoSanguineo');
    //Mensajes de error
    const nameError = document.getElementById('nameError');
    const lastNameError = document.getElementById('lastNameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const estratoError = document.getElementById('estratoError');
    const fechaError = document.getElementById('fechaError');
    const grupoError = document.getElementById('grupoError');
    const generoError = document.getElementById('generoError');
    const actividadesError = document.getElementById('actividadesError');
    
    // Expresiones regulares
    const nameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s]{2,50}$/;
    const lastNameRegex = /^[a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\-]{2,50}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
    const phoneRegex = /^[0-9]{10}$/; 
    
    // Función para validar un campo con regex
    function validateField(input, errorElement, regex, errorMessage) {
        if (input.value.trim() === '') {
            errorElement.textContent = 'Este campo es obligatorio.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        } else if (!regex.test(input.value)) {
            errorElement.textContent = errorMessage;
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
    
    // Función para validar un campo de fecha
    function validateDate(input, errorElement) {
        if (input.value.trim() === '') {
            errorElement.textContent = 'Este campo es obligatorio.';
            input.classList.add('is-invalid');
            input.classList.remove('is-valid');
            return false;
        } else {
            const selectedDate = new Date(input.value);
            const currentDate = new Date();
            
            if (selectedDate > currentDate) {
                errorElement.textContent = 'La fecha no puede ser futura.';
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
    }
    
    // Función para validar el select
    function validateSelect(select, errorElement) {
        if (select.selectedIndex === 0) {
            errorElement.textContent = 'Debe seleccionar una opción.';
            select.classList.add('is-invalid');
            select.classList.remove('is-valid');
            return false;
        } else {
            errorElement.textContent = '';
            select.classList.remove('is-invalid');
            select.classList.add('is-valid');
            return true;
        }
    }
    
    // Función para validar al menos una actividad seleccionada
    function validateCheckboxes() {
        const checkboxes = document.querySelectorAll('input[name="actividades"]:checked');
        
        if (checkboxes.length === 0) {
            actividadesError.textContent = 'Debe seleccionar al menos una actividad.';
            return false;
        } else {
            actividadesError.textContent = '';
            return true;
        }
    }
    
    // Eventos para validar en tiempo real
    inputName.addEventListener('input', function() {
        validateField(inputName, nameError, nameRegex, 'El nombre debe contener solo letras y espacios (2-50 caracteres).');
    });
    
    inputLastName.addEventListener('input', function() {
        validateField(inputLastName, lastNameError, nameRegex, 'El apellido debe contener solo letras y espacios (2-50 caracteres).');
    });
    
    inputEmail.addEventListener('input', function() {
        validateField(inputEmail, emailError, emailRegex, 'Ingrese un correo electrónico válido.');
    });
    
    inputPhone.addEventListener('input', function() {
        validateField(inputPhone, phoneError, phoneRegex, 'El teléfono debe contener solo números (10 dígitos).');
    });
    
    inputEstrato.addEventListener('input', function() {
        const value = parseInt(inputEstrato.value);
        if (value < 1 || value > 6 || isNaN(value)) {
            estratoError.textContent = 'El estrato debe ser un número entre 1 y 6.';
            inputEstrato.classList.add('is-invalid');
            inputEstrato.classList.remove('is-valid');
        } else {
            estratoError.textContent = '';
            inputEstrato.classList.remove('is-invalid');
            inputEstrato.classList.add('is-valid');
        }
    });
    
    inputFecha.addEventListener('change', function() {
        validateDate(inputFecha, fechaError);
    });
    
    grupoSanguineo.addEventListener('change', function() {
        validateSelect(grupoSanguineo, grupoError);
    });
    
    registroForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const isNameValid = validateField(inputName, nameError, nameRegex, 'El nombre debe contener solo letras y espacios (2-50 caracteres).');
        const isLastNameValid = validateField(inputLastName, lastNameError, nameRegex, 'El apellido debe contener solo letras y espacios (2-50 caracteres).');
        const isEmailValid = validateField(inputEmail, emailError, emailRegex, 'Ingrese un correo electrónico válido.');
        const isPhoneValid = validateField(inputPhone, phoneError, phoneRegex, 'El teléfono debe contener solo números (10 dígitos).');
        
        const isEstratoValid = (() => {
            const value = parseInt(inputEstrato.value);
            if (value < 1 || value > 6 || isNaN(value)) {
                estratoError.textContent = 'El estrato debe ser un número entre 1 y 6.';
                inputEstrato.classList.add('is-invalid');
                inputEstrato.classList.remove('is-valid');
                return false;
            } else {
                estratoError.textContent = '';
                inputEstrato.classList.remove('is-invalid');
                inputEstrato.classList.add('is-valid');
                return true;
            }
        })();
        
        const isFechaValid = validateDate(inputFecha, fechaError);
        const isGrupoValid = validateSelect(grupoSanguineo, grupoError);
        const isActividadesValid = validateCheckboxes();
        
        // Si todos los campos son validos se muestra la info en el alert
        if (isNameValid && isLastNameValid && isEmailValid && isPhoneValid && 
            isEstratoValid && isFechaValid && isGrupoValid && isActividadesValid) {
            
            const generoSeleccionado = document.querySelector('input[name="genero"]:checked').value;
            
            const actividadesSeleccionadas = Array.from(
                document.querySelectorAll('input[name="actividades"]:checked')
            ).map(checkbox => checkbox.value).join(', ');
            
            const mensaje = `Información registrada:
            Nombres: ${inputName.value}
            Apellidos: ${inputLastName.value}
            Email: ${inputEmail.value}
            Teléfono: ${inputPhone.value}
            Estrato: ${inputEstrato.value}
            Fecha de nacimiento: ${inputFecha.value}
            Grupo sanguíneo: ${grupoSanguineo.value}
            Género: ${generoSeleccionado}
            Actividades favoritas: ${actividadesSeleccionadas}`;
            
            // Muestra el mensaje en el alert
            alert(mensaje);
            
            registroForm.reset();
        }
    });
});
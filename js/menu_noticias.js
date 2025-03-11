
document.addEventListener('DOMContentLoaded', function() {
    
    const searchForm = document.querySelector('form[role="search"]');
    
    // Agrega un event listener al formulario
    searchForm.addEventListener('submit', function(event) {
        // Previene el comportamiento predeterminado del formulario (evita que se recargue la página)
        event.preventDefault();
        
        // Obtiene el valor del campo de búsqueda
        const searchInput = this.querySelector('input[type="search"]');
        const searchValue = searchInput.value;
        
        // Muestra el valor en la consola
        console.log('Término de búsqueda:', searchValue);
        
        searchInput.value = '';
    });
});
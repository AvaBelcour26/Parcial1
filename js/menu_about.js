// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos DOM
    const cardText = document.querySelector('.card-text'); // Selecciona el primer párrafo con clase card-text
    const cambiarTamanoBtn = document.getElementById('cambiarTamanoBtn');
    const cambiarColorBtn = document.getElementById('cambiarColorBtn');
    
    // Variables para mantener estado
    let tamanosLetra = ['1rem', '1.25rem', '1.5rem', '1.75rem'];
    let indiceActualTamano = 0;
    
    let coloresLetra = ['#212529', '#0d6efd', '#dc3545', '#198754']; // Negro, Azul, Rojo, Verde
    let indiceActualColor = 0;
    
    // Función para cambiar tamaño de letra
    cambiarTamanoBtn.addEventListener('click', function() {
        indiceActualTamano = (indiceActualTamano + 1) % tamanosLetra.length;
        cardText.style.fontSize = tamanosLetra[indiceActualTamano];
    });
    
    // Función para cambiar color de letra
    cambiarColorBtn.addEventListener('click', function() {
        indiceActualColor = (indiceActualColor + 1) % coloresLetra.length;
        cardText.style.color = coloresLetra[indiceActualColor];
    });
});
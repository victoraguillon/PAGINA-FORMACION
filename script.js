// Lista de santos con IDs y nombres
const santos = [
    { id: 'gHixzQm', nombre: 'Santa Faustina Kowalska' },
    { id: 'Pc9Fq2A', nombre: 'Santa Teresita de Lisieux' },
    { id: 'nDvPNaJ', nombre: 'Santa Hildegarda de Bingen' },
    { id: 'amo9dhY', nombre: 'San Maximiliano Kolbe' },
    { id: 'axaPpmP', nombre: 'San Padre Pío de Pietrelcina' },
    { id: 'VHjQQDd', nombre: 'San John Henry Newman' },
    { id: 'ne53Psr', nombre: 'San Agustín de Hipona' }
];

// Verificar si ya se reveló un santo (usando localStorage)
function yaSeRevelo() {
    return localStorage.getItem('santoRevelado') === 'true';
}

// Guardar que se reveló un santo
function guardarRevelacion(santoIndex) {
    localStorage.setItem('santoRevelado', 'true');
    localStorage.setItem('santoIndex', santoIndex.toString());
    localStorage.setItem('santoNombre', santos[santoIndex].nombre);
    localStorage.setItem('santoId', santos[santoIndex].id);
}

// Limpiar revelación (para reiniciar)
function limpiarRevelacion() {
    localStorage.removeItem('santoRevelado');
    localStorage.removeItem('santoIndex');
    localStorage.removeItem('santoNombre');
    localStorage.removeItem('santoId');
}

// Obtener un santo aleatorio que no se haya mostrado recientemente
function obtenerSantoAleatorio() {
    // Obtener último santo mostrado
    const ultimoSantoIndex = parseInt(localStorage.getItem('santoIndex') || '-1');
    
    // Si no hay último santo o solo hay uno, elegir aleatorio
    if (ultimoSantoIndex === -1 || santos.length === 1) {
        return Math.floor(Math.random() * santos.length);
    }
    
    // Intentar obtener un santo diferente al último
    let nuevoIndex;
    do {
        nuevoIndex = Math.floor(Math.random() * santos.length);
    } while (nuevoIndex === ultimoSantoIndex && santos.length > 1);
    
    return nuevoIndex;
}

// Mostrar la pantalla inicial (¿QUIÉN SERÁ?)
function mostrarPantallaInicial() {
    const contenido = document.getElementById('contenido');
    
    contenido.innerHTML = `
        <div class="quien-sera">¿QUIÉN SERÁ?</div>
        <button class="boton-revelar" id="revelarBtn">REVELAR MI SANTO</button>
        <p class="mensaje-inicial">Haz clic en el botón para descubrir quién te acompañará este año</p>
    `;
    
    // Agregar evento al botón
    document.getElementById('revelarBtn').addEventListener('click', function() {
        // Deshabilitar botón para evitar múltiples clics
        this.disabled = true;
        this.textContent = 'REVELANDO...';
        
        // Obtener santo aleatorio
        const santoIndex = obtenerSantoAleatorio();
        
        // Guardar en localStorage
        guardarRevelacion(santoIndex);
        
        // Recargar la página después de un breve delay para que se vea el cambio de texto
        setTimeout(() => {
            window.location.reload();
        }, 500);
    });
}

// Mostrar el santo revelado
function mostrarSantoRevelado() {
    const santoNombre = localStorage.getItem('santoNombre');
    const santoId = localStorage.getItem('santoId');
    
    if (!santoNombre || !santoId) {
        // Si no hay datos, mostrar pantalla inicial
        limpiarRevelacion();
        mostrarPantallaInicial();
        return;
    }
    
    const contenido = document.getElementById('contenido');
    
    contenido.innerHTML = `
        <div class="santo-revelado">
            <img class="santo-imagen" src="https://i.imgur.com/${santoId}.jpg" alt="${santoNombre}">
            <div class="santo-nombre">${santoNombre}</div>
            <button class="boton-otro" id="otroSantoBtn">REVELAR OTRO SANTO</button>
            <p class="mensaje-inicial">Tu santo patrón para este año 2026</p>
        </div>
    `;
    
    // Agregar evento al botón "Revelar otro santo"
    document.getElementById('otroSantoBtn').addEventListener('click', function() {
        this.disabled = true;
        this.textContent = 'CARGANDO...';
        
        // Limpiar localStorage y recargar
        limpiarRevelacion();
        
        setTimeout(() => {
            window.location.reload();
        }, 500);
    });
}

// Cargar la página adecuada cuando se carga el DOM
document.addEventListener('DOMContentLoaded', function() {
    // Precargar imágenes para mejor experiencia
    santos.forEach(santo => {
        const img = new Image();
        img.src = `https://i.imgur.com/${santo.id}.jpg`;
    });
    
    // Verificar si ya se reveló un santo
    if (yaSeRevelo()) {
        mostrarSantoRevelado();
    } else {
        mostrarPantallaInicial();
    }
    
    // También permitir recargar con tecla F5 o Ctrl+R
    document.addEventListener('keydown', function(e) {
        if (e.key === 'F5' || (e.ctrlKey && e.key === 'r')) {
            limpiarRevelacion();
        }
    });
});
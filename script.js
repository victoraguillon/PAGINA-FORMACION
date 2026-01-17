// Lista completa de santos con sus IDs y nombres
const santos = [
    { id: 'gHixzQm', nombre: 'Santa Faustina Kowalska' },
    { id: 'Pc9Fq2A', nombre: 'Santa Teresita de Lisieux' },
    { id: 'nDvPNaJ', nombre: 'Santa Hildegarda de Bingen' },
    { id: 'amo9dhY', nombre: 'San Maximiliano Kolbe' },
    { id: 'axaPpmP', nombre: 'San Padre Pío de Pietrelcina' },
    { id: 'VHjQQDd', nombre: 'San John Henry Newman' },
    { id: 'ne53Psr', nombre: 'San Agustín de Hipona' }
];

let santoActual = null;
let revelando = false;

// Elementos del DOM
const card = document.getElementById('card');
const santoImage = document.getElementById('santo-image');
const santoName = document.getElementById('santo-name');
const revelarBtn = document.getElementById('revelar-btn');

// Función para obtener un santo aleatorio
function obtenerSantoAleatorio() {
    return santos[Math.floor(Math.random() * santos.length)];
}

// Función principal para revelar
function revelarSanto() {
    if (revelando) return;
    
    revelando = true;
    revelarBtn.disabled = true;
    revelarBtn.textContent = 'REVELANDO...';
    
    // Obtener nuevo santo (asegurarse que no sea el mismo)
    let nuevoSanto;
    do {
        nuevoSanto = obtenerSantoAleatorio();
    } while (santoActual && nuevoSanto.id === santoActual.id);
    
    santoActual = nuevoSanto;
    
    // Precargar imagen
    const imgUrl = `https://i.imgur.com/${santoActual.id}.jpg`;
    const imagen = new Image();
    
    imagen.onload = function() {
        // Una vez cargada la imagen, proceder con la animación
        setTimeout(() => {
            // Cambiar imagen y nombre
            santoImage.src = imgUrl;
            santoImage.alt = santoActual.nombre;
            santoName.textContent = santoActual.nombre;
            
            // Revelar la tarjeta
            card.classList.add('revelado');
            
            // Restablecer botón
            setTimeout(() => {
                revelarBtn.disabled = false;
                revelarBtn.textContent = 'REVELAR OTRO SANTO';
                revelando = false;
            }, 500);
            
        }, 300);
    };
    
    imagen.onerror = function() {
        // En caso de error, mostrar mensaje
        santoName.textContent = 'Error al cargar la imagen';
        card.classList.add('revelado');
        
        setTimeout(() => {
            revelarBtn.disabled = false;
            revelarBtn.textContent = 'INTENTAR DE NUEVO';
            revelando = false;
        }, 500);
    };
    
    imagen.src = imgUrl;
}

// Función para reiniciar (ocultar tarjeta)
function reiniciarTarjeta() {
    card.classList.remove('revelado');
}

// Evento para el botón revelar
revelarBtn.addEventListener('click', function() {
    if (card.classList.contains('revelado')) {
        // Si ya está revelado, reiniciar primero
        reiniciarTarjeta();
        setTimeout(revelarSanto, 500);
    } else {
        // Si no está revelado, revelar directamente
        revelarSanto();
    }
});

// Atajo de teclado (Espacio)
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' && !revelando) {
        e.preventDefault();
        if (card.classList.contains('revelado')) {
            reiniciarTarjeta();
            setTimeout(revelarSanto, 500);
        } else {
            revelarSanto();
        }
    }
});

// Cargar un santo aleatorio al iniciar (pero sin mostrar)
window.addEventListener('DOMContentLoaded', function() {
    // Precargar todas las imágenes para mejor experiencia
    santos.forEach(santo => {
        const img = new Image();
        img.src = `https://i.imgur.com/${santo.id}.jpg`;
    });
    
    // Mostrar instrucción inicial
    console.log('✨ Santo Patrón 2026 cargado ✨');
    console.log('Presiona el botón o la tecla ESPACIO para revelar');
});
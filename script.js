// Lista de imágenes de tu álbum de Imgur
// Reemplaza estos IDs con los de tus imágenes
const imgurImageIds = [
    // Ejemplos de IDs de tu álbum https://imgur.com/a/Qdcm2ce
    // Para obtenerlos: ve a cada imagen, copia la URL
    // Ejemplo: https://i.imgur.com/ABCD123.jpg → "ABCD123"
    
    // ID de cada imagen (los últimos caracteres antes de .jpg/.png)
    'gHixzQm',  // Reemplaza con tus IDs reales
    'Pc9Fq2A',  // ¡IMPORTANTE! Necesitas estos IDs
    'nDvPNaJ',
    'amo9dhY',
    'axaPpmP',
    'VHjQQDd',
    'ne53Psr',
    // Agrega todos los IDs de tus imágenes aquí
];

// Para obtener los IDs:
// 1. Ve a cada imagen de tu álbum en Imgur
// 2. Haz clic derecho en la imagen → "Copiar dirección de la imagen"
// 3. La URL será como: https://i.imgur.com/ABC123.jpg
// 4. El ID es "ABC123" (sin la extensión)

let currentImageIndex = 0;

// Función para obtener una imagen aleatoria
function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * imgurImageIds.length);
    currentImageIndex = randomIndex;
    const imageId = imgurImageIds[randomIndex];
    
    // Construir URL de Imgur (versión directa)
    const imgUrl = `https://i.imgur.com/${imageId}.jpg`;
    
    // Mostrar imagen
    document.getElementById('random-image').src = imgUrl;
    document.getElementById('random-image').alt = `Imagen aleatoria ${randomIndex + 1}`;
    
    // Actualizar contador
    document.getElementById('counter').textContent = 
        `Imagen ${randomIndex + 1} de ${imgurImageIds.length}`;
    
    // Configurar enlace para ver original
    document.getElementById('open-original').onclick = () => {
        window.open(`https://imgur.com/${imageId}`, '_blank');
    };
}

// Evento para el botón
document.getElementById('random-btn').addEventListener('click', getRandomImage);

// Cargar una imagen aleatoria al inicio
window.addEventListener('DOMContentLoaded', getRandomImage);

// También cambiar con tecla espacio
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault();
        getRandomImage();
    }
});
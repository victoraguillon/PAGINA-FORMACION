// Array de santos patrones con [ID_IMAGEN, NOMBRE_SANTO]
const santosPatronos = [
    ['gHixzQm', 'Santa Faustina Kowalska'],
    ['Pc9Fq2A', 'Santa Teresita de Lisieux'],
    ['nDvPNaJ', 'Santa Hildegarda de Bingen'],
    ['amo9dhY', 'San Maximiliano Kolbe'],
    ['axaPpmP', 'San Padre Pío de Pietrelcina'],
    ['VHjQQDd', 'San John Henry Newman'],
    ['ne53Psr', 'San Agustín de Hipona']
    // Agrega más santos aquí en el mismo formato
];

// Variables de estado
let currentSantoIndex = 0;
let isAnimating = false;
let revelados = [];

// Elementos DOM
const card = document.getElementById('card');
const randomImage = document.getElementById('random-image');
const imageTitle = document.getElementById('image-title');
const revealBtn = document.getElementById('reveal-btn');
const openOriginalBtn = document.getElementById('open-original');
const counter = document.getElementById('counter');
const totalCount = document.getElementById('total-count');
const revealedCount = document.getElementById('revealed-count');
const particlesContainer = document.getElementById('particles');

// Inicializar contadores
totalCount.textContent = santosPatronos.length;
revealedCount.textContent = '0';

// Función para crear partículas especiales
function createParticles() {
    particlesContainer.innerHTML = '';
    const particleCount = 40;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        // Colores dorados y celestiales
        const colors = ['#FFD700', '#FFA500', '#FFFACD', '#FFE4B5', '#F0E68C', '#B8860B'];
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        // Formas diferentes (círculos y estrellas)
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.borderRadius = Math.random() > 0.7 ? '0' : '50%';
        
        // Posición aleatoria
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        
        // Animación con variaciones
        const duration = 1 + Math.random() * 1;
        particle.style.animation = `confettiGold ${duration}s ease-out forwards`;
        particle.style.animationDelay = `${Math.random() * 0.5}s`;
        
        particlesContainer.appendChild(particle);
        
        // Eliminar después de animación
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration * 1000);
    }
}

// Función para obtener santo no revelado
function getRandomSantoNoRevelado() {
    const noRevelados = santosPatronos.filter((_, index) => !revelados.includes(index));
    
    if (noRevelados.length === 0) {
        // Si todos fueron revelados, reiniciar
        revelados = [];
        return Math.floor(Math.random() * santosPatronos.length);
    }
    
    const randomIndex = Math.floor(Math.random() * noRevelados.length);
    const santoIndex = santosPatronos.findIndex(santo => 
        santo[0] === noRevelados[randomIndex][0]
    );
    
    return santoIndex;
}

// Función principal para revelar un santo
function revelarSantoPatrono() {
    if (isAnimating || santosPatronos.length === 0) return;
    
    // Prevenir múltiples clics durante animación
    isAnimating = true;
    revealBtn.disabled = true;
    revealBtn.innerHTML = '<span class="btn-icon">⏳</span><span class="btn-text">REVELANDO...</span>';
    
    // 1. Ocultar tarjeta actual
    card.classList.remove('flipped');
    counter.textContent = 'Preparando revelación...';
    
    // 2. Esperar a que se oculte
    setTimeout(() => {
        // Elegir santo aleatorio no revelado
        const santoIndex = getRandomSantoNoRevelado();
        currentSantoIndex = santoIndex;
        
        const [imageId, nombreSanto] = santosPatronos[santoIndex];
        const imgUrl = `https://i.imgur.com/${imageId}.jpg`;
        
        // 3. Cambiar imagen y título
        randomImage.src = imgUrl;
        randomImage.alt = nombreSanto;
        imageTitle.textContent = nombreSanto;
        
        // 4. Marcar como revelado si no lo estaba
        if (!revelados.includes(santoIndex)) {
            revelados.push(santoIndex);
            revealedCount.textContent = revelados.length;
        }
        
        // 5. Crear efecto de partículas
        createParticles();
        
        // 6. Mostrar la tarjeta con el santo
        setTimeout(() => {
            card.classList.add('flipped');
            
            // 7. Actualizar mensajes
            const mensajesRevelacion = [
                `¡Tu santo patrón es ${nombreSanto}!`,
                `✨ ${nombreSanto} te acompañará este año ✨`,
                `Encontrado: ${nombreSanto}`,
                `Este año bajo la protección de ${nombreSanto}`
            ];
            
            const mensaje = mensajesRevelacion[Math.floor(Math.random() * mensajesRevelacion.length)];
            counter.textContent = mensaje;
            
            // 8. Configurar enlace para ver detalles
            openOriginalBtn.onclick = () => {
                window.open(`https://imgur.com/${imageId}`, '_blank');
            };
            
            // 9. Rehabilitar botón
            setTimeout(() => {
                isAnimating = false;
                revealBtn.disabled = false;
                revealBtn.innerHTML = '<span class="btn-icon">🎴</span><span class="btn-text">REVELAR OTRO SANTO</span>';
            }, 800);
            
        }, 400);
        
    }, 600);
}

// Función para cargar un santo al inicio (sin animación)
function cargarSantoInicial() {
    if (santosPatronos.length === 0) {
        counter.textContent = 'No hay santos disponibles';
        return;
    }
    
    const santoIndex = getRandomSantoNoRevelado();
    currentSantoIndex = santoIndex;
    
    const [imageId, nombreSanto] = santosPatronos[santoIndex];
    const imgUrl = `https://i.imgur.com/${imageId}.jpg`;
    
    randomImage.src = imgUrl;
    randomImage.alt = nombreSanto;
    imageTitle.textContent = nombreSanto;
    
    // Revelar automáticamente al inicio
    if (!revelados.includes(santoIndex)) {
        revelados.push(santoIndex);
        revealedCount.textContent = revelados.length;
    }
    
    // Mostrar tarjeta ya revelada después de un momento
    setTimeout(() => {
        card.classList.add('flipped');
        counter.textContent = `Tu primer santo: ${nombreSanto}`;
        
        openOriginalBtn.onclick = () => {
            window.open(`https://imgur.com/${imageId}`, '_blank');
        };
    }, 1000);
}

// Precargar imágenes para mejor experiencia
function precargarImagenes() {
    santosPatronos.forEach(([imageId]) => {
        const img = new Image();
        img.src = `https://i.imgur.com/${imageId}.jpg`;
    });
}

// Event Listeners
document.getElementById('reveal-btn').addEventListener('click', revelarSantoPatrono);

// Atajo de teclado - Espacio
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && !isAnimating) {
        e.preventDefault();
        revelarSantoPatrono();
    }
});

// Cargar al inicio
window.addEventListener('DOMContentLoaded', () => {
    cargarSantoInicial();
    
    // Precargar imágenes después de un momento
    setTimeout(precargarImagenes, 2000);
});

// Funciones de utilidad para depuración (opcional)
console.log('🎴 Sistema de Santos Patronos cargado');
console.log(`📊 Total de santos: ${santosPatronos.length}`);
console.log('💡 Presiona ESPACIO o haz clic en el botón para revelar');
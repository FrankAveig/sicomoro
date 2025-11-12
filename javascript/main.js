// Sicomoro Spa - JavaScript Principal
// Este archivo se utilizará para funcionalidades interactivas del sitio

// Función para detectar si es móvil
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 768;
}

// Función para generar enlace de WhatsApp
function getWhatsAppLink(sectionName) {
    const phoneNumber = '593978907012'; // Ecuador: +593, número: 0978907012
    const message = encodeURIComponent(`Hola, me interesa información sobre: ${sectionName}`);
    
    if (isMobile()) {
        return `https://wa.me/${phoneNumber}?text=${message}`;
    } else {
        return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${message}`;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Sicomoro Spa - Sitio cargado correctamente');
    
    // Generar año de copyright dinámicamente
    const copyrightYear = document.getElementById('copyright-year');
    if (copyrightYear) {
        const currentYear = new Date().getFullYear();
        copyrightYear.textContent = currentYear;
    }
    
    // Convertir botones a enlaces de WhatsApp
    const whatsappButtons = document.querySelectorAll('[data-whatsapp-section]');
    whatsappButtons.forEach(button => {
        const sectionName = button.getAttribute('data-whatsapp-section');
        const whatsappLink = getWhatsAppLink(sectionName);
        
        // Crear elemento <a> si es un botón
        if (button.tagName === 'BUTTON') {
            const link = document.createElement('a');
            link.href = whatsappLink;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.className = button.className;
            link.textContent = button.textContent;
            
            // Reemplazar el botón con el enlace
            button.parentNode.replaceChild(link, button);
        } else {
            // Si ya es un enlace, actualizar href
            button.href = whatsappLink;
            button.target = '_blank';
            button.rel = 'noopener noreferrer';
        }
    });
    
    // Smooth scroll para los enlaces de navegación internos
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '' && !this.hasAttribute('data-whatsapp-section')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
});


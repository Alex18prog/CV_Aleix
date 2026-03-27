document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos del efecto hacker (Escritura automática)
    const codeEditor = document.querySelector('.code-editor');
    const cursor = document.getElementById('cursor');

    if (codeEditor) {
        const rawHTML = codeEditor.innerHTML;
        codeEditor.innerHTML = ''; 

        let charIndex = 0;
        const typingSpeed = 15; 

        function typeEffect() {
            if (rawHTML.substring(charIndex, charIndex + 1) === '<') {
                charIndex = rawHTML.indexOf('>', charIndex) + 1;
            } else {
                charIndex++;
            }

            codeEditor.innerHTML = rawHTML.substring(0, charIndex);
            if (cursor) codeEditor.appendChild(cursor);

            if (charIndex < rawHTML.length) {
                setTimeout(typeEffect, typingSpeed);
            } else {
                // --- SOLUCIÓN PARA EL ENLACE CLICABLE ---
                if (cursor) cursor.remove(); 
                
                const contenido = codeEditor.innerHTML;
                // Reemplazamos el texto por un enlace real con ID
                const nuevoHTML = contenido.replace('¡Hablemos!', '<a href="#contacto" id="enlace-hacker">¡Hablemos!</a>');
                codeEditor.innerHTML = nuevoHTML;

                const elEnlace = document.getElementById('enlace-hacker');
                if (elEnlace) {
                    elEnlace.style.cursor = 'pointer';
                    elEnlace.style.pointerEvents = 'auto';
                    elEnlace.addEventListener('click', (e) => {
                        e.preventDefault();
                        document.getElementById('contacto').scrollIntoView({ behavior: 'smooth' });
                    });
                }
            }
        }
        setTimeout(typeEffect, 1000);
    }

    // 2. Gestión de Proyectos dinámicos (Actualizado con tus proyectos reales)
    const lista = document.getElementById('lista-proyectos');
    if (lista) {
        const proyectos = [
            { 
                nombre: "Task Manager API (.NET 9)", 
                tech: [".NET 9", "EF Core", "SQL Server", "Docker"], 
                desc: "API RESTful de alto rendimiento con arquitectura Code First. Implementa persistencia en SQL Server mediante Docker, documentación interactiva con Swagger y cumplimiento total de estándares REST.",
                link: "https://github.com/Alex18prog/task-manager-api" // Pon tu link real aquí
            },
            { 
                nombre: "Portfolio Curricular Interactivo", 
                tech: ["HTML5", "CSS3", "JS Vanilla"], 
                desc: "Sitio web profesional con efectos de tipado automático, diseño responsive y optimización de UX/UI mediante animaciones nativas y Intersection Observer.",
                link: "https://github.com/tu-usuario/portfolio" // Pon tu link real aquí
            }
        ];

        proyectos.forEach(p => {
            const card = document.createElement('div');
            card.className = 'proyecto-card';
            
            const techLabels = p.tech.map(t => `<span class="tech-tag">${t}</span>`).join('');

            card.innerHTML = `
                <h3>${p.nombre}</h3>
                <p>${p.desc}</p>
                <div class="tech-container">${techLabels}</div>
                <a href="${p.link}" target="_blank" class="btn-git">Ver Código en GitHub</a>
            `;
            lista.appendChild(card);
        });
    }

    // 3. EFECTOS DE INTERACTIVIDAD (Scroll Reveal y Barras de Progreso)
    const observarInteracciones = () => {
        const opciones = {
            threshold: 0.2 
        };

        const callback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Aparecer sección
                    entry.target.classList.add('active');

                    // Llenar barras de skills
                    if (entry.target.id === 'skills') {
                        const barras = entry.target.querySelectorAll('.progress');
                        barras.forEach(barra => {
                            const anchoFinal = barra.getAttribute('data-width');
                            barra.style.width = anchoFinal;
                        });
                    }
                    observer.unobserve(entry.target);
                }
            });
        };

        const observer = new IntersectionObserver(callback, opciones);
        const secciones = document.querySelectorAll('.reveal');
        secciones.forEach(sec => observer.observe(sec));
    };

    observarInteracciones();
});
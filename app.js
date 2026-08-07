/* ==========================================================================
   INTERACTIVE JS SCRIPT - ALEIX PASCUAL PORTFOLIO
   Features: IDE Editor Tabs, CLI Terminal, Progress Meter, 
             Scroll Reveals, 1-Click Copy & simulated PDF Downloader
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. TERMINAL IDE - TAB SWITCHING
       ========================================================================== */
    const tabs = document.querySelectorAll('.ide-tab');
    const contents = document.querySelectorAll('.file-content');
    const activeTabTitle = document.getElementById('active-tab-title');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const fileName = tab.getAttribute('data-file');
            
            // Remove active class from all tabs & contents
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and its content
            tab.classList.add('active');
            const targetContent = document.getElementById(tab.id.replace('tab-', 'content-'));
            if (targetContent) {
                targetContent.classList.add('active');
            }

            // Update header title
            activeTabTitle.textContent = fileName;

            // Focus on CLI input if switching to terminal.sh
            if (fileName === 'terminal.sh') {
                setTimeout(() => {
                    document.getElementById('cli-input').focus();
                }, 50);
            }
        });
    });


    /* ==========================================================================
       2. IDE RUN BUTTON & LIVE PREVIEW ENGINE
       ========================================================================== */
    const runBtn = document.getElementById('run-code-btn');
    const livePreview = document.getElementById('live-preview-output');
    const renderArea = document.getElementById('render-area');
    const closePreviewBtn = document.getElementById('close-preview-btn');

    runBtn.addEventListener('click', () => {
        // Compile presentation HTML into a premium styled layout in preview
        renderArea.innerHTML = `
            <div class="preview-compiled-box">
                <h2>Hola, soy Aleix Pascual</h2>
                <p>
                    Mi formación como desarrollador Full Stack se combina con mi pasión por el
                    desarrollo de aplicaciones web y una mentalidad de aprendizaje
                    constante. Mi especialidad es el desarrollo de soluciones dinámicas,
                    prestando atención tanto a la lógica del backend como al detalle
                    visual en el frontend. Mi meta es agregar valor inmediato a los
                    equipos de desarrollo mediante la proactividad, la colaboración en
                    equipo y una dedicación ininterrumpida a mejorar procesos y la calidad
                    del software.
                </p>
                <a href="#contacto" id="preview-hablemos-btn">¡Hablemos!</a>
            </div>
        `;

        // Open live preview overlay
        livePreview.classList.add('open');

        // Handle inner hablemos button click
        const previewHablemos = document.getElementById('preview-hablemos-btn');
        if (previewHablemos) {
            previewHablemos.addEventListener('click', (e) => {
                e.preventDefault();
                livePreview.classList.remove('open');
                const target = document.querySelector('#contacto');
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    });

    // Close preview button
    closePreviewBtn.addEventListener('click', () => {
        livePreview.classList.remove('open');
    });

    // Close on pressing Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && livePreview.classList.contains('open')) {
            livePreview.classList.remove('open');
        }
    });


    /* ==========================================================================
       3. INTERACTIVE COMMAND LINE SHELL (CLI)
       ========================================================================== */
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');
    const cliShell = document.getElementById('cli-shell');

    // Click on shell focusing input
    if (cliShell) {
        cliShell.addEventListener('click', () => {
            cliInput.focus();
        });
    }

    if (cliInput) {
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const commandText = cliInput.value.trim();
                if (commandText !== '') {
                    processCommand(commandText);
                }
                cliInput.value = '';
            }
        });
    }

    function processCommand(rawCmd) {
        const cmd = rawCmd.toLowerCase().trim();
        
        // Print command echo first
        const echoLine = document.createElement('div');
        echoLine.className = 'shell-line';
        echoLine.innerHTML = `<span class="shell-prompt">aleix@portfolio:~$</span> <span class="shell-cmd-echo">${rawCmd}</span>`;
        cliOutput.appendChild(echoLine);

        // Process response
        const responseLine = document.createElement('div');
        responseLine.className = 'shell-response';

        switch(cmd) {
            case 'help':
                responseLine.innerHTML = `Comandos disponibles:
  <span class="shell-highlight">about</span>      - Presentación y objetivos profesionales
  <span class="shell-highlight">skills</span>     - Lista detallada de destrezas técnicas
  <span class="shell-highlight">projects</span>   - Resumen de proyectos destacados
  <span class="shell-highlight">contact</span>    - Información de contacto directa
  <span class="shell-highlight">clear</span>      - Limpiar consola`;
                break;
            case 'about':
                responseLine.innerHTML = `Full Stack Developer apasionado por el código limpio, arquitectura óptima y UI premium.
Combino solidez lógica de Backend (Java/Spring Boot, Node.js) con detalles visuales refinados en Frontend (React).`;
                break;
            case 'skills':
                responseLine.innerHTML = `Stack técnico por categoría:
  • <span class="shell-highlight">Lenguajes</span>    Java, TypeScript, Python
  • <span class="shell-highlight">Frameworks</span>   Spring Boot, React, Node.js, pandas, Streamlit
  • <span class="shell-highlight">Herramientas</span> Docker, CI/CD
  • <span class="shell-highlight">IA</span>           Gemini API (function calling)

Escribe <span class="shell-highlight">projects</span> para ver en qué proyecto se usó cada una.`;
                break;
            case 'projects':
                responseLine.innerHTML = `Proyectos Destacados:
  [1] <span class="shell-highlight">PlantPulse</span> (Full Stack)
      - CMMS con monitorización IoT en tiempo real, WebSocket, alertas y órdenes de trabajo automáticas.
  [2] <span class="shell-highlight">LineIQ</span> (Data Analysis)
      - Dashboard de análisis de eficiencia (OEE) para líneas de fabricación.
  [3] <span class="shell-highlight">TriagePilot</span> (AI Agent)
      - Agente de IA para triaje de tickets de soporte con function calling real (Google Gemini API).`;
                break;
            case 'contact':
                responseLine.innerHTML = `Canales de contacto activos:
  • <span class="shell-highlight">Email</span>: alex18prog@gmail.com
  • <span class="shell-highlight">LinkedIn</span>: https://www.linkedin.com/in/alex-pascual-ortega-7602222b7
  • <span class="shell-highlight">GitHub</span>: https://github.com/Alex18prog
  • <span class="shell-highlight">WhatsApp</span>: https://wa.me/34679847024`;
                break;
            case 'clear':
                cliOutput.innerHTML = '';
                return; // skip appending line and scrolling since it's cleared
            default:
                responseLine.innerHTML = `<span style="color: var(--accent-pink)">Comando no reconocido: '${rawCmd}'</span>. Escribe <span class="shell-highlight">help</span> para ver opciones válidas.`;
        }

        cliOutput.appendChild(responseLine);

        // Auto scroll to bottom
        setTimeout(() => {
            cliOutput.scrollTop = cliOutput.scrollHeight;
        }, 10);
    }


    /* ==========================================================================
       4. INTERSECTION OBSERVER FOR SCROLL REVEALS
       ========================================================================== */
    // Generic Scroll Reveal Animation Observer
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                
                // If it contains child reveals, stagger their entrance
                const children = entry.target.querySelectorAll('.scroll-reveal-child');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.style.opacity = '1';
                        child.style.transform = 'translateY(0)';
                    }, index * 120);
                });
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08 });

    scrollRevealElements.forEach(element => {
        revealObserver.observe(element);
    });


    /* ==========================================================================
       5. 1-CLICK EMAIL COPY TO CLIPBOARD
       ========================================================================== */
    const emailCard = document.getElementById('contact-email-card');
    const emailValue = document.getElementById('email-value').textContent;
    const emailActionText = document.getElementById('email-action-text');

    function copyEmailToClipboard() {
        navigator.clipboard.writeText(emailValue).then(() => {
            // Add copied styling class
            emailCard.classList.add('copied');
            emailActionText.textContent = '¡Correo Copiado con Éxito!';

            // Reset state after 2.5 seconds
            setTimeout(() => {
                emailCard.classList.remove('copied');
                emailActionText.textContent = 'Haga clic para copiar';
            }, 2500);
        }).catch(err => {
            console.error('Error copiando al portapapeles: ', err);
        });
    }

    if (emailCard) {
        emailCard.addEventListener('click', copyEmailToClipboard);

        // Keyboard support (Enter / Space) since the card is a non-native button
        emailCard.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyEmailToClipboard();
            }
        });
    }


    /* ==========================================================================
       6. PREMIUM SIMULATED PDF DOWNLOAD PROGRESS BAR
       ========================================================================== */
    const downloadBtn = document.getElementById('download-cv-pdf-btn');
    const downloadProgress = document.getElementById('download-progress');
    const downloadText = document.getElementById('download-btn-text');

    if (downloadBtn) {
        downloadBtn.addEventListener('click', (e) => {
            e.preventDefault(); // Stop instant navigation to demonstrate progress bar glow

            if (downloadBtn.classList.contains('downloading') || downloadBtn.classList.contains('downloaded')) {
                return;
            }

            downloadBtn.classList.add('downloading');
            downloadText.textContent = 'Preparando CV (PDF)...';
            
            let progress = 0;
            const interval = setInterval(() => {
                progress += 5;
                downloadProgress.style.width = `${progress}%`;

                if (progress >= 100) {
                    clearInterval(interval);
                    
                    // Transition to successful state
                    downloadBtn.classList.remove('downloading');
                    downloadBtn.classList.add('downloaded');
                    downloadText.textContent = '¡Descarga Iniciada!';
                    
                    // Trigger actual file download
                    const tempLink = document.createElement('a');
                    tempLink.href = 'CV_Aleix_DAW.pdf';
                    tempLink.download = 'CV_Aleix_DAW.pdf';
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);

                    // Reset button to standard state after 4 seconds
                    setTimeout(() => {
                        downloadBtn.classList.remove('downloaded');
                        downloadProgress.style.width = '0%';
                        downloadText.textContent = 'Descargar mi CV (PDF)';
                    }, 4000);
                }
            }, 60); // 60ms * 20 iterations = 1.2s total animation
        });
    }


    /* ==========================================================================
       7. AUTOMATIC NAV LINK ACTIVE STATE HIGHLIGHTING ON SCROLL
       ========================================================================== */
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('main > section');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 180; // offset top boundary

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // Make smooth scrolling clicking on nav-link or logo
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    const scrollTechBtn = document.getElementById('scroll-to-tech');
    if (scrollTechBtn) {
        scrollTechBtn.addEventListener('click', () => {
            const target = document.querySelector('#tecnologias');
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});

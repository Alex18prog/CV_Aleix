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
            const targetContent = document.getElementById(`content-${fileName.replace('.', '-')}`);
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
                    Mi formación técnica en DAW se complementa con mi pasión por el
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
                responseLine.innerHTML = `Estudiante de DAW apasionado por el código limpio, arquitectura óptima y UI premium.
Combino solidez lógica de Backend (.NET 9, SQL Server) con detalles visuales refinados en Frontend.`;
                break;
            case 'skills':
                responseLine.innerHTML = `Métricas Técnicas de Aleix Pascual:
  • <span class="shell-highlight">HTML/CSS</span> .............. 95% (Diseño Pixel-Perfect, Grids)
  • <span class="shell-highlight">JavaScript</span> ............ 85% (DOM Nativo, ES6, Async)
  • <span class="shell-highlight">.NET 9 / C#</span> ........... 90% (REST APIs, Entity Framework)
  • <span class="shell-highlight">SQL / EF Core</span> ......... 85% (Migraciones, Code First)
  • <span class="shell-highlight">Docker</span> ................ 75% (Contenedores, Compose)
  • <span class="shell-highlight">React</span> ................. 60% (Componentes Interactivos)`;
                break;
            case 'projects':
                responseLine.innerHTML = `Proyectos Destacados:
  [1] <span class="shell-highlight">Task Manager API (.NET 9)</span>
      - API RESTful, SQL Server, Docker, Swagger, Clean Architecture.
  [2] <span class="shell-highlight">Portfolio Curricular Interactivo</span>
      - Animaciones nativas, responsive, tipado dinámico y diseño UX/UI.`;
                break;
            case 'contact':
                responseLine.innerHTML = `Canales de contacto activos:
  • <span class="shell-highlight">Email</span>: alex18prog@gmail.com
  • <span class="shell-highlight">LinkedIn</span>: https://linkedin.com
  • <span class="shell-highlight">GitHub</span>: https://github.com/alex18prog
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
       4. TECHNOLOGY FILTERING & DYNAMIC PROGRESS BARS
       ========================================================================== */
    const filterButtons = document.querySelectorAll('.filter-btn');
    const techCards = document.querySelectorAll('.tech-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');

            // Set active filter button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter cards with subtle CSS scale & opacity transitions
            techCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.92)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });


    /* ==========================================================================
       5. INTERSECTION OBSERVER FOR SKILLS PROGRESS BARS & SCROLL REVEALS
       ========================================================================== */
    const progressBars = document.querySelectorAll('.progress-bar-glow');
    
    // Skill loading animation triggered when section is entered
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Trigger transition width using the custom style target variable
                progressBars.forEach(bar => {
                    const targetWidth = bar.getAttribute('style').match(/--target-width:\s*(\d+%);/)[1];
                    bar.style.width = targetWidth;
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    const techSection = document.querySelector('#tecnologias');
    if (techSection) {
        skillObserver.observe(techSection);
    }

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
       6. 1-CLICK EMAIL COPY TO CLIPBOARD
       ========================================================================== */
    const emailCard = document.getElementById('contact-email-card');
    const emailValue = document.getElementById('email-value').textContent;
    const emailActionText = document.getElementById('email-action-text');

    if (emailCard) {
        emailCard.addEventListener('click', () => {
            // Write to Clipboard
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
        });
    }


    /* ==========================================================================
       7. PREMIUM SIMULATED PDF DOWNLOAD PROGRESS BAR
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
       8. AUTOMATIC NAV LINK ACTIVE STATE HIGHLIGHTING ON SCROLL
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

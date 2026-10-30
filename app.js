/* ==========================================================================
   ALEIX PASCUAL — PORTFOLIO
   Capturas fijas con demo animada a petición, copia del email,
   navegación activa según la sección y terminal opcional.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* 1. Capturas: imagen fija por defecto, GIF solo si el visitante lo pide
       ========================================================================== */
    document.querySelectorAll('.media-toggle').forEach(toggle => {
        const img = toggle.parentElement.querySelector('img');
        const label = toggle.querySelector('.media-toggle-label');
        const motionSrc = img.dataset.motion;
        const stillSrc = img.dataset.still;

        // Precarga el GIF cuando el visitante muestra intención, no antes
        const preload = () => { new Image().src = motionSrc; };
        toggle.addEventListener('pointerenter', preload, { once: true });
        toggle.addEventListener('focus', preload, { once: true });

        toggle.addEventListener('click', () => {
            const playing = toggle.getAttribute('aria-pressed') === 'true';
            img.src = playing ? stillSrc : motionSrc;
            toggle.setAttribute('aria-pressed', String(!playing));
            label.textContent = playing ? 'Ver en movimiento' : 'Ver imagen fija';
        });
    });


    /* 2. Copiar el email
       ========================================================================== */
    const copyBtn = document.getElementById('copy-email-btn');
    const copyStatus = document.getElementById('copy-status');
    const email = document.getElementById('email-value').textContent.trim();
    let copyTimer;

    if (copyBtn && navigator.clipboard) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(email).then(() => {
                copyBtn.textContent = 'Copiado';
                copyBtn.classList.add('is-copied');
                copyStatus.textContent = 'Email copiado al portapapeles';
                clearTimeout(copyTimer);
                copyTimer = setTimeout(() => {
                    copyBtn.textContent = 'Copiar';
                    copyBtn.classList.remove('is-copied');
                    copyStatus.textContent = '';
                }, 2000);
            }).catch(() => {
                copyBtn.textContent = 'No se pudo copiar';
            });
        });
    } else if (copyBtn) {
        copyBtn.hidden = true;
    }


    /* 3. Cabecera y enlace activo según la sección visible
       ========================================================================== */
    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.nav-link');

    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    const sectionObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const id = entry.target.id;
            navLinks.forEach(link => {
                link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
            });
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    document.querySelectorAll('main > section').forEach(section => sectionObserver.observe(section));


    /* 4. Terminal opcional
       ========================================================================== */
    const cli = document.getElementById('cli');
    const cliInput = document.getElementById('cli-input');
    const cliOutput = document.getElementById('cli-output');

    const escapeHTML = text => text.replace(/[&<>"']/g, ch => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[ch]);

    const hl = text => `<span class="cli-hl">${text}</span>`;

    const commands = {
        help: () => `Comandos disponibles:
  ${hl('about')}      Presentación
  ${hl('skills')}     Stack por categoría
  ${hl('projects')}   Proyectos
  ${hl('contact')}    Contacto
  ${hl('clear')}      Limpiar la terminal`,
        about: () => `Desarrollador full stack. Backend en Java con Spring Boot,
frontend en Angular. Sistemas donde la corrección importa:
concurrencia, idempotencia, auditoría y seguridad.`,
        skills: () => `  ${hl('Lenguajes')}     Java, TypeScript, Python
  ${hl('Frameworks')}    Spring Boot, React, Node.js, pandas, Streamlit
  ${hl('Herramientas')}  Docker, CI/CD
  ${hl('IA')}            Gemini API (function calling)`,
        projects: () => `  ${hl('PlantPulse')}   CMMS con monitorización IoT en tiempo real
  ${hl('LineIQ')}       Dashboard de eficiencia OEE
  ${hl('TriagePilot')}  Agente de IA para triaje de tickets`,
        contact: () => `  ${hl('Email')}     alex18prog@gmail.com
  ${hl('LinkedIn')}  linkedin.com/in/alex-pascual-ortega-7602222b7
  ${hl('GitHub')}    github.com/Alex18prog`
    };

    function runCommand(raw) {
        const cmd = raw.toLowerCase();

        if (cmd === 'clear') {
            cliOutput.innerHTML = '';
            return;
        }

        const echo = document.createElement('div');
        echo.innerHTML = `<span class="cli-prompt">aleix@portfolio:~$</span> ${escapeHTML(raw)}`;
        cliOutput.appendChild(echo);

        const response = document.createElement('div');
        response.innerHTML = commands[cmd]
            ? commands[cmd]()
            : `<span class="cli-error">Comando no reconocido: ${escapeHTML(raw)}</span>. Escribe ${hl('help')} para ver los disponibles.`;
        cliOutput.appendChild(response);
        cliOutput.scrollTop = cliOutput.scrollHeight;
    }

    if (cli && cliInput) {
        cli.addEventListener('toggle', () => {
            if (cli.open) cliInput.focus();
        });

        cliInput.addEventListener('keydown', e => {
            if (e.key !== 'Enter') return;
            const value = cliInput.value.trim();
            if (value) runCommand(value);
            cliInput.value = '';
        });
    }
});

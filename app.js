/* ==========================================================================
   ALEIX PASCUAL — PORTFOLIO
   Capturas fijas con demo animada a petición, copia del email,
   navegación activa según la sección y terminal opcional.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Marca que el JavaScript funciona: el CSS solo muestra los controles que dependen de él
    document.documentElement.classList.add('js');


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


    /* 1b. Pestañas de proyectos (patrón ARIA tabs, activación automática)
       Sin este script los dos grupos se ven apilados; aquí se añaden los roles
       y se oculta el panel inactivo. El hash (#proyectos, #otros-stacks o el
       id de un proyecto) decide la pestaña, para poder enlazarla.
       ========================================================================== */
    const tabsRoot = document.getElementById('project-tabs');

    if (tabsRoot) {
        const tabList = tabsRoot.querySelector('.tab-list');
        const tabs = Array.from(tabList.querySelectorAll('.tab'));
        const panels = Array.from(tabsRoot.querySelectorAll('.tab-panel'));
        const section = document.getElementById('proyectos');

        tabList.setAttribute('role', 'tablist');
        tabList.setAttribute('aria-label', 'Proyectos por stack');
        tabs.forEach((tab, i) => {
            tab.setAttribute('role', 'tab');
            tab.setAttribute('aria-controls', panels[i].id);
            panels[i].setAttribute('role', 'tabpanel');
            panels[i].setAttribute('aria-labelledby', tab.id);
        });

        const select = (index, { focus = false, updateHash = false } = {}) => {
            tabs.forEach((tab, i) => {
                const selected = i === index;
                tab.setAttribute('aria-selected', String(selected));
                tab.tabIndex = selected ? 0 : -1;
                panels[i].hidden = !selected;
            });
            if (focus) tabs[index].focus();
            if (updateHash) history.replaceState(null, '', `#${tabs[index].dataset.hash}`);
        };

        tabs.forEach((tab, i) => {
            tab.addEventListener('click', () => select(i, { updateHash: true }));
        });

        tabList.addEventListener('keydown', e => {
            const current = tabs.indexOf(document.activeElement);
            if (current < 0) return;
            const last = tabs.length - 1;
            const next = {
                ArrowRight: current === last ? 0 : current + 1,
                ArrowLeft: current === 0 ? last : current - 1,
                Home: 0,
                End: last
            }[e.key];
            if (next === undefined) return;
            e.preventDefault();
            select(next, { focus: true, updateHash: true });
        });

        // Elige la pestaña que contiene el destino del hash y lleva la vista hasta él
        const followHash = () => {
            const id = decodeURIComponent(location.hash.slice(1));
            const target = id && document.getElementById(id);
            if (!target) return false;
            if (target === section) {
                select(0);
                return true;
            }
            const index = panels.findIndex(panel => panel.contains(target));
            if (index < 0) return false;
            select(index);
            (target === panels[index] ? section : target).scrollIntoView();
            return true;
        };

        tabsRoot.classList.add('is-enhanced');
        tabList.hidden = false;
        if (!followHash()) select(0);
        window.addEventListener('hashchange', followHash);
    }


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
        projects: () => `Java · Spring Boot · Angular
  ${hl('Ledgerly')}     Núcleo bancario con libro mayor de doble entrada
  ${hl('CapaLoop')}     QMS con el flujo de ISO 9001 (No Conformidades y CAPA)
  ${hl('PlantPulse')}   CMMS con monitorización IoT en tiempo real (React)
Otros stacks
  ${hl('TriagePilot')}  Agente de IA para triaje de tickets
  ${hl('SagaFlow')}     Saga distribuida con .NET y RabbitMQ
  ${hl('LineIQ')}       Dashboard de eficiencia OEE
  ${hl('Plan Nutricional')}  Proyecto final de DAW (C#/.NET)`,
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

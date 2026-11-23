document.addEventListener('DOMContentLoaded', () => {

    // 1. Dados dos cards (Areninha agora usa a imagem local da sua pasta!)
    const sportsData = [
        { id: 1, title: 'Areninha Campo do América', category: 'Equipamento Público', description: 'Campo de futebol society e equipamentos de ginástica.', image: 'imagens/areninha-500.jpg' },
        { id: 2, title: 'Voleibol de Praia', category: 'Modalidade', description: 'Aulas e treinos na orla da Beira-Mar.', image: 'https://images.unsplash.com/photo-1634501087922-c01c76ed66d6?q=80&w=687&auto=format&fit=crop' },
        { id: 3, title: 'Jogos Escolares 2025', category: 'Evento', description: 'Competição anual entre escolas da rede municipal.', image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?w=500' },
        { id: 4, title: 'Centro de Formação Olímpica', category: 'Equipamento Público', description: 'Complexo para atletas de alto rendimento e grandes eventos.', image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=500' },
        { id: 5, title: 'Futebol de Campo', category: 'Modalidade', description: 'Escolinhas e campeonatos em diversos bairros da cidade.', image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=500' },
        { id: 6, title: 'Basquete Comunitário', category: 'Modalidade', description: 'Programa de basquete para jovens e adultos.', image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=500' },
        { id: 7, title: 'Ginásio Poliesportivo Central', category: 'Equipamento Público', description: 'Espaço multiuso para diversas modalidades esportivas.', image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=500' },
        { id: 8, title: 'Corrida de Rua Fortaleza', category: 'Evento', description: 'Evento anual que reúne milhares de corredores.', image: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?q=80&w=600&auto=format&fit=crop' },
        { id: 9, title: 'Skate Park Beira-Mar', category: 'Equipamento Público', description: 'Pista pública na orla para prática de skate e patins.', image: 'https://images.adsttc.com/media/images/6321/5925/34b7/7601/6e91/d31d/newsletter/skatepark-av-beira-mar-henry-teixeira-arquitetura-e-urbanismo_15.jpg?1663129923' },
    ];

    const cardGrid = document.querySelector('.card-grid');

    // 2. Renderizar os cards
    function displayCards(filter = 'all') {
        if (!cardGrid) return;
        const filteredData = filter === 'all' ? sportsData : sportsData.filter(item => item.category === filter);
        
        cardGrid.innerHTML = filteredData.map((item, index) => `
            <div class="info-card" style="animation-delay: ${index * 0.1}s">
                <div class="card-image-container" style="background-image: url('${item.image}');">
                    <span class="card-category">${item.category}</span>
                </div>
                <div class="card-content">
                    <h4>${item.title}</h4>
                    <p>${item.description}</p>
                    <button class="card-button" onclick="showDetails(${item.id})">Ver Detalhes</button>
                </div>
            </div>
        `).join('');
    }

    // 3. Filtros de Destaques Esportivos
    function setupFilters() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                displayCards(button.getAttribute('data-filter'));
            });
        });
    }

    // 4. Animação de Estatísticas
    function animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalNumber = target.textContent;
                    const numericValue = parseInt(finalNumber.replace(/\D/g, ''));
                    let current = 0;
                    const increment = numericValue / 50;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= numericValue) {
                            target.textContent = finalNumber;
                            clearInterval(timer);
                        } else {
                            const suffix = finalNumber.includes('+') ? '+' : '';
                            const prefix = finalNumber.includes('k') ? 'k' : '';
                            target.textContent = Math.floor(current) + prefix + suffix;
                        }
                    }, 30);
                }
            });
        });
        statNumbers.forEach(stat => observer.observe(stat));
    }

    // 5. Formulário de Contato
    function setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        if (!contactForm) return;
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const button = contactForm.querySelector('button');
            const originalText = button.textContent;
            button.textContent = 'Enviando...';
            button.disabled = true;
            setTimeout(() => {
                button.textContent = 'Mensagem Enviada! ✓';
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1200);
        });
    }

    // 6. Filtros do Mapa
    function setupMapFilters() {
        const mapFilterButtons = document.querySelectorAll('.map-filter-btn');
        const locationCards = document.querySelectorAll('.location-card');
        mapFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                mapFilterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                const filterType = button.getAttribute('data-type');
                locationCards.forEach(card => {
                    card.style.display = (filterType === 'todos' || card.getAttribute('data-type') === filterType) ? 'flex' : 'none';
                });
            });
        });
    }

    displayCards();
    setupFilters();
    animateStats();
    setupContactForm();
    setupMapFilters();
    loadTheme();
});

// Alterna apenas entre Modo Normal (☀️) e Modo Escuro (🌙)
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        if (themeBtn) themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        if (themeBtn) themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'default');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');

    body.classList.remove('dark-mode');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeBtn) themeBtn.textContent = '☀️';
    } else {
        if (themeBtn) themeBtn.textContent = '🌙';
    }
}

function showDetails(id) {
    alert(`Detalhes do item ${id} - Em breve, esta funcionalidade abrirá uma página completa com informações detalhadas!`);
}
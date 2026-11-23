// Dados dos eventos
const eventos = [
    {
        id: 1,
        titulo: "LOREM IPSUM",
        data: "01 de Janeiro, 0000 - 00:00",
        local: "ROMA",
        descricao: "Lorem ipsum dolor sit.",
        categoria: "Workshop",
        preco: "Gratuito",
        vagas: 50,
        imagem: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?=500'
    },
    {
        id: 2,
        titulo: "Campeonato de futebol",
        data: "17 de Outubro, 2025 - 18:00",
        local: "Areninha Campo do América",
        descricao: "Bora participar dessa competição",
        categoria: "Competição",
        preco: "R$ 10,00",
        vagas: 60,
        imagem: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?=500'
    },
    {
        id: 3,
        titulo: "LOREM IPSUM",
        data: "01 de Janeiro, 0000 - 00:00",
        local: "BELÉM",
        descricao: "Lorem ipsum dolor sit.",
        categoria: "Networking",
        preco: "R$ 50,00",
        vagas: 80,
        imagem: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?=500'
    },
    {
        id: 4,
        titulo: "LOREM IPSUM",
        data: "01 de Janeiro, 0000 - 00:00",
        local: "ROMA",
        descricao: "Lorem ipsum dolor sit.",
        categoria: "Curso",
        preco: "R$ 150,00",
        vagas: 30,
        imagem: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?=500'
    },
    {
        id: 5,
        titulo: "Jogo de basquete",
        data: "12 de Outubro, 2025 - 09:00",
        local: "Quadras do Ginásio Paulo Sarasate",
        descricao: "Joguinho de final de semana",
        categoria: "Competição",
        preco: "Gratuito",
        vagas: 20,
        imagem: 'https://images.unsplash.com/photo-1590333748338-d629e4564ad9?q=80&w=1849&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?=500'
    },
];

let eventosFiltrados = [...eventos];

// Renderizar eventos
function renderizarEventos(eventosParaRenderizar = eventosFiltrados) {
    const grid = document.querySelector('.eventos-grid');
    
    grid.innerHTML = eventosParaRenderizar.map((evento, index) => `
        <div class="evento-card" style="animation-delay: ${index * 0.1}s">
            <div class="evento-header">
                <h3 class="evento-titulo">${evento.titulo}</h3>
                <span class="evento-categoria">${evento.categoria}</span>
            </div>
            <div class="evento-data">📅 ${evento.data}</div>
            <div class="evento-local">📍 ${evento.local}</div>
            <p class="evento-descricao">${evento.descricao}</p>
            <div class="evento-footer">
                <span class="evento-preco">${evento.preco}</span>
                <button class="btn-inscrever" onclick="inscreverEvento(${evento.id})">
                    Inscrever-se
                </button>
            </div>
        </div>
    `).join('');
}

// Filtrar eventos
function filtrarEventos(categoria, botaoClicado) {
    const botoes = document.querySelectorAll('.filter-btn');
    botoes.forEach(btn => btn.classList.remove('active'));
    if (botaoClicado) botaoClicado.classList.add('active');
    
    if (categoria === 'todos') {
        eventosFiltrados = [...eventos];
    } else {
        eventosFiltrados = eventos.filter(evento => 
            evento.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }
    
    renderizarEventos();
}

// Inscrever em evento
function inscreverEvento(eventoId) {
    const evento = eventos.find(e => e.id === eventoId);
    if (evento) {
        alert(`Inscrição realizada com sucesso no evento: ${evento.titulo}!`);
    }
}

// Voltar para página principal
function voltarPagina() {
    window.location.href = 'index.html';
}

// Inicializar página
document.addEventListener('DOMContentLoaded', function() {
    renderizarEventos();
    
    // Adicionar event listeners aos botões de filtro
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const categoria = this.dataset.filter;
            filtrarEventos(categoria, this);
        });
    });
});
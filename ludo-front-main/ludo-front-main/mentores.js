function filtrarMentores(modalidadeSelecionada, botaoClicado) {
    // Atualiza o visual do botão ativo
    const botoes = document.querySelectorAll('.btn-filtro');
    botoes.forEach(btn => btn.classList.remove('ativo'));
    botaoClicado.classList.add('ativo');

    // Mostra ou esconde os cards conforme a modalidade
    const cards = document.querySelectorAll('.card-mentor');
    cards.forEach(card => {
        const modalidadeCard = card.getAttribute('data-modalidade');
        if (modalidadeSelecionada === 'todos' || modalidadeCard === modalidadeSelecionada) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}

function contratarMentor(nomeProfissional, modalidade) {
    // Você pode redirecionar para o WhatsApp ou abrir um modal de agendamento
    const mensagem = encodeURIComponent(`Olá, ${nomeProfissional}! Vi seu perfil na plataforma e gostaria de contratar uma mentoria na modalidade ${modalidade}.`);
    window.open(`https://wa.me/5585999999999?text=${mensagem}`, '_blank');
}
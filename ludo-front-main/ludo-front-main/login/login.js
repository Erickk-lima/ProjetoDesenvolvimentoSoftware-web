// Carrega o tema escuro caso o usuário tenha ativado na página inicial
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// Formata o CPF automaticamente enquanto o usuário digita
function mascaraCPF(input) {
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    input.value = valor;
}

function showMessage(message, type) {
    const existingMessage = document.querySelector('.success-message, .error-message');
    if (existingMessage) existingMessage.remove();
    
    const messageDiv = document.createElement('div');
    messageDiv.className = type + '-message';
    messageDiv.textContent = message;
    
    const form = document.querySelector('.auth-form');
    form.insertBefore(messageDiv, form.firstChild);
}

function handleLogin(event) {
    event.preventDefault();
    const emailInput = document.getElementById('loginEmail').value.trim().toLowerCase();
    const cpfInput = document.getElementById('loginCpf').value.replace(/\D/g, ''); // Pega só os números
    const submitBtn = event.target.querySelector('button[type="submit"]');
    
    if (emailInput && cpfInput) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Compara e-mail e CPF (ignorando pontos e traços para evitar erros)
        const user = users.find(u => 
            u.email.trim().toLowerCase() === emailInput && 
            u.cpf.replace(/\D/g, '') === cpfInput
        );
        
        if (user) {
            submitBtn.disabled = true;
            submitBtn.textContent = 'Entrando...';
            showMessage(`Bem-vindo(a), ${user.nome || 'Atleta'}! Redirecionando...`, 'success');
            
            setTimeout(() => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = '../index.html';
            }, 1200);
        } else {
            showMessage('E-mail ou CPF incorretos! Verifique seus dados ou cadastre-se.', 'error');
        }
    }
}
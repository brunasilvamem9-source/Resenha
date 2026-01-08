// --- CÓDIGO GERAL DO SITE PAMELA ---js ---

// Roda quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
    // --- 1. MEMÓRIA DO TEMA (Roda ao abrir qualquer página) ---
    const temaSalvo = localStorage.getItem('temaPreferido');
    if (temaSalvo === 'escuro') {
        document.body.classList.add('dark-mode');
    }

    // --- 2. CONFIGURAÇÃO DAS MÁSCARAS (Só roda se o formulário existir na página) ---
    configurarMascaras();
});

// --- FUNÇÃO DO MENU SANDUÍCHE (Responsivo) ---
function toggleMenu() {
    const menu = document.getElementById("navLinks");
    // Alterna a classe 'active' que faz o menu aparecer no CSS
    menu.classList.toggle("active");
}

// --- FUNÇÃO DO MODO NOTURNO ---
function ativarModoMagia() {
    const corpo = document.body;
    
    // Alterna a classe 'dark-mode' no <body>
    corpo.classList.toggle('dark-mode');

    // Salva a escolha do usuário no navegador
    if (corpo.classList.contains('dark-mode')) {
        localStorage.setItem('temaPreferido', 'escuro');
        alert("✨ Modo Mágico Ativado! ✨");
    } else {
        localStorage.setItem('temaPreferido', 'claro');
        alert("A magia se dissipou...");
    }
}

// --- MÁSCARAS DE INPUT (Formatação visual enquanto digita) ---
function configurarMascaras() {
    const inputTelefone = document.getElementById('telefone');
    const inputCPF = document.getElementById('cpf');

    // Máscara Telefone: (00) 00000-0000
    if (inputTelefone) {
        inputTelefone.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,2})(\d{0,5})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
        });
    }

    // Máscara CPF: 000.000.000-00
    if (inputCPF) {
        inputCPF.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, "");
            if (value.length > 11) value = value.slice(0, 11); // Limita ao tamanho do CPF
            
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d)/, "$1.$2");
            value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
            
            e.target.value = value;
        });
    }
}

// --- VALIDAÇÃO DE FORMULÁRIO (No clique do botão) ---
function validarFormulario() {
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const cpfInput = document.getElementById('cpf');
    const erroCpf = document.getElementById('cpfError'); // Span para mensagem de erro
    
    // Limpa apenas os números do CPF para validação matemática
    const cpfLimpo = cpfInput.value.replace(/\D/g, ''); 

    // 1. Verifica campos vazios
    if (nome === "" || email === "" || telefone === "") {
        alert("Por favor, preencha todos os campos obrigatórios, viajante!");
        return;
    }

    // 2. Validação Matemática do CPF
    if (!validarCPFMatematico(cpfLimpo)) {
        erroCpf.textContent = "⚠ CPF Inválido! O oráculo rejeitou este código.";
        cpfInput.style.border = "2px solid red";
        alert("Verifique o campo CPF.");
        return;
    } else {
        // Se deu certo
        erroCpf.textContent = "";
        cpfInput.style.border = "1px solid #ccc"; // Volta ao normal ou verde
    }

    // Se passou por tudo:
    alert("✨ Inscrição enviada para a Guilda com sucesso!");
    document.getElementById('guildaForm').submit(); 
}

// --- ALGORITMO DE VALIDAÇÃO DE CPF (Cálculo dos dígitos) ---
function validarCPFMatematico(cpf) {
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
    let soma = 0, resto;
    
    // Valida 1º dígito
    for (let i = 1; i <= 9; i++) 
        soma += parseInt(cpf.substring(i-1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;
    
    // Valida 2º dígito
    soma = 0;
    for (let i = 1; i <= 10; i++) 
        soma += parseInt(cpf.substring(i-1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if ((resto === 10) || (resto === 11)) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;
    
    return true;
}
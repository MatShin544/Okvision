document.addEventListener('DOMContentLoaded', () => {
    const targetBtns = document.querySelectorAll('.target-btn');
    const selectionScreen = document.getElementById('selection-screen');
    const queryScreen = document.getElementById('query-screen');
    const backBtn = document.getElementById('back-btn');
    const typeHidden = document.getElementById('type-hidden');
    const modoTexto = document.getElementById('modo-texto');
    const extraFields = document.getElementById('extra-name-fields');
    const ageInput = document.getElementById('age');
    const queryInput = document.getElementById('query');

    targetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const type = btn.getAttribute('data-type');
            typeHidden.value = type;
            modoTexto.innerText = type.toUpperCase();
            
            // Logica para Nome
            if (type === 'Nome') {
                extraFields.style.display = 'block';
                ageInput.setAttribute('required', 'required');
                queryInput.placeholder = "Nome Completo (ex: Jon Doe)";
            } else {
                extraFields.style.display = 'none';
                ageInput.removeAttribute('required');
                if(type === 'Instagram') queryInput.placeholder = "@usuario";
                else if(type === 'Email') queryInput.placeholder = "exemplo@email.com";
                else queryInput.placeholder = "Insira o alvo...";
            }
            
            selectionScreen.style.display = 'none';
            queryScreen.style.display = 'block';
            queryInput.focus();
        });
    });

    backBtn.addEventListener('click', () => {
        selectionScreen.style.display = 'block';
        queryScreen.style.display = 'none';
        typeHidden.value = '';
        queryInput.value = '';
    });

    const form = document.getElementById('search-form');
    const progressContainer = document.getElementById('progress-container');
    const submitBtn = document.getElementById('submit-btn');
    const statusText = document.getElementById('status-text');
    const progressBar = document.querySelector('.progress-bar');
    
    // Frases estilo Hacker / Progressão do roteiro
    const phrases = [
        "Iniciando OKvision...",
        "Quebrando barreiras de proteção firewalls...",
        "Analisando requisições com instaloader e sherlock...",
        "Rastreando cruzamento de pegadas IP...",
        "Consultando base de dados OSINT global...",
        "Recuperando registros fragmentados via API...",
        "Cruzando informações diretas com repositórios...",
        "Quase lá, não pisque...",
        "Sincronização OK! Renderizando achados...",
        "Dados encontrados!"
    ];

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.5';
        submitBtn.innerText = "> PROCESSANDO PROTOCOLO...";
        progressContainer.style.display = 'block';
        
        let progress = 0;
        let phraseIndex = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 5 + 2;
            if (progress >= 100) progress = 100;
            
            progressBar.style.width = progress + '%';
            
            let expectedIndex = Math.floor((progress / 100) * phrases.length);
            if (expectedIndex >= phrases.length) expectedIndex = phrases.length - 1;
            
            if (expectedIndex !== phraseIndex) {
                phraseIndex = expectedIndex;
                statusText.innerText = "> " + phrases[phraseIndex];
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    form.submit();
                }, 500);
            }
        }, 300);
    });
});

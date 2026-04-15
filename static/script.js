document.addEventListener('DOMContentLoaded', () => {
    const typeSelect = document.getElementById('type');
    const extraFields = document.getElementById('extra-name-fields');
    const ageInput = document.getElementById('age');
    
    // Mostra as perguntas extras de Acordo com a Seleção (Nome e Idade)
    typeSelect.addEventListener('change', (e) => {
        if(e.target.value === 'Nome') {
            extraFields.style.display = 'block';
            ageInput.setAttribute('required', 'required');
        } else {
            extraFields.style.display = 'none';
            ageInput.removeAttribute('required');
        }
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

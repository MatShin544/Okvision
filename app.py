from flask import Flask, render_template, request
import time
import requests

app = Flask(__name__)

# Função de simulação do OSINT (Como solicitado no roteiro, deixamos preparados com requests falsos que levam tempo para permitir o frontend agir)
def run_osint_simulation(target_type, query, extra_data=None):
    time.sleep(2)
    
    results = {
        "target": query,
        "type": target_type,
        "data_found": []
    }
    
    if target_type == "Nome":
        results["data_found"].extend([
            {"source": "Sherlock", "info": f"Múltiplos rastros sociais encontrados para '{query}'."},
            {"source": "Processos", "info": "2 ocorrências encontradas (TJSP)."},
            {"source": "Cruzamento Privado", "info": f"Base de idade: {extra_data.get('age', 'N/A')} // Relação Familiar: {extra_data.get('family', 'N/A')}"},
            {"source": "Google Dorks", "info": f"site:linkedin.com '{query}' '{extra_data.get('workplace', '')}' -> 1 possivel perfil encontrado."}
        ])
    elif target_type == "Instagram":
        results["data_found"].extend([
            {"source": "Osintgram", "info": f"Coletando ID de Instagram e telefone parcial para '{query}'."},
            {"source": "Possíveis e-mails", "info": f"{query[:3]}...@email.com"},
            {"source": "Conexões Instagram", "info": f"@{query}_oficial, @{query}.dev"}
        ])
    else:
        results["data_found"].extend([
            {"source": "SpiderFoot", "info": f"Buscando vazamentos de dados públicos para '{query}'..."},
            {"source": "Vazamentos", "info": "0 ocorrências críticas recentes."}
        ])
        
    return results

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        target_type = request.form.get('type')
        query = request.form.get('query')
        
        extra_data = {
            "age": request.form.get('age'),
            "family": request.form.get('family'),
            "workplace": request.form.get('workplace')
        }
        
        results = run_osint_simulation(target_type, query, extra_data)
        
        return render_template('results.html', data=results)
        
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)

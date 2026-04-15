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
            {"source": "Sherlock", "info": "Múltiplos rastros sociais encontrados sob esse perfil."},
            {"source": "Google Dorks", "info": f"Foram coletados documentos indexados no cache da web que batem com '{query}'."},
            {"source": "Cruzamento de Dados Privados", "info": f"Base de idade: {extra_data.get('age', 'N/A')} // Relação Familiar: {extra_data.get('family', 'N/A')}"}
        ])
    elif target_type == "Instagram":
        results["data_found"].extend([
            {"source": "Instaloader Tracker", "info": f"Metadados ID do Instagram '{query}' identificados na rede. Aguardando a verificação manual ou de proxy."},
            {"source": "Analise de Bio", "info": "Análises relógicas completadas."}
        ])
    else:
        results["data_found"].append({"source": "Geral OSINT Web", "info": "Consultas variadas executadas, não foram encontrados laços públicos abertos."})
        
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

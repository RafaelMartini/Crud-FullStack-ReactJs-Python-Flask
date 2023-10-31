# Reactive python MySQL

# Backend

## Install mandatory packages

```bash
  pip install -r requirements.txt
```

```bash
  python app.py
```

## Endpoints

# Rota para criar uma nova pessoa

@app.route('/pessoas', methods=['POST'])

```bash
curl -X POST http://127.0.0.1:5000/pessoas  -H "Content-Type: application/json"  -d "{\"id\": 1,\"nome\": \"Rafael Martini\",\"rg\":\"156587598\",\"cpf\":\"25688784859\",\"dataNascimento\":\"02/04/1996\",\"dataAdmissao\":\"01/11/2023\"}"

```

# Rota para listar todas as pessoas

@app.route('/pessoas', methods=['GET'])

```bash
curl -X GET http://127.0.0.1:5000/pessoas
```

# Rota para obter os detalhes de uma pessoa específica

@app.route('/pessoas/<int:id>', methods=['GET'])

```bash
curl -X GET http://127.0.0.1:5000/pessoas/1
```

# Rota para atualizar os dados de uma pessoa

@app.route('/pessoas/<int:id>', methods=['PUT'])

```bash
curl -X PUT http://127.0.0.1:5000/pessoas/1  -H "Content-Type: application/json"  -d "{\"nome\": \"Rafael Martini Brandao\"}"
```

# Rota para excluir uma pessoa

@app.route('/pessoas/<int:id>', methods=['DELETE'])

```bash
curl -X DELETE http://127.0.0.1:5000/pessoas/1
```

# Frontend

```bash
npm install
```

## Development

```bash
npm start
```

## Endpoints

```
  http://localhost:3000/
```

![Exemplo de Imagem](https://github.com/RafaelMartini/Crud-FullStack-ReactJs-Python-Flask/blob/main/frontend.png?raw=true)

# app.py
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import DATABASE_URI  # Importando a configuração do banco de dados

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

# Configurar CORS para permitir solicitações de origens diferentes
CORS(app)

db = SQLAlchemy(app)

class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100))
    rg = db.Column(db.String(20))
    cpf = db.Column(db.String(20))
    dataNascimento = db.Column(db.String(10))
    dataAdmissao = db.Column(db.String(10))

    def serialize(self):
        return {
            'id': self.id,
            'nome': self.nome,
            'rg': self.rg,
            'cpf': self.cpf,
            'dataNascimento': self.dataNascimento,
            'dataAdmissao': self.dataAdmissao,
        }

# Rotas e operações CRUD

# Rota para criar uma nova pessoa
@app.route('/pessoas', methods=['POST'])
def create_person():
    data = request.get_json()
    new_person = Person(**data)
    db.session.add(new_person)
    db.session.commit()
    return jsonify({'message': 'Pessoa criada com sucesso'}), 201

# Rota para listar todas as pessoas
@app.route('/pessoas', methods=['GET'])
def get_all_people():
    people = Person.query.all()
    return jsonify([person.serialize() for person in people])

# Rota para obter os detalhes de uma pessoa específica
@app.route('/pessoas/<int:id>', methods=['GET'])
def get_person(id):
    person = Person.query.get(id)
    if person:
        return jsonify(person.serialize())
    return jsonify({'message': 'Pessoa não encontrada'}), 404

# Rota para atualizar os dados de uma pessoa
@app.route('/pessoas/<int:id>', methods=['PUT'])
def update_person(id):
    person = Person.query.get(id)
    if person:
        data = request.get_json()
        for key, value in data.items():
            setattr(person, key, value)
        db.session.commit()
        return jsonify({'message': 'Dados da pessoa atualizados com sucesso'})
    return jsonify({'message': 'Pessoa não encontrada'}), 404

# Rota para excluir uma pessoa
@app.route('/pessoas/<int:id>', methods=['DELETE'])
def delete_person(id):
    person = Person.query.get(id)
    if person:
        db.session.delete(person)
        db.session.commit()
        return jsonify({'message': 'Pessoa excluída com sucesso'})
    return jsonify({'message': 'Pessoa não encontrada'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)

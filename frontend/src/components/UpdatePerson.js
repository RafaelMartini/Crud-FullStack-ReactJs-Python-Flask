// UpdatePerson.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const UpdatePerson = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [person, setPerson] = useState(null);

  useEffect(() => {
    // Faça uma solicitação à API para obter os detalhes da pessoa com o ID fornecido
    axios
      .get(`http://localhost:5000/pessoas/${id}`)
      .then((response) => {
        setPerson(response.data);
        setFormData({
          nome: response.data.nome,
          rg: response.data.rg,
          cpf: response.data.cpf,
          dataNascimento: response.data.dataNascimento,
          dataAdmissao: response.data.dataAdmissao,
        });
      })
      .catch((error) => {
        console.error("Erro ao obter detalhes da pessoa:", error);
      });
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    // Faça uma solicitação à API para atualizar os dados da pessoa
    axios
      .put(`http://localhost:5000/pessoas/${id}`, formData)
      .then(() => {
        console.log("Dados da pessoa atualizados com sucesso");
        // Redirecione para a página de detalhes da pessoa após a atualização
      })
      .catch((error) => {
        console.error("Erro ao atualizar os dados da pessoa:", error);
      });
  };

  return (
    <div>
      {person ? (
        <div>
          <h1>Atualizar Dados da Pessoa</h1>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>RG:</label>
            <input
              type="text"
              name="rg"
              value={formData.rg}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>CPF:</label>
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Data de Nascimento:</label>
            <input
              type="text"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleFormChange}
            />
          </div>
          <div>
            <label>Data de Admissão:</label>
            <input
              type="text"
              name="dataAdmissao"
              value={formData.dataAdmissao}
              onChange={handleFormChange}
            />
          </div>
          <button onClick={handleUpdate}>Salvar Alterações</button>
          <Link to={`/person/${id}`}>Cancelar</Link>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UpdatePerson;

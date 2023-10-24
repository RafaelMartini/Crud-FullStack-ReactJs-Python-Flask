import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const UpdatePerson = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({});
  const [person, setPerson] = useState(null);

  useEffect(() => {
    // Faça uma solicitação à API para obter os detalhes da pessoa com o ID fornecido
    // Atualize o estado "person" com os dados da API
    // Preencha o estado "formData" com os dados do "person"
  }, [id]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = () => {
    // Faça uma solicitação à API para atualizar os dados da pessoa com o ID fornecido
    // Redirecione para a página "SelectedPerson" após a atualização
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
          <Link to={`/selected/${id}`}>Cancelar</Link>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default UpdatePerson;

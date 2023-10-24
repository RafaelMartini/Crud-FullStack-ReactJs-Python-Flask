import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddPerson = () => {
  const [formData, setFormData] = useState({});

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleAdd = () => {
    // Faça uma solicitação à API para adicionar uma nova pessoa
    // Redirecione para a página "Index" após a adição
  };

  return (
    <div>
      <h1>Adicionar Nova Pessoa</h1>
      <div>
        <label>Nome:</label>
        <input type="text" name="nome" onChange={handleFormChange} />
      </div>
      <div>
        <label>RG:</label>
        <input type="text" name="rg" onChange={handleFormChange} />
      </div>
      <div>
        <label>CPF:</label>
        <input type="text" name="cpf" onChange={handleFormChange} />
      </div>
      <div>
        <label>Data de Nascimento:</label>
        <input type="text" name="dataNascimento" onChange={handleFormChange} />
      </div>
      <div>
        <label>Data de Admissão:</label>
        <input type="text" name="dataAdmissao" onChange={handleFormChange} />
      </div>
      <button onClick={handleAdd}>Adicionar</button>
      <Link to="/">Cancelar</Link>
    </div>
  );
};

export default AddPerson;

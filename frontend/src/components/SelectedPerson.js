// SelectedPerson.js
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

const SelectedPerson = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    // Faça uma solicitação à API para obter os detalhes da pessoa com o ID fornecido
    axios
      .get(`http://localhost:5000/pessoas/<int:id>/${id}`)
      .then((response) => {
        setPerson(response.data);
      })
      .catch((error) => {
        console.error("Erro ao obter detalhes da pessoa:", error);
      });
  }, [id]);

  return (
    <div>
      {person ? (
        <div>
          <h1>Detalhes da Pessoa</h1>
          <p>Nome: {person.nome}</p>
          <p>RG: {person.rg}</p>
          <p>CPF: {person.cpf}</p>
          <p>Data de Nascimento: {person.dataNascimento}</p>
          <p>Data de Admissão: {person.dataAdmissao}</p>
          <Link to={`/person/${id}/edit`}>Editar</Link>
          <Link to="/">Voltar para a Listagem</Link>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default SelectedPerson;

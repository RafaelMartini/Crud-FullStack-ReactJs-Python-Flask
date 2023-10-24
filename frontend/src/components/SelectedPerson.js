import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const SelectedPerson = () => {
  const { id } = useParams();
  const [person, setPerson] = useState(null);

  useEffect(() => {
    // Faça uma solicitação à API para obter os detalhes da pessoa com o ID fornecido
    // Atualize o estado "person" com os dados da API
  }, [id]);

  return (
    <div>
      {person ? (
        <div>
          <h1>Detalhes da Pessoa</h1>
          <p>Nome: {person.nome.split(" ")[0]}</p>
          <p>RG: {person.rg}</p>
          <p>CPF: {person.cpf}</p>
          <p>Data de Nascimento: {person.dataNascimento}</p>
          <p>Data de Admissão: {person.dataAdmissao}</p>
          <Link to={`/update/${id}`}>Editar</Link>
        </div>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default SelectedPerson;

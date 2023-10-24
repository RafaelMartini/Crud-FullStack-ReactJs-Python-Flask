import React from "react";

const PersonItem = ({ person }) => {
  return (
    <li>
      <p>ID: {person.id}</p>
      <p>Nome: {person.nome}</p>
      <p>RG: {person.rg}</p>
      <p>CPF: {person.cpf}</p>
      <p>Data de Nascimento: {person.dataNascimento}</p>
      <p>Data de Admissão: {person.dataAdmissao}</p>
    </li>
  );
};

export default PersonItem;

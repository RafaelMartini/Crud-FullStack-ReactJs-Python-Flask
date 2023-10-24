import React, { useState, useEffect } from "react";
import PersonItem from "./PersonItem";

const PersonList = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    // Chamada à API para buscar os dados das pessoas
    fetch("http://localhost:5000/pessoas/<int:id>")
      .then((response) => response.json())
      .then((data) => setPeople(data))
      .catch((error) =>
        console.error("Erro ao buscar dados das pessoas:", error)
      );
  }, []);

  return (
    <div>
      <h2>Lista de Pessoas</h2>
      <ul>
        {people.map((person) => (
          <PersonItem key={person.id} person={person} />
        ))}
      </ul>
    </div>
  );
};

export default PersonList;

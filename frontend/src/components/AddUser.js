import React, { useState } from "react";
import styled from "styled-components";
import axios from "../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;

function AddUser() {
  const [user, setUser] = useState({ nome: "", dataAdmissao: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/pessoas", user);
      toast.success("Usuário adicionado com sucesso.");
      setUser({ nome: "", dataAdmissao: "" });
    } catch (error) {
      toast.error("Erro ao adicionar usuário.");
    }
  };

  return (
    <Container>
      <Title>Adicionar Usuário</Title>
      <Form onSubmit={handleAddUser}>
        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            name="nome"
            value={user.nome}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Data de Admissão:</Label>
          <Input
            type="text"
            name="dataAdmissao"
            value={user.dataAdmissao}
            onChange={handleInputChange}
          />
        </FormGroup>
        <ButtonGroup>
          <button type="submit">Adicionar</button>
          <Link to="/">Cancelar</Link>
        </ButtonGroup>
      </Form>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
    </Container>
  );
}

export default AddUser;

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, Link } from "react-router-dom";

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

function EditUser() {
  const [user, setUser] = useState({ nome: "", dataAdmissao: "" });
  const { id } = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/pessoas/${id}`);
        setUser(response.data);
      } catch (error) {
        toast.error("Erro ao buscar usuário.");
      }
    };

    getUser();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/pessoas/${id}`, user);
      toast.success("Usuário atualizado com sucesso.");
    } catch (error) {
      toast.error("Erro ao atualizar usuário.");
    }
  };

  return (
    <Container>
      <Title>Editar Usuário</Title>
      <Form onSubmit={handleUpdate}>
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
          <button type="submit">Salvar</button>
          <Link to="/">Cancelar</Link>
        </ButtonGroup>
      </Form>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
    </Container>
  );
}

export default EditUser;

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "../axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "../styles/global";

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

function EditUser({ match, history }) {
  const userId = match.params.id;
  const [user, setUser] = useState({
    nome: "",
    rg: "",
    cpf: "",
    dataNascimento: "",
    dataAdmissao: "",
  });

  const getUserDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/pessoas/${userId}`);
      setUser(res.data);
    } catch (error) {
      toast.error("Erro ao carregar os detalhes do usuário.");
      history.push("/"); // Redirecionar para a página inicial em caso de erro.
      console.log("Erro ao carregar detalhes:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/pessoas/${userId}`, user);
      toast.success("Usuário editado com sucesso.");
      history.push("/"); // Redirecionar para a página inicial após a edição bem-sucedida.
    } catch (error) {
      toast.error("Erro ao editar o usuário.");
      console.log("Erro ao editar o usuário:", error);
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Container>
      <Title>Editar Usuário</Title>
      <Form onSubmit={handleEditUser}>
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
          <Label>RG:</Label>
          <Input
            type="text"
            name="rg"
            value={user.rg}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>CPF:</Label>
          <Input
            type="text"
            name="cpf"
            value={user.cpf}
            onChange={handleInputChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Data de Nascimento:</Label>
          <Input
            type="text"
            name="dataNascimento"
            value={user.dataNascimento}
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
          <button type="submit">Salvar Alterações</button>
        </ButtonGroup>
      </Form>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </Container>
  );
}

export default EditUser;

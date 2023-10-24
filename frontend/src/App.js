import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "./axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/global";
import Popup from "reactjs-popup"; // Importe o Popup
import EditUser from "./components/EditUser";

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

const UserItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonsContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const AddButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const EditButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/pessoas");
      setUsers(res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const formatDateBr = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("pt-BR");
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/pessoas/${userId}`);
      getUsers();
      toast.success("Pessoa excluída com sucesso.");
    } catch (error) {
      toast.error("Erro ao excluir a pessoa.");
    }
  };

  const handleEdit = (userToEdit) => {
    setOnEdit(userToEdit);
    setShowModal(true);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Container>
        <Title>Pessoas</Title>
        <ul>
          {users.map((user) => (
            <UserItem key={user.id}>
              <UserInfo>
                <div>Nome: {user.nome.split(" ")[0]}</div>
                <div>Data de Admissão: {formatDateBr(user.dataAdmissao)}</div>
              </UserInfo>
              <ButtonsContainer>
                <EditButton onClick={() => handleEdit(user)}>Editar</EditButton>
                <button onClick={() => handleDelete(user.id)}>Excluir</button>
              </ButtonsContainer>
            </UserItem>
          ))}
        </ul>
        <AddButton onClick={() => setOnEdit(null)}>
          Adicionar Registro
        </AddButton>
      </Container>

      {/* Use o componente Popup para criar o modal */}
      <Popup
        open={showModal}
        closeOnDocumentClick
        onClose={() => setShowModal(false)}
      >
        <div>
          {onEdit && (
            <EditUser user={onEdit} closeModal={() => setShowModal(false)} />
          )}
        </div>
      </Popup>

      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;

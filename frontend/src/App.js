import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "./axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyle from "./styles/global";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  border: 1px solid #ddd;
  background-color: #fff;
  padding: 10px;
  margin: 10px 0;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const EditButton = styled.button`
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
`;

const DeleteButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const AddButton = styled.button`
  background-color: #3498db;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
`;

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

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
    setEditingUser(userToEdit);
  };

  const handleUserEditChange = (field, value) => {
    setEditingUser({
      ...editingUser,
      [field]: value,
    });
  };

  const handleSaveEdit = async (editedUser) => {
    try {
      await axios.put(
        `http://localhost:5000/pessoas/${editedUser.id}`,
        editedUser
      );
      setEditingUser(null);
      getUsers();
      toast.success("Pessoa editada com sucesso.");
    } catch (error) {
      toast.error("Erro ao editar a pessoa.");
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>
      <Title>Pessoas</Title>
      <UserList>
        {users.map((user) => (
          <UserItem key={user.id}>
            {editingUser && editingUser.id === user.id ? (
              <div>
                <div>
                  <input
                    type="text"
                    value={editingUser.nome}
                    onChange={(e) =>
                      handleUserEditChange("nome", e.target.value)
                    }
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={editingUser.dataAdmissao}
                    onChange={(e) =>
                      handleUserEditChange("dataAdmissao", e.target.value)
                    }
                  />
                </div>
                <div>
                  <EditButton onClick={() => handleSaveEdit(editingUser)}>
                    Salvar
                  </EditButton>
                  <DeleteButton onClick={handleCancelEdit}>
                    Cancelar
                  </DeleteButton>
                </div>
              </div>
            ) : (
              <UserInfo>
                <div>Nome: {user.nome.split(" ")[0]}</div>
                <div>Data de Admissão: {formatDateBr(user.dataAdmissao)}</div>
              </UserInfo>
            )}
            <div>
              <EditButton onClick={() => handleEdit(user)}>Editar</EditButton>
              <DeleteButton onClick={() => handleDelete(user.id)}>
                Excluir
              </DeleteButton>
            </div>
          </UserItem>
        ))}
      </UserList>
      <AddButton onClick={() => setEditingUser(null)}>
        Adicionar Registro
      </AddButton>

      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </Container>
  );
}

export default App;

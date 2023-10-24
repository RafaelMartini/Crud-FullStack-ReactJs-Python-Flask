import GlobalStyle from "./styles/global";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "./axiosConfig";

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

function App() {
  const [users, setUsers] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/pessoas");
      setUsers(res.data);
    } catch (error) {
      toast.error(error);
    }
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

  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <>
      <Container>
        <Title>Pessoas</Title>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.nome} - {user.dataAdmissao}
              <button onClick={() => setOnEdit(user)}>Editar</button>
              <button onClick={() => handleDelete(user.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      </Container>
      <ToastContainer autoClose={5000} position={toast.POSITION.BOTTOM_LEFT} />
      <GlobalStyle />
    </>
  );
}

export default App;

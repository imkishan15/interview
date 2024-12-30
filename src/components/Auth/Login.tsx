import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Input } from "@mantine/core";
import useAuthStore from "../../store/auth.store";
import { ROUTES } from "../../routes/routes";

const FormContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username, password });
    if (localStorage.getItem("auth")) {
      navigate(ROUTES.LAUNCHPADS);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Input
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button variant="filled" type="submit">
          Login
        </Button>
      </FormContainer>
    </form>
  );
};

export default Login;

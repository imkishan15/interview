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

const SignUp: React.FC = () => {
  const signUp = useAuthStore((state) => state.signUp);
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const error = signUp({ username, password });
    if (error) {
      alert(error);
    } else {
      alert(`Sign-Up successful for ${username}! Please log in.`);
      navigate(ROUTES.LOGIN);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormContainer>
        <Input
          placeholder="Enter your username"
          value={username}
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
        <Input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <Button type="submit">Sign Up</Button>
      </FormContainer>
    </form>
  );
};

export default SignUp;

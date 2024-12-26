import React from "react";
import { Button, Card, Title } from "@mantine/core";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import styled from "styled-components";

const StyledCard = styled(Card)`
  margin: auto;
  width: 400px;
  padding: 30px;
  margin-top: 100px;
  background: rgb(20, 20, 20);
`;

const StyledSection = styled(Card.Section)`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const Auth: React.FC = () => {
  const navigate = useNavigate();
  const isLogin = window.location.pathname === ROUTES.LOGIN;
  const isSignup = window.location.pathname === ROUTES.SIGNUP;
  return (
    <center>
      <StyledCard>
        <Title>Authentication</Title>
        <StyledSection>
          <Button
            m={10}
            onClick={() => navigate(ROUTES.LOGIN)}
            variant={isLogin ? "filled" : "outline"}
          >
            Login
          </Button>
          <Button
            m={10}
            onClick={() => navigate(ROUTES.SIGNUP)}
            variant={isSignup ? "filled" : "outline"}
          >
            Signup
          </Button>
        </StyledSection>
        <Outlet />
      </StyledCard>
    </center>
  );
};

export default Auth;

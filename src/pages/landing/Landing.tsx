import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useAuthStore from "../../store/auth.store";
import { ROUTES } from "../../routes/routes";
import { Button, Paper } from "@mantine/core";
import styled from "styled-components";
import { IconLogout } from "@tabler/icons-react";

const StyledPaper = styled(Paper)`
  padding: 12px;
  font-size: 20px;
  background: #000000;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const LandingContainer = styled.div`
  margin: 24px;
`;

const Landing: React.FC = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.auth);
  const logoutUser = () => {
    logout();
    navigate(ROUTES.LOGIN);
  };
  return (
    <LandingContainer>
      <Header>
        <StyledPaper>
          Hi {user?.username}, Welcome to Script Assist!
        </StyledPaper>
        <Button
          size="lg"
          color="red"
          rightSection={<IconLogout stroke={1.5} />}
          onClick={logoutUser}
        >
          Log out
        </Button>
      </Header>
      <Outlet />
    </LandingContainer>
  );
};

export default Landing;

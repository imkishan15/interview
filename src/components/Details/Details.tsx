import React from "react";
import styled from "styled-components";
import { Button, Paper } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { LaunchPad } from "../../utils/util";
import { getOneLaunchpad } from "../../utils/methods";
import Description from "./Description";
import { errorComponent, loadingComponent } from "../Resources/Resources";

const DetailsContainer = styled(Paper)`
  margin: auto;
  width: 80%;
  background: var(--darkblue);
  border-radius: 4px;
  margin: 24px auto;
  padding: 24px;
  @media (max-width: 600px) {
    width: 98%;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 12px;
  font-size: 24px;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: baseline;
  }
`;

const Details: React.FC = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useQuery<LaunchPad, Error>(
    ["launchpad", id],
    () => getOneLaunchpad(id as string)
  );

  const renderDetails = () => {
    if (isLoading) {
      return loadingComponent("Loading details of launchpad...");
    }
    if (error instanceof Error) {
      return errorComponent();
    }
    return <Description data={data as LaunchPad} />;
  };

  return (
    <DetailsContainer>
      <Header>
        <h4>{!isLoading && `Details for ${data?.name}`}</h4>
        <Button
          variant="filled"
          color="blue"
          leftSection={<IconArrowLeft size={14} />}
          onClick={() => window.history.back()}
        >
          Back
        </Button>
      </Header>
      {renderDetails()}
    </DetailsContainer>
  );
};

export default Details;

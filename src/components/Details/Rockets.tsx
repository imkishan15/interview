import React from "react";
import { getRocketsByIds } from "../../utils/methods";
import { Rocket } from "../../utils/util";
import { StyledDescription } from "./Description";
import { Table } from "@mantine/core";
import styled from "styled-components";
import { errorComponent, loadingComponent } from "../Launchpads/Launchpads";
import { useQuery } from "@tanstack/react-query";
import { TableContainer } from "./DetailsTable";

const StyledTitle = styled.h3`
  margin: 32px;
  @media (max-width: 600px) {
    margin: 0;
  }
`;

const RocketContainer = styled.div`
  margin: 16px 0;
`;

type RocketsProps = {
  ids: string[];
};

const Rockets: React.FC<RocketsProps> = ({ ids }) => {
  const {
    data: rockets,
    isLoading,
    error,
  } = useQuery<Rocket[], Error>(["launchpad", ids], () => getRocketsByIds(ids));

  const getRocketObject = (rocket: Rocket) => ({
    "First flight": rocket.first_flight,
    "Cost per launch": rocket.cost_per_launch + " USD",
    "Success rate": rocket.success_rate_pct + "%",
    Active: rocket.active ? "Yes" : "No",
    Boosters: rocket.boosters,
  });

  if (isLoading) return loadingComponent("Loading details of rockets");

  if (error instanceof Error) return errorComponent();

  if ((rockets as Rocket[]).length === 0) return <p>No rockets found</p>;

  return (rockets as Rocket[]).map((rocket) => (
    <RocketContainer>
      <StyledTitle>Rocket: {rocket.name}</StyledTitle>
      <TableContainer>
        <Table m="auto" variant="vertical" layout="fixed" withTableBorder>
          <Table.Tbody>
            {Object.entries(getRocketObject(rocket)).map(([key, value]) => (
              <Table.Tr key={key}>
                <Table.Th w="40%">{key}</Table.Th>
                <Table.Td>{value}</Table.Td>
              </Table.Tr>
            ))}
          </Table.Tbody>
        </Table>
      </TableContainer>
      <StyledDescription>{rocket.description}</StyledDescription>
    </RocketContainer>
  ));
};

export default Rockets;

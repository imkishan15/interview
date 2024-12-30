import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Button, Paper, Table } from "@mantine/core";
import { IconArrowBigRight } from "@tabler/icons-react";
import { ROUTES } from "../../routes/routes";
import { columns } from "../../utils/util";
import { useLaunchpadStore } from "../../store/app.store";
import { formatTimeZone } from "../../utils/methods";

const TableContainer = styled.div`
  margin: auto;
  width: 100%;
  background: var(--lightblue);
  border-radius: 4px;
  margin: 12px auto;
  color: var(--text);
  @media (max-width: 600px) {
    overflow-x: scroll;
  }
`;

const StyledPaper = styled(Paper)`
  padding: 8px 12px;
  font-size: 18px;
  margin: auto;
  margin-top: 8px;
  width: max-content;
  color: var(--darkblue);
  @media (max-width: 500px) {
    width: fit-content;
  }
`;

const LaunchpadsTable: React.FC = () => {
  const navigate = useNavigate();
  const launchpads = useLaunchpadStore((state) => state.filteredLaunchpad);

  const onButtonClick = (id: string) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };

  if (launchpads.length === 0) {
    return (
      <StyledPaper>
        No launchpad matches your criteria. Adjust your filters or reset them to
        see all available launchpads.
      </StyledPaper>
    );
  }

  return (
    <TableContainer>
      <Table>
        <Table.Thead>
          <Table.Tr>
            {columns.map((column) => (
              <Table.Th w={200} key={column}>
                {column}
              </Table.Th>
            ))}
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {launchpads.map((row) => (
            <Table.Tr key={row.name}>
              <Table.Td>{row.name}</Table.Td>
              <Table.Td>{row.locality}</Table.Td>
              <Table.Td>{row.region}</Table.Td>
              <Table.Td>{formatTimeZone(row.timezone)}</Table.Td>
              <Table.Td>{row.status}</Table.Td>
              <Table.Td>
                <Button
                  variant="filled"
                  color="indigo"
                  radius="xl"
                  size="xs"
                  ml={10}
                  onClick={() => onButtonClick(row.id)}
                >
                  <IconArrowBigRight />
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </TableContainer>
  );
};

export default LaunchpadsTable;

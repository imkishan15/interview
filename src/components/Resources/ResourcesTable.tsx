import React from "react";
import { columns } from "../../utils/util";
import { Button, Paper, Table } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { useLaunchpadStore } from "../../store/app.store";
import { IconArrowBigRight } from "@tabler/icons-react";
import styled from "styled-components";

const TableContainer = styled.div`
  margin: auto;
  width: 100%;
  background: #222222;
  border-radius: 8px;
  margin: 12px auto;
`;

const StyledPaper = styled(Paper)`
  padding: 8px 12px;
  font-size: 18px;
  margin: auto;
  margin-top: 8px;
  width: max-content;
`;

const StyledButton = styled(Button)`
  background: green;
  border-radius: 100%;
  padding: 8px;
`;

const ResourcesTable: React.FC = ({}) => {
  const navigate = useNavigate();
  const launchpads = useLaunchpadStore((state) => state.filteredLaunchpad);

  const onButtonClick = (id: string) => {
    navigate(`${ROUTES.DETAILS}/${id}`);
  };

  const formatTimeZone = (timeZone: string) => timeZone.replace(/_/g, " ");

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

export default ResourcesTable;

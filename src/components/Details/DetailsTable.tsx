import React from "react";
import styled from "styled-components";
import { Table } from "@mantine/core";
import { LaunchPad } from "../../utils/util";
import { formatTimeZone } from "../../utils/methods";

export const TableContainer = styled.div`
  margin: auto;
  border-radius: 4px;
  margin: 12px auto;
  background: var(--lightblue);
  width: 80%;
  color: var(--text);
`;

type DetailsTableProps = {
  data: LaunchPad;
};

const DetailsTable: React.FC<DetailsTableProps> = ({ data }) => {
  const launchpadObject = {
    "Full name": data.full_name,
    Locality: data.locality,
    Region: data.region,
    "Time Zone": formatTimeZone(data.timezone),
    Status: data.status,
    "Rockets Launched": data.rockets.length,
  };
  return (
    <TableContainer>
      <Table m="auto" variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          {Object.entries(launchpadObject).map(([key, value]) => (
            <Table.Tr key={key}>
              <Table.Th w={180}>{key}</Table.Th>
              <Table.Td>{value}</Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </TableContainer>
  );
};

export default DetailsTable;

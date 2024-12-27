import React from "react";
import { LaunchPads } from "../../utils/util";
import { Button, Image, Table } from "@mantine/core";
import styled from "styled-components";
import { formatTimeZone } from "../../utils/methods";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px 0;
`;

const DescriptionContainer = styled.div`
  margin: 24px 48px;
  background: #000000;
`;

const StyledDescription = styled.p`
  font-size: 18px;
  margin-bottom: 18px;
`;

type Props = {
  data: LaunchPads;
};

const Description: React.FC<Props> = ({ data }) => {
  const [showmore, setShowmore] = React.useState(false);
  return (
    <div>
      <ImageContainer>
        <Image
          radius="md"
          h={300}
          w={400}
          src={data.images.large[0]}
          alt={data.name}
        />
      </ImageContainer>
      <Table w={800} m="auto" variant="vertical" layout="fixed" withTableBorder>
        <Table.Tbody>
          <Table.Tr>
            <Table.Th w={160}>Full name</Table.Th>
            <Table.Td>{data.full_name}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Locality</Table.Th>
            <Table.Td>{data.locality}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Region</Table.Th>
            <Table.Td>{data.region}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Time Zone</Table.Th>
            <Table.Td>{formatTimeZone(data.timezone)}</Table.Td>
          </Table.Tr>
          <Table.Tr>
            <Table.Th>Status</Table.Th>
            <Table.Td>{data.status}</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      </Table>
      <DescriptionContainer>
        {showmore && (
          <StyledDescription>Details: {data.details}</StyledDescription>
        )}
        <center>
          <Button variant="filled" onClick={() => setShowmore(!showmore)}>
            {showmore ? "Hide" : "See"} full description
          </Button>
        </center>
      </DescriptionContainer>
    </div>
  );
};

export default Description;

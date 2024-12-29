import React from "react";
import styled from "styled-components";
import { Button, Image } from "@mantine/core";
import { IconArrowDown, IconArrowUp } from "@tabler/icons-react";
import { LaunchPad } from "../../utils/util";
import Rockets from "./Rockets";
import DetailsTable from "./DetailsTable";

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 24px auto;
  width: 100%;
  height: 300px;
  @media (max-width: 600px) {
    height: 200px;
  }
`;

const DescriptionContainer = styled.div`
  margin: 24px 48px;
  @media (max-width: 600px) {
    margin: 16px 8px;
  }
`;

export const StyledDescription = styled.p`
  font-size: 18px;
  margin-bottom: 18px;
  width: 85%;
  margin: auto;
  @media (max-width: 600px) {
    width: 100%;
  }
`;

type DescriptionProps = {
  data: LaunchPad;
};

const Description: React.FC<DescriptionProps> = ({ data }) => {
  const [showmore, setShowmore] = React.useState(false);

  return (
    <div>
      <ImageContainer>
        <Image radius="md" src={data.images.large[0]} alt={data.name} />
      </ImageContainer>
      <DetailsTable data={data} />
      <StyledDescription>Details: {data.details}</StyledDescription>
      {data.rockets.length !== 0 && (
        <>
          <DescriptionContainer>
            {showmore && <Rockets ids={data.rockets} />}
          </DescriptionContainer>
          <center>
            <Button
              variant="filled"
              rightSection={
                showmore ? (
                  <IconArrowUp stroke={2} />
                ) : (
                  <IconArrowDown stroke={2} />
                )
              }
              onClick={() => setShowmore(!showmore)}
            >
              {showmore ? "Hide" : "See"} Details of rocket/s launched
            </Button>
          </center>
        </>
      )}
    </div>
  );
};

export default Description;

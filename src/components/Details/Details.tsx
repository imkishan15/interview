import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LaunchPads } from "../../utils/util";
import { Button, Paper } from "@mantine/core";
import { getOneLaunchpad } from "../../utils/methods";
import { IconArrowLeft } from "@tabler/icons-react";
import Description from "./Description";
import styled from "styled-components";
import { errorComponent, loadingComponent } from "../Resources/Resources";

const DetailsContainer = styled(Paper)`
  margin: auto;
  width: 80%;
  background: #000000;
  border-radius: 8px;
  margin: 24px auto;
  padding: 24px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  margin-bottom: 12px;
  font-size: 24px;
`;

const Details: React.FC = () => {
  const { id } = useParams();
  const [data, setData] = useState<LaunchPads>();
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const getLaunchpad = async (id: string) => {
    await getOneLaunchpad(id)
      .then((res) => setData(res.data))
      .catch(() => setShowError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (id) {
      getLaunchpad(id);
    }
  }, []);

  const renderDetails = () => {
    if (loading) {
      return loadingComponent("Loading details...");
    }
    if (showError) {
      return errorComponent();
    }
    return <Description data={data as LaunchPads} />;
  };

  return (
    <DetailsContainer>
      <Header>
        <h4>{!loading && `Details for ${data?.name}`}</h4>
        <Button
          variant="filled"
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

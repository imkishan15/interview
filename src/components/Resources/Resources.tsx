import React, { useEffect, useState } from "react";
import { getAllLaunchpads } from "../../utils/methods";
import ResourcesTable from "./ResourcesTable";
import { Loader, Paper } from "@mantine/core";
import { useLaunchpadStore } from "../../store/app.store";
import Filters from "./Filters";
import styled from "styled-components";
import { IconExclamationCircleFilled } from "@tabler/icons-react";

const StyledResults = styled.div`
  width: fit-content;
  padding: 4px 8px;
  font-size: 18px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;

const ResourceContainer = styled.div`
  margin-top: 12px;
  padding: 24px;
  background: #0a0a0a;
  border-radius: 12px;
`;

const PaperWrapper = styled(Paper)`
  padding: 24px;
  display: flex;
  gap: 12px;
  width: fit-content;
  margin: 128px auto;
  background: black;
  align-items: center;
`;

export const loadingComponent = (message: string) => (
  <PaperWrapper>
    <Loader size={30} />
    <p>{message}</p>
  </PaperWrapper>
);

export const errorComponent = () => (
  <PaperWrapper>
    <IconExclamationCircleFilled />
    <p>Error: Something went wrong, please try agin later</p>
  </PaperWrapper>
);

const Resources: React.FC = () => {
  const addLaunchpadItem = useLaunchpadStore(
    (state) => state.addLaunchpadItems
  );

  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);

  const getData = async () => {
    await getAllLaunchpads()
      .then((res) => addLaunchpadItem(res.data))
      .catch((err) => setShowError(true))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getData();
  }, []);

  const launchpadsCount = useLaunchpadStore(
    (state) => state.filteredLaunchpad
  ).length;

  if (loading) {
    return loadingComponent("Loading details of all launchpads...");
  }

  if (showError) {
    return errorComponent();
  }

  return (
    <ResourceContainer>
      <Header>
        <Filters />
        {launchpadsCount !== 0 && (
          <StyledResults>
            {launchpadsCount === 1
              ? "1 launchpad is found"
              : launchpadsCount + " launchpads are found"}
          </StyledResults>
        )}
      </Header>
      <ResourcesTable />
    </ResourceContainer>
  );
};

export default Resources;

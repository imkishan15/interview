import React from "react";
import styled from "styled-components";
import { Loader, Paper } from "@mantine/core";
import { IconExclamationCircleFilled } from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";
import { getAllLaunchpads } from "../../utils/methods";
import ResourcesTable from "./ResourcesTable";
import { useLaunchpadStore } from "../../store/app.store";
import Filters from "./Filters";
import { LaunchPad } from "../../utils/util";

const StyledResults = styled.div`
  width: fit-content;
  padding: 4px 8px;
  font-size: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: baseline;
  }
`;

const ResourceContainer = styled.div`
  margin-top: 12px;
  padding: 24px;
  background: var(--darkblue);
  border-radius: 8px;
`;

const PaperWrapper = styled(Paper)`
  padding: 24px;
  display: flex;
  gap: 12px;
  width: fit-content;
  margin: 64px auto;
  background: var(--darkblue);
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
  const { error, isLoading } = useQuery<LaunchPad[], Error>(
    ["launchpads"],
    getAllLaunchpads,
    {
      onSuccess: (data) => {
        addLaunchpadItem(data);
      },
    }
  );

  const launchpadsCount = useLaunchpadStore(
    (state) => state.filteredLaunchpad
  ).length;

  if (isLoading) {
    return loadingComponent("Loading details of all launchpads...");
  }

  if (error instanceof Error) {
    return errorComponent();
  }

  return (
    <ResourceContainer>
      <h3>Details of Launchpads</h3>
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

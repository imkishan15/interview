import React, { useState } from "react";
import { Button, MultiSelect, Select, TextInput } from "@mantine/core";
import { useLaunchpadStore } from "../../store/app.store";
import { STATUSVALUES } from "../../utils/util";
import styled from "styled-components";

const FiltersContainer = styled.div`
  display: flex;
  align-items: end;
  border-radius: 12px;
  padding: 16px;
  gap: 18px;
  justify-content: space-between;
`;

const Filters: React.FC = () => {
  const allRegions = useLaunchpadStore((state) => state.regions);
  const statusValues = useLaunchpadStore((state) => state.status);
  const filterData = useLaunchpadStore((state) => state.filterLaunchpads);
  const clearAllFilter = useLaunchpadStore((state) => state.clearFilter);

  const [status, setStatus] = useState<STATUSVALUES>(STATUSVALUES.ANY);
  const [name, setName] = useState<string>("");
  const [regions, setRegions] = useState<string[]>([]);

  const handleNameChange = (value: string) => {
    setName(value);
    filterData(value, regions, status);
  };

  const handleRegionsChange = (value: string[]) => {
    setRegions(value);
    filterData(name, value, status);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value as STATUSVALUES);
    filterData(name, regions, value);
  };

  const clearFilter = () => {
    clearAllFilter();
    setName("");
    setRegions([]);
    setStatus(STATUSVALUES.ANY);
  };
  return (
    <FiltersContainer>
      <TextInput
        label="Name"
        placeholder="Search by name"
        onChange={(e) => handleNameChange(e.currentTarget.value)}
        value={name}
      />

      <MultiSelect
        label="Regions"
        placeholder="Pick regions"
        data={allRegions}
        value={regions}
        onChange={handleRegionsChange}
        clearable
      />

      <Select
        label="Status"
        checkIconPosition="right"
        data={statusValues}
        value={status}
        onChange={(value) => handleStatusChange(value as string)}
      />

      <Button variant="filled" onClick={() => clearFilter()}>
        Clear Filter
      </Button>
    </FiltersContainer>
  );
};

export default Filters;

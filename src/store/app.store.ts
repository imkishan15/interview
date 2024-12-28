import { create } from "zustand";
import { LaunchPad, STATUSVALUES } from "../utils/util";

type LaunchpadStore = {
  allLaunchpad: LaunchPad[];
  filteredLaunchpad: LaunchPad[];
  regions: string[];
  status: string[];
  addLaunchpadItems: (items: LaunchPad[]) => void;
  filterLaunchpads: (name: string, regions: string[], status: string) => void;
  clearFilter: () => void;
};

export const useLaunchpadStore = create<LaunchpadStore>((set, get) => ({
  allLaunchpad: [],
  filteredLaunchpad: [],
  regions: [],
  status: Object.values(STATUSVALUES),
  addLaunchpadItems: (items) =>
    set(() => {
      const updatedAllLaunchpad = items;
      const updatedRegions = Array.from(
        new Set(items.map((item) => item.region))
      );

      return {
        allLaunchpad: updatedAllLaunchpad,
        filteredLaunchpad: updatedAllLaunchpad,
        regions: updatedRegions,
      };
    }),

  filterLaunchpads: (name, regions, status) =>
    set(() => {
      const filteredData = get().allLaunchpad.filter((item) => {
        const matchesName = name
          ? item.name.toLowerCase().includes(name.toLowerCase())
          : true;
        const matchesRegion = regions.length
          ? regions.includes(item.region)
          : true;
        const matchesStatus =
          status.toLowerCase() !== "any"
            ? item.status.toLowerCase() === status.toLowerCase()
            : true;

        return matchesName && matchesRegion && matchesStatus;
      });

      return { filteredLaunchpad: filteredData };
    }),

  clearFilter: () =>
    set(() => {
      return { filteredLaunchpad: get().allLaunchpad };
    }),
}));

export const baseUrl = "https://api.spacexdata.com/v4";

export type User = {
  username: string;
  password: string;
};

export type LaunchPads = {
  images: {
    large: string[];
  };
  name: string;
  full_name: string;
  locality: string;
  region: string;
  latitude: number;
  longitude: number;
  launch_attempts: number;
  launch_successes: number;
  rockets: string[];
  timezone: string;
  launches: string[];
  status: string;
  details: string;
  id: string;
};

export enum STATUSVALUES {
  ANY = "any",
  ACTIVE = "active",
  INACTIVE = "under construction",
  RETIRED = "retired",
}

export const columns = [
  "Name",
  "Locality",
  "Region",
  "Timezone",
  "Status",
  "View Details",
];


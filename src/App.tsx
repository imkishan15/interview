import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import "./App.scss";

export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <MantineProvider defaultColorScheme="light">
      <Outlet />
    </MantineProvider>
  );
}

"use client";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const Switcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <Switch
        size="sm"
        color={theme === "dark" ? "success" : "primary"}
        startContent={theme === "dark" ? <SunIcon /> : <MoonIcon />}
        endContent={theme === "light" ? <MoonIcon /> : <SunIcon />}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className="pl-4"
      ></Switch>
    </>
  );
};

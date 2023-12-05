"use client";
import { Switch } from "@nextui-org/react";
import { MoonIcon } from "@radix-ui/react-icons";
import { SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Switch
      size="sm"
      color={theme === "dark" ? "success" : "primary"}
      startContent={theme === "dark" ? <SunIcon /> : <MoonIcon />}
      endContent={theme === "light" ? <MoonIcon /> : <SunIcon />}
      onChange={() => setTheme(theme === "light" ? "dark" : "light")}
      className="px-4 md:scale-50"
    ></Switch>
  );
};

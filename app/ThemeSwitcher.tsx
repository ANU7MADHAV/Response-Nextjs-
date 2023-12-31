"use client";
import { Show } from "@chakra-ui/react";
import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
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
    <>
      <Switch
        size="md"
        color={theme === "dark" ? "success" : "primary"}
        startContent={theme === "dark" ? <SunIcon /> : <MoonIcon />}
        endContent={theme === "light" ? <MoonIcon /> : <SunIcon />}
        onChange={() => setTheme(theme === "light" ? "dark" : "light")}
        className="font-medium px-4"
      >
        Dark mode
      </Switch>
    </>
  );
};

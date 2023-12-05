"use client";

import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaTools } from "react-icons/fa";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ThemeSwitcher } from "./ThemeSwitcher";

const NavBar = () => {
  const { status, data: session } = useSession();
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/response", label: "Response" },
  ];
  return (
    <div>
      <nav>
        <ul className=" border-b h-20  px-10 mb-4 py-5">
          <Container>
            <Flex align="center" justify="between">
              <Flex align="center" gap="3">
                <Link href="/">
                  <FaTools />
                </Link>
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      className={classNames({
                        "text-white-900": link.href === pathname,
                        "text-zinc-500": link.href !== pathname,
                        "hover:text-white-800 transition-colors": true,
                      })}
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </Flex>
              <Box>
                <ThemeSwitcher />
                {status === "authenticated" && (
                  <DropdownMenu.Root>
                    <DropdownMenu.Trigger>
                      <Avatar
                        src={session.user?.image!}
                        fallback="?"
                        size="3"
                        radius="full"
                        className="cursor-pointer"
                      />
                    </DropdownMenu.Trigger>{" "}
                    <DropdownMenu.Content>
                      <DropdownMenu.Label>
                        <Text>{session.user?.name}</Text>
                      </DropdownMenu.Label>
                      <DropdownMenu.Item>
                        <Link href="/api/auth/signout">Sign out</Link>
                      </DropdownMenu.Item>
                    </DropdownMenu.Content>
                  </DropdownMenu.Root>
                )}
                {status === "unauthenticated" && (
                  <Link
                    href="/api/auth/signin"
                    className="text-zinc-600 font-medium hover:text-zinc-800"
                  >
                    Sign in
                  </Link>
                )}
                {status === "loading" && (
                  <Skeleton width="3rem" height="2rem" borderRadius="20rem" />
                )}
              </Box>
            </Flex>
          </Container>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;

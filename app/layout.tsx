import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "./auth/Provider";
import "./globals.css";
import { Providers } from "./Providers";
import { Switcher } from "./Switch";
import { Show } from "@chakra-ui/react";

export const metadata: Metadata = {
  title: "Response Web App",
  description: "Write your responses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <QueryClientProvider>
          <AuthProvider>
            <ThemeProvider>
              <Providers>
                <Theme>
                  <NavBar />
                  <Show below="sm">
                    <Switcher />
                  </Show>
                  <main className="p-5">{children}</main>
                </Theme>
              </Providers>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata } from "next";
import NavBar from "./NavBar";
import QueryClientProvider from "./QueryClientProvider";
import { ThemeProvider } from "./ThemeProvider";
import AuthProvider from "./auth/Provider";
import "./globals.css";

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
              <Theme>
                <NavBar />
                <main className="p-5">{children}</main>
              </Theme>
            </ThemeProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}

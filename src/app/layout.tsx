import { Providers } from "@/redux/provider";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import { Inter } from "next/font/google";
import BackgroundImage from "../assets/images/background.jpg";
import { InitializationWallet } from "./_components/InitializationWallet";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Super School",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <ThemeRegistry>
        <body suppressHydrationWarning={true} className={inter.className}>
          <Providers>
            <InitializationWallet />
            <Box
              sx={{
                backgroundImage: `url('${BackgroundImage.src}')`,
                backgroundSize: "cover",
                backgroundRepeat: " no-repeat",
                backgroundPosition: "center",
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: "100vh",
                  backgroundColor: "rgba(0,0,0,0.8)",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {children}
              </Box>
            </Box>
          </Providers>
        </body>
      </ThemeRegistry>
    </html>
  );
}

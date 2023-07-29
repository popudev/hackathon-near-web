import { Providers } from "@/redux/provider";
import ThemeRegistry from "@/theme/ThemeRegistry";
import { Box } from "@mui/material";
import { Inter } from "next/font/google";
import BackgroundImage from "../assets/images/background.jpg";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Super School",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <ThemeRegistry>
        <body className={inter.className}>
          <Providers>
            <Box
              sx={{
                backgroundImage: `url('${BackgroundImage.src}')`,
                backgroundColor: "rgba(0, 0, 0, 0.9)",
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

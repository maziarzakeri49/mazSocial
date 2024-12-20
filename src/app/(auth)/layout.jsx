import Loader from "../../components/Loader";
import { ClerkProvider ,ClerkLoading ,ClerkLoaded } from "@clerk/nextjs";
import ".././globals.css";
export const metadata = {
  title: "Movie clone",
  description: "i make movie website clone",
};
export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
        <ClerkLoading>
            <Loader/>
          </ClerkLoading>
          <ClerkLoaded> {children}</ClerkLoaded>
             </body>
      </html>

    </ClerkProvider>

  )
}

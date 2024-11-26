import LeftSideBar from "@/components/LeftSideBar"
import RightSideBar from "@/components/RightSideBar"

import localFont from "next/font/local";
import ".././globals.css";

const geistSans = localFont({
  src: ".././fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: ".././fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Movie clone",
  description: "i make movie website clone",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}
antialiased`}
      >
        <div className="flex justify-between max-w-6xl mx-auto">
          <div className="hidden sm:inline border-r h-screen sticky top-0"><LeftSideBar /></div>
          <div className="w-2xl flex-1">{children}</div>
          <div className="lg:flex-col p-3 h-screen border-l hidden lg:flex w-[24rem]"><RightSideBar /></div>


        </div>


      </body>
    </html>
  )
}

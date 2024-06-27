import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import MouseTrailer from "./components/MouseTrailer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Emilio's Photos",
	description: "Website to showcase photos",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={
					`${inter.className}` +
					" " +
					`h-screen w-screen bg-[#1D150B] overflow-hidden text-[#F5EEE6]`
				}
			>
                <MouseTrailer />
				{children}
			</body>
		</html>
	);
}

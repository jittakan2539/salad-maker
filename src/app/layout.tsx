import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
	title: "Salad-maker",
	description: "Web app to help you design your own salads.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" href="/images/logo.png" />
				<title>Salad-maker</title>
			</head>
			<body className={poppins.className}>{children}</body>
		</html>
	);
}

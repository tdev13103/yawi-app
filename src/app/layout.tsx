import RootStyleRegistry from './emotion';
import { ThemeContextProvider } from "@/context/theme.context";
import { themeSettings } from "@/lib/themeSettings";
import { HeaderAction } from "@/components/Header";
import { menuSettings } from "@/lib/menuSettings";
import { FooterAction } from "@/components/Footer";
import { Outfit } from 'next/font/google'
import React from "react";
import '../../public/global.css'

export const revalidate = 5;

// If loading a variable font, you don't need to specify the font weight
const poppins = Outfit( {
	subsets  : ['latin'],
	style    : ['normal'],
	weight   : ['400', '600', '700'],
	variable : '--font-outfit',
	display  : 'swap',
} )

export default async function RootLayout( { children }: { children: React.ReactNode } ) {
	
	const menuProps = await menuSettings();
	const theme = await themeSettings();
	return (
		<html lang="en-US" className={ poppins.className }>
		<head></head>
		<body style={ { backgroundColor : '#E5EFEF' } }>
		<ThemeContextProvider value={ theme }>
			<RootStyleRegistry>
				<HeaderAction links={ menuProps['header-menu'] }/>
				{ children }
				<FooterAction links={ menuProps['footer-menu'] }/>
			</RootStyleRegistry>
		</ThemeContextProvider>
		</body>
		</html>
	);
}

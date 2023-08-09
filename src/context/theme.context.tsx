'use client'

import React, { createContext, Dispatch, SetStateAction, useContext, useState } from "react";

interface ThemeSettings {
	footerAddress: string;
	footerCopyright: string;
	footerLabelMenu1: string;
	footerLabelMenu2: string;
	footerLabelMenu3: string;
	footerLogo: {
		title: string;
		sourceUrl: string;
	}
	footerSocials: {
		socialLink: string;
		socialIcon: {
			title: string;
			sourceUrl: string;
		}
	}[]
	footerDescription: string
	footerEmail: string
	footerImages: {
		image: {
			title: string
			sourceUrl: string
		}
	}[]
	footerPhone: string
	privacyLink: {
		title: string
		slug: string
	}
	buttonRepeater: {
		variant: string
		iconColor: string
		icon: {
			title: string
			sourceUrl: string
		}
		color: string
		button: {
			url: string
			title: string
		}
	}[]
	headerLogo: {
		title: string;
		sourceUrl: string;
	}
	headerLogoHomePage: {
		title: string;
		sourceUrl: string;
	}
	formsSettings: {
		formName: string;
		formId: string;
		fields: {
			fieldId: string;
			name: string;
		}[]
	}[]
	instagram : string
}

interface ThemeContextProps {
	themeSettings: ThemeSettings;
	setThemeSettings: Dispatch<SetStateAction<ThemeSettings>>;
}

const ThemeContext = createContext<ThemeContextProps>( {} as ThemeContextProps );

export const ThemeContextProvider = ( {
	children,
	value
}: { children: React.ReactNode, value: any } ) => {
	const [themeSettings, setThemeSettings] = useState( value );
	
	return (
		<ThemeContext.Provider value={ {
			themeSettings,
			setThemeSettings
		} }>
			{ children }
		</ThemeContext.Provider>
	)
};

export const useThemeContext = () => useContext( ThemeContext );
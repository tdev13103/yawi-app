'use client';
import React from "react";
import { CacheProvider } from '@emotion/react';
import { useEmotionCache, MantineProvider } from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import { defaultTheme } from '@/helpers/mantineTheme'

export default function RootStyleRegistry( { children }: { children: React.ReactNode } ) {
	const cache = useEmotionCache();
	cache.compat = true;
	
	useServerInsertedHTML( () => (
		<style
			data-emotion={ `${ cache.key } ${ Object.keys( cache.inserted ).join( ' ' ) }` }
			dangerouslySetInnerHTML={ {
				__html : Object.values( cache.inserted ).join( ' ' ),
			} }
		/>
	) );
	
	return (
		<CacheProvider value={ cache }>
			{/* @ts-ignore */ }
			<MantineProvider withGlobalStyles withNormalizeCSS theme={ defaultTheme }>
				{ children }
			</MantineProvider>
		</CacheProvider>
	);
}

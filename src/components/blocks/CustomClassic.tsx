'use client'

import React from 'react';
import { createStyles, rem } from "@mantine/core";

const useStyles = createStyles( ( theme ) => ({
	customClassic : {
		color : theme.colors.main,
		'h1'  : {
			fontSize   : theme.headings.sizes.h1.fontSize,
			lineHeight : theme.headings.sizes.h1.lineHeight,
			fontWeight : 700,
			margin     : `0 0 ${ theme.spacing.md }`,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : rem( 22 ),
			},
		},
		
		'h2' : {
			fontSize   : theme.headings.sizes.h2.fontSize,
			lineHeight : theme.headings.sizes.h2.lineHeight,
			fontWeight : 700,
			margin     : `0 0 ${ theme.spacing.md }`,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : rem( 22 ),
			},
		},
		
		'h3' : {
			fontSize   : theme.headings.sizes.h3.fontSize,
			lineHeight : theme.headings.sizes.h3.lineHeight,
			fontWeight : 700,
			margin     : `0 0 ${ theme.spacing.md }`,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.lg,
			},
		},
		
		'h4' : {
			fontSize   : theme.headings.sizes.h4.fontSize,
			lineHeight : theme.headings.sizes.h4.lineHeight,
			fontWeight : 700,
			margin     : `0 0 ${ theme.spacing.md }`,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
			},
		},
		
		'p' : {
			fontSize   : theme.fontSizes.lg,
			lineHeight : 1.5,
			margin     : `0 0 calc(${ theme.spacing.md } * 2)`,
			
			'&:last-of-type' : {
				margin : 0
			},
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
			},
		},
		
		'ol, ul' : {
			fontSize    : theme.fontSizes.lg,
			lineHeight  : 1.5,
			margin      : `0 0 calc(${ theme.spacing.md } * 2)`,
			paddingLeft : `calc(${ theme.spacing.xl })`,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
			},
		}
	}
}) )

const CustomClassic = ( { data }: any ) => {
	const { classes } = useStyles();
	return (
		<div className={ classes.customClassic } dangerouslySetInnerHTML={ { __html : data } }/>
	)
};

export default CustomClassic;
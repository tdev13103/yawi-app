'use client'

import React, { FC } from 'react';
import { Container, createStyles, rem } from "@mantine/core";

interface CustomWysiwygEditorProps {
	data: {
		custom_wysiwyg_editor: string;
		hide_this_block: string;
		wrap_in_a_container: string;
	}
}

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
		
		'p, div' : {
			fontSize   : theme.fontSizes.lg,
			lineHeight : 1.5,
			margin     : `0 0 calc(${ theme.spacing.md } * 2)`,
			
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

const CustomWysiwygEditor: FC<CustomWysiwygEditorProps> = ( {
	data : {
		custom_wysiwyg_editor,
		hide_this_block,
		wrap_in_a_container
	}
} ) => {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		+wrap_in_a_container
		? <Container size="xl">
				<div className={ classes.customClassic } dangerouslySetInnerHTML={ { __html : custom_wysiwyg_editor } }/>
			</Container>
		: <div className={ classes.customClassic } dangerouslySetInnerHTML={ { __html : custom_wysiwyg_editor } }/>
	)
};

export default CustomWysiwygEditor;
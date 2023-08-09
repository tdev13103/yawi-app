'use client'

import { createStyles, Container, Title, Text, Button, Group, rem } from '@mantine/core';
import NotFoundIcon from "@/components/Icons/404";
import Link from "next/link";
import ButtonIconWhite from "@/components/Icons/ButtonIconWhite";
import React, { useEffect } from "react";

const useStyles = createStyles( ( theme ) => ({
	root : {
		paddingTop    : rem( 140 ),
		paddingBottom : rem( 80 ),
	},
	
	inner : {
		position : 'relative',
	},
	
	image : {
		...theme.fn.cover(),
		opacity : 0.75,
	},
	
	content : {
		paddingTop : rem( 220 ),
		position   : 'relative',
		zIndex     : 1,
		
		[theme.fn.smallerThan( 'sm' )] : {
			paddingTop : rem( 120 ),
		},
	},
	
	title : {
		textAlign  : 'center',
		fontWeight : 900,
		fontSize   : rem( 38 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 32 ),
		},
	},
	
	description : {
		maxWidth     : rem( 540 ),
		margin       : 'auto',
		marginTop    : theme.spacing.xl,
		marginBottom : `calc(${ theme.spacing.xl } * 1.5)`,
	},
	
	btn : {
		backgroundColor : theme.colors.main,
		
		'&:hover' : {
			backgroundColor : theme.colors.cyan6
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			width : '100%',
			
			'.mantine-Button-inner' : {
				justifyContent : 'space-between'
			}
		},
	},
}) );

export default function NotFoundPage() {
	const { classes } = useStyles();
	
	
	useEffect(() => {
		document.body.classList.add('not-found');
	}, []);
	
	return (
		<Container className={ classes.root }>
			<div className={ classes.inner }>
				<NotFoundIcon className={ classes.image }/>
				<div className={ classes.content }>
					<Title className={ classes.title }>Nothing to see here</Title>
					<Text color="dimmed" size="lg" align="center" className={ classes.description }>
						Page you are trying to open does not exist. You may have mistyped the address, or the
						page has been moved to another URL. If you think this is an error contact support.
					</Text>
					<Group position="center">
						<Button rightIcon={ <ButtonIconWhite/> } href="/" component={ Link } className={ classes.btn } size="md">Take
							me back to home page</Button>
					</Group>
				</div>
			</div>
		</Container>
	);
}
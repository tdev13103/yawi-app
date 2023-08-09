'use client'
import {
	createStyles,
	Title,
	Text,
	Card,
	SimpleGrid,
	Container,
	rem, Button,
} from '@mantine/core';
import Link from "next/link";
import React from "react";
import ButtonIconWhite from "@/components/Icons/ButtonIconWhite";

interface OurProcedures {
	data: {
		hide_this_block: string,
		title: string
		btn: {
			url: string,
			title: string
		},
		card_repeater: Card[],
	},
}

interface Card {
	card_icon: string,
	card_title: string,
	card_text: string,
	card_link: {
		url: string,
		title: string
	}
	
}

const useStyles = createStyles( ( theme ) => ({
	ourProcedures : {
		backgroundColor : theme.colors.gray1,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	title : {
		color : theme.colors.main,
		
		[theme.fn.smallerThan( 'md' )] : {
			marginBottom : `calc(${ theme.spacing.md })`,
		},
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	description : {
		maxWidth : 600,
		margin   : 'auto',
	},
	
	cards : {
		gap : `calc(${ theme.spacing.md } * 2)`
	},
	
	card : {
		display         : 'flex',
		flexDirection   : 'column',
		alignItems      : 'flex-start',
		cursor          : 'pointer',
		backgroundColor : theme.colors.main,
		marginTop       : `calc(${ theme.spacing.md } * 2)`,
		padding         : theme.spacing.md,
		
		'&:hover' : {
			backgroundColor : theme.colors.cyan6,
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			margin : 0,
		},
	},
	
	cardTitle : {
		color : theme.colors.white,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.lg
		},
	},
	
	cardDesc : {
		fontSize     : theme.fontSizes.lg,
		marginBottom : theme.spacing.xl,
		marginTop    : `calc(${ theme.spacing.md } / 2)`,
		color        : theme.colors.gray,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md
		},
	},
	
	cardBtn : {
		marginTop       : 'auto',
		color           : theme.colors.white,
		fontSize        : theme.fontSizes.lg,
		backgroundColor : 'transparent',
		padding         : '0 !important',
		height          : 'auto !important',
		
		"&:hover" : {
			backgroundColor : 'transparent',
			color           : theme.colors.white,
		},
	},
}) );

const OurProcedures: React.FC<OurProcedures> = ( {
	data : {
		hide_this_block,
		title,
		card_repeater
	}
} ) => {
	const { classes } = useStyles();
	
	const cards = card_repeater?.map( ( card, key: number ) => (
		<Card key={ key } radius="md" className={ classes.card } component={ Link } href={ card?.card_link?.url }>
			{ card?.card_title && <Title order={ 4 } className={ classes.cardTitle }>{ card.card_title }</Title> }
			{ card?.card_text && <Text className={ classes.cardDesc }>{ card.card_text }</Text> }
			{
				card?.card_link?.url &&
        <Button rightIcon={ <ButtonIconWhite/> } className={ classes.cardBtn }
                styles={ { rightIcon : { marginLeft : rem( 4 ) }, } }>
					{ card?.card_link?.title }
        </Button>
			}
		</Card>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.ourProcedures }>
			<Container size="xl">
				{ title && <Title order={ 3 } className={ classes.title }>{ title }</Title> }
				<SimpleGrid className={ classes.cards } cols={ 3 } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					{ cards }
				</SimpleGrid>
			</Container>
		</div>
	);
}

export default OurProcedures;
'use client'

import React from 'react';
import { Container, createStyles, Group, SimpleGrid, Text } from "@mantine/core";
import Svg from "@/components/Svg";

interface AfterBannerProps {
	data: {
		hide_this_block: string,
		items_repeater: Items[]
	},
}

interface Items {
	item_icon: string
	item_text: string
	item_color: string
}

const useStyles = createStyles( ( theme ) => ({
	afterBanner : {
		backgroundColor : theme.colors.main,
	},
	
	cards : {
		gap        : `calc(${ theme.spacing.md } * 2 )`,
		alignItems : 'center',
		padding    : `${ theme.spacing.xl } 0`,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	card : {
		color    : theme.colors.gray,
		flexWrap : 'nowrap',
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.md } / 2)`,
			paddingBottom : `calc(${ theme.spacing.md } / 2)`,
		},
	},
	
	item : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	itemIcon : {
		path : {
			stroke : "inherit"
		}
	}
}) );

export default function AfterBanner( {
	data : {
		hide_this_block,
		items_repeater
	}
}: AfterBannerProps ) {
	const { classes } = useStyles();
	
	const cards = items_repeater?.map( ( card, index: number ) => (
		<Group key={ index } className={ classes.card } spacing={ 'md' }>
			{ card?.item_icon &&
        <Svg className={ `${ classes.itemIcon }` } style={ { stroke : card?.item_color } }
             svg={ card?.item_icon }/> }
			{ card?.item_text && <Text className={ classes.item }>{ card.item_text }</Text> }
		</Group>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.afterBanner }>
			<Container size="xl">
				<SimpleGrid cols={ 4 } className={ classes.cards } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 2
					},
					{
						maxWidth : 'sm',
						cols     : 1
					}
				] }>
					{ cards }
				</SimpleGrid>
			</Container>
		</div>
	);
};


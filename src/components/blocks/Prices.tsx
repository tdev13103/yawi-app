'use client'
import React from 'react';
import { createStyles, Title, Text, Card, SimpleGrid, Container, rem, List } from '@mantine/core';
import CustomButton from "@/components/Button";
import Svg from "@/components/Svg";

interface PricesProps {
	data: {
		hide_this_block: string,
		prices_title: string
		prices_repeater: ProductItems[]
	},
}

interface ProductItems {
	button_repeater: ButtonProps[]
	description: string
	lists_repeater: ListsItem[]
	price_big: string
	price_small: string
	title: string
}

interface ListsItem {
	icon: string
	text: string
	icon_color: string
}

interface ButtonProps {
	button: {
		title: string
		url: string
	}
	variant: string
	color: string
	icon: string
	icon_color: string
}

const useStyles = createStyles( ( theme ) => ({
	prices : {
		backgroundColor : theme.colors.gray1,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		color           : theme.colors.main,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	title : {
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	cards : {
		gap : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			gap : theme.spacing.md,
		},
	},
	
	card : {
		color        : theme.colors.main,
		borderRadius : `calc(${ theme.radius.sm } * 3)`,
	},
	
	cardTitle : {
		marginBottom : `calc(${ theme.spacing.md } / 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.lg,
		},
	},
	
	cardDescription : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	lists : {
		margin : `calc(${ theme.spacing.lg } * 2) 0`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			margin : `${ theme.fontSizes.md } 0`,
		},
	},
	
	listItem : {
		listStyleType : 'none',
		color         : theme.colors.main,
		
		'span' : {
			display    : 'flex',
			alignItems : 'center',
		}
		
	},
	
	itemText : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	priceSmall : {
		marginBottom : `calc(${ theme.spacing.lg } * 2)`,
	},
	
	icon : {
		marginRight : `calc(${ theme.spacing.md } / 2)`,
	},
}) );
const Prices = ( {
	data : {
		hide_this_block,
		prices_title,
		prices_repeater
	}
}: PricesProps ) => {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.prices }>
			<Container size="xl">
				{
					prices_title &&
          <Title order={ 3 } className={ classes.title }>
						{ prices_title }
          </Title>
				}
				<SimpleGrid cols={ 3 } className={ classes.cards } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 2
					},
					{
						maxWidth : 'sm',
						cols     : 1
					}
				] }>
					{
						prices_repeater?.map( ( card, index: number ) => (
							<Card key={ index } className={ classes.card } padding={ 'xl' }>
								{ card?.title && <Title order={ 4 } className={ classes.cardTitle }>{ card.title }</Title> }
								{ card?.description && <Text className={ classes.cardDescription }>{ card.description }</Text> }
								<List spacing={ 8 } className={ classes.lists }>
									{
										card?.lists_repeater?.map( ( item, key ) => {
											return (
												<List.Item className={ classes.listItem } key={ key }>
													{ item.icon &&
                            <Svg className={ `${ classes.icon }` } style={ { stroke : item.icon_color } }
                                 svg={ item.icon }/> }
													{ item.text && <Text className={ classes.itemText }>{ item.text }</Text> }
												</List.Item>
											)
										} )
									}
								</List>
								{ card?.price_big && <Title order={ 4 } className={ classes.cardTitle }>{ card.price_big }</Title> }
								{ card?.price_small && <Text
                  className={ `${ classes.cardDescription } ${ classes.priceSmall }` }>{ card.price_small }</Text> }
								{ card?.button_repeater && <CustomButton className={ 'full' } button={ card?.button_repeater }/> }
							</Card>
						) )
					}
				</SimpleGrid>
			</Container>
		</div>
	);
};

export default Prices;
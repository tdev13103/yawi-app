'use client'

import { createStyles, Container, Title, Text, rem, Accordion, SimpleGrid, } from '@mantine/core';
import React from "react";
import CustomButton from "@/components/Button";

interface Faq {
	data: {
		faq_accordion_repeater: faqAccordion[]
		button_repeater: ButtonProps[]
		faq_desc: string,
		faq_title: string,
		hide_this_block: string
	}
}

interface faqAccordion {
	item_text: string,
	item_title: string
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
	faq : {
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		backgroundColor : theme.colors.gray1,
		color           : theme.colors.main,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	inner : {
		gap     : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			flexDirection : 'column'
		},
	},
	
	content : {
		marginRight : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			maxWidth    : '100%',
			marginRight : 0,
		},
		[theme.fn.largerThan( 'md' )]  : {
			maxWidth : rem( 478 ),
		},
		[theme.fn.largerThan( 'lg' )]  : {
			maxWidth : rem( 648 ),
		},
	},
	
	title : {
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	desc : {
		fontSize     : theme.fontSizes.lg,
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	accordionText : {
		color    : theme.colors.main,
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
}) );

const Faq = ( {
	data : {
		faq_title,
		faq_desc,
		button_repeater,
		faq_accordion_repeater,
		hide_this_block
	}
}: Faq ) => {
	const {
		classes,
		theme
	} = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ `${ classes.faq }` }>
			<Container size="xl">
				<SimpleGrid cols={ 2 } className={ classes.inner } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					<div className={ classes.content }>
						{ faq_title && <Title order={ 3 } className={ classes.title }>{ faq_title }</Title> }
						{ faq_desc && <Text className={ classes.desc } mt="md">{ faq_desc }</Text> }
						{ button_repeater && <CustomButton button={ button_repeater }/> }
					</div>
					<Accordion variant="separated" styles={ {
						item    : {
							borderBottom : `1px solid ${ theme.colors.main }`,
							borderRadius : 0,
							
							[theme.fn.largerThan( 'md' )] : {
								maxWidth : rem( 648 ),
							},
							
							'.mantine-Accordion-control' : {
								padding : 0,
							},
							
							'.mantine-Accordion-content' : {
								padding   : '0 0 24px',
								marginTop : rem( -8 )
							},
							
							'.mantine-Accordion-label' : {
								fontWeight : 700,
								padding    : `24px 0`,
							},
							
							'&[data-active]' : {
								backgroundColor : 'transparent',
							},
						},
						chevron : {
							color           : '#ffffff',
							backgroundColor : theme.colors.main,
							width           : rem( 32 ),
							height          : rem( 32 ),
							borderRadius    : '50%'
						},
					} }>
						{
							faq_accordion_repeater?.map( ( item, key: number ) => {
								return (
									<Accordion.Item value={ `item-${ key }` } key={ key }>
										<Accordion.Control className={ classes.accordionText }>{ item?.item_title }</Accordion.Control>
										<Accordion.Panel className={ classes.accordionText }>{ item?.item_text }</Accordion.Panel>
									</Accordion.Item>
								)
							} )
						}
					</Accordion>
				</SimpleGrid>
			</Container>
		</div>
	);
}

export default Faq;
'use client'
import { createStyles, Title, Text, Card, SimpleGrid, Container, rem, Box, } from '@mantine/core';
import React from "react";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";

interface OurProcess {
	data: {
		hide_this_block: string,
		title: string
		button_repeater: ButtonProps[]
		desc: string,
		are_items_numbered: string,
		process_repeater: Process[]
	},
}

interface Process {
	process_icon: string
	process_title: string
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
	ourProcess : {
		backgroundColor : theme.colors.main,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		counterReset    : 'section',
		color           : theme.colors.gray,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	title : {
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 32 ),
		},
	},
	
	description : {
		maxWidth : 875,
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	cards : {
		margin : `calc(${ theme.spacing.xs } * 5 ) 0`,
		gap    : `calc(${ theme.spacing.xs } * 5 ) calc(${ theme.spacing.md } * 2 )`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			margin : `calc(${ theme.spacing.md } * 2 ) 0`,
			gap    : `calc(${ theme.spacing.md } * 2 ) 0`,
		},
	},
	
	card : {
		backgroundColor : 'transparent',
		color           : theme.colors.gray,
	},
	
	cardTitle : {
		fontSize  : theme.fontSizes.lg,
		marginTop : `calc(${ theme.spacing.sm } * 2 )`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize  : theme.fontSizes.md,
			marginTop : theme.spacing.md,
		},
	},
	
	iconWrap : {
		position : 'relative',
		width    : rem( 60 ),
		height   : rem( 60 ),
		margin   : 0,
		
		'&.numbered' : {
			counterIncrement : 'section',
			
			'&::after' : {
				position        : 'absolute',
				content         : 'counter(section)',
				display         : 'flex',
				alignItems      : 'center',
				justifyContent  : 'center',
				right           : rem( -12 ),
				top             : rem( 0 ),
				width           : rem( 24 ),
				height          : rem( 24 ),
				color           : theme.colors.main,
				fontSize        : theme.fontSizes.lg,
				borderRadius    : '50%',
				backgroundColor : theme.colors.yellow
			}
		}
	},
	
	processIcon : {
		path : {
			stroke : 'inherit'
		}
	}
}) );

export default function OurProcess( {
	data : {
		title,
		button_repeater,
		desc,
		process_repeater,
		are_items_numbered,
		hide_this_block
	}
}: OurProcess ) {
	const { classes } = useStyles();
	
	const features = process_repeater?.map( ( card, index: number ) => (
		<Card key={ index } radius="md" className={ classes.card } padding={ 0 }>
			{ card?.process_icon &&
        <Box className={ `${ classes.iconWrap } ${ +are_items_numbered ? 'numbered' : '' }` }>
          <Svg className={ `${ classes.processIcon }` } style={ { stroke : card?.icon_color } }
               svg={ card?.process_icon }/>
        </Box>
			}
			{ card?.process_title && <Text fs={ 'lg' } className={ classes.cardTitle }>{ card.process_title }</Text> }
		</Card>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.ourProcess }>
			<Container size="xl">
				{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
				{ desc && <Text className={ classes.description } mt="md">{ desc }</Text> }
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
					{ features }
				</SimpleGrid>
				{ button_repeater && <CustomButton button={ button_repeater }/> }
			</Container>
		</div>
	);
}
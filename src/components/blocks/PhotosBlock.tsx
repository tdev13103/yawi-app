'use client'
import React from 'react';
import { Box, Card, Container, createStyles, Image, rem, SimpleGrid, Title } from "@mantine/core";
import CustomButton from "@/components/Button";

interface PhotosBlockProps {
	data: {
		title: string,
		hide_this_block: string,
		photos_repeater: {
			image: string
		}[],
		button_repeater: ButtonProps[]
	},
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
	photosBlock : {
		backgroundColor : theme.colors.gray1,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		color           : theme.colors.main,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	title : {
		textAlign : 'center',
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	cards : {
		marginTop    : `calc(${ theme.spacing.md } * 2)`,
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		gap          : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			margin : `${ theme.spacing.xl } 0`,
			gap    : theme.spacing.md,
		},
	},
	
	card : {
		borderRadius : `calc(${ theme.radius.sm } * 2)`,
		overflow     : 'hidden',
	},
	
	image : {
		[theme.fn.smallerThan( 'sm' )] : {
			
			figure : {
				height : rem( 262 ),
				
				img : {
					height : '100% !important',
				},
				
				div : {
					height : '100%'
				}
			},
		},
	},
}) );

export default function PhotosBlock( {
	data : {
		photos_repeater,
		hide_this_block,
		title,
		button_repeater
	}
}: PhotosBlockProps ) {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.photosBlock }>
			<Container size="xl">
				{ title && <Title order={ 3 } className={ classes.title }>{ title }</Title> }
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
					{ photos_repeater?.map( ( photo, index: number ) => {
						return (
							<Card className={ classes.card } padding={ 0 } key={ index }>
								<Image className={ classes.image } src={ photo?.image } alt={ 'Full Image' }/>
							</Card>
						)
					} ) }
				</SimpleGrid>
				<Box style={ {
					display        : 'flex',
					justifyContent : 'center'
				} }>
					{ button_repeater && <CustomButton target={'_blank'} button={ button_repeater }/> }
				</Box>
			</Container>
		</div>
	);
}
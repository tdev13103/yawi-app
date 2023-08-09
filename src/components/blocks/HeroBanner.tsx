'use client'

import { createStyles, Container, Title, Text, rem, Group, Box, SimpleGrid } from '@mantine/core';
import React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { usePathname } from "next/navigation";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";

interface HeroBannerProps {
	data: {
		desc: string
		title: string,
		image: string,
		image_mobile: string,
		hide_this_block: string,
		items_repeater: Items[],
		button_repeater: ButtonProps[]
	}
}

interface Items {
	item_text: string,
	item_icon: string,
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
	heroBanner : {
		position           : 'relative',
		backgroundSize     : 'cover',
		backgroundPosition : 'center',
		paddingTop         : `calc(${ theme.spacing.lg } * 10)`,
		paddingBottom      : `calc(${ theme.spacing.lg } * 10)`,
		backgroundColor    : theme.colors.gray1,
		color              : theme.colors.gray,
		
		'&.blog' : {
			color         : theme.colors.main,
			paddingBottom : `calc(${ theme.spacing.lg } * 5)`,
			
			[theme.fn.smallerThan( 'md' )] : {
				paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
			},
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 8)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	title : {
		maxWidth : rem( 648 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			maxWidth : '100%',
			fontSize : theme.headings.sizes.h2.fontSize,
		},
	},
	
	description : {
		fontSize : theme.fontSizes.lg,
		maxWidth : rem( 648 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			maxWidth : '100%',
			fontSize : theme.fontSizes.md,
		},
	},
	
	buttonWrap : {
		gap : theme.spacing.md,
		
		[theme.fn.smallerThan( 'sm' )] : {
			gap : `calc(${ theme.spacing.md } / 2)`,
		},
	},
	
	lists : {
		maxWidth  : rem( 648 ),
		marginTop : theme.spacing.md,
		gap       : theme.spacing.md,
		display   : "grid",
	},
	
	itemText : {
		color      : theme.colors.gray,
		fontSize   : theme.fontSizes.lg,
		lineHeight : 1.5,
		fontWeight : 400,
		
		[theme.fn.smallerThan( 'xs' )] : {
			fontSize : theme.fontSizes.md,
		},
		
		'.home.main &' : {
			color : theme.colors.white,
		},
	},
	
	listItem : {
		gap : `calc(${ theme.spacing.md } / 2)`,
	},
	
	item_icon : {
		path : {
			stroke : 'inherit'
		}
	},
}) );

export default function HeroBanner( {
	data : {
		title,
		desc,
		image,
		image_mobile,
		hide_this_block,
		items_repeater,
		button_repeater,
	}
}: HeroBannerProps ) {
	const { classes } = useStyles();
	const isMobile = useMediaQuery( '(max-width: 820px)' );
	const pathname = usePathname()
	const isBlogPage = pathname === '/blogg';
	const bgImage = isMobile ? image_mobile : image;
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ `${ classes.heroBanner } ${ isBlogPage ? 'blog' : '' }` }
		     style={ {
			     backgroundImage : isBlogPage ? ``
			                                  : `linear-gradient(88deg, rgb(83, 82, 82) 0%, rgb(0 124 126 / 46%) 60%, rgba(255, 255, 255, 0) 100%), url(${ bgImage })`
		     } }>
			<Container size="xl">
				<Box>
					{ title && <Title mb="md" className={ classes.title }>{ title }</Title> }
					{ desc && <Text className={ classes.description } dangerouslySetInnerHTML={ { __html : desc } }/> }
					{
						items_repeater &&
            <SimpleGrid cols={ 2 } className={ classes.lists } breakpoints={ [
							{
								maxWidth : 'sm',
								cols     : 1
							}
						] }>
							{
								items_repeater?.map( ( item, key ) => {
									return (
										<Group noWrap className={ classes.listItem } key={ key }>
											{ item.item_icon &&
                        <Svg className={ `${ classes.item_icon }` } style={ { stroke : item?.icon_color } }
                             svg={ item?.item_icon }/> }
											{ item.item_text && <Text className={ classes.itemText }>{ item.item_text }</Text> }
										</Group>
									)
								} )
							}
            </SimpleGrid>
					}
					<Group className={ classes.buttonWrap } mt={ 32 } noWrap>
						<CustomButton button={ button_repeater } mobileClass={ 'small' }/>
					</Group>
				</Box>
			</Container>
		</div>
	);
}
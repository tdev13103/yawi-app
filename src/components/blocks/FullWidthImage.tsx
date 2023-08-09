'use client'
import React from 'react';
import { Box, createStyles, Group, Image, rem, SimpleGrid, Text, Title } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";

interface FullWidthImage {
	data: {
		image: string,
		image_mobile: string,
		hide_this_block: string,
		button_repeater: ButtonProps[]
		block_group_description: string
		block_group_image: string
		block_group_sub_title: string
		block_group_sub_title_icon: string
		block_group_sub_title_icon_color: string
		block_group_icon_color: string
		block_group_title: string
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
	fullWidthImage : {
		backgroundColor : theme.colors.gray1,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 15)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	image : {
		position  : 'relative',
		overflow  : 'hidden',
		maxHeight : rem( 418 ),
		height    : '100%',
		
		'&::after' : {
			position        : 'absolute',
			content         : '""',
			display         : 'block',
			left            : rem( 0 ),
			top             : rem( 0 ),
			width           : '100%',
			height          : '100%',
			backgroundColor : '#0F2645',
			opacity         : '0.4000000059604645',
		},
		
		
		figure : {
			height : '100%',
			
			'img' : {
				height : '100% !important',
			},
			
			'div' : {
				height : '100%'
			}
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			height : rem( 418 )
		},
	},
	
	innerWrap : {
		maxWidth : rem( 1360 ),
		margin   : '0 auto',
	},
	
	inner : {
		position        : "absolute",
		gap             : `calc(${ theme.spacing.xs } * 3)`,
		padding         : `calc(${ theme.spacing.lg } * 2)`,
		backgroundColor : theme.colors.main,
		borderRadius    : `calc(${ theme.radius.sm } * 2)`,
		overflow        : 'hidden',
		transform       : 'translateY(-50%)',
		margin          : `0 ${ theme.spacing.md }`,
		
		[theme.fn.smallerThan( 'lg' )] : {
			transform : 'translateY(-30%)',
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			position     : 'relative',
			transform    : 'none',
			margin       : 0,
			padding      : `${ theme.spacing.xl } ${ theme.spacing.md }`,
			borderRadius : ` 0 0 calc(${ theme.radius.sm } * 2) calc(${ theme.radius.sm } * 2)`,
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			margin : `${ rem( -180 ) } 0 0`,
		},
	},
	
	content : {
		maxWidth : rem( 616 ),
		width    : '100%',
		color    : theme.colors.white,
		
		[theme.fn.smallerThan( 'sm' )] : {
			maxWidth : '100%',
		},
	},
	
	title : {
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 32 )
		},
	},
	
	subTitle : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	desc : {
		fontSize     : theme.fontSizes.lg,
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	blockIconWrap : {
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center',
		
		[theme.fn.smallerThan( 'md' )] : {
			display : 'none'
		},
	},
	
	icon : {
		path : {
			stroke : 'inherit'
		}
	},
	
	blockIcon : {
		path : {
			stroke : 'inherit'
		}
	},
}) );

export default function FullWidthImage( {
	data : {
		image,
		image_mobile,
		hide_this_block,
		button_repeater,
		block_group_description,
		block_group_image,
		block_group_sub_title,
		block_group_sub_title_icon,
		block_group_title,
		block_group_sub_title_icon_color,
		block_group_icon_color
	}
}: FullWidthImage ) {
	const { classes } = useStyles();
	
	const isMobile = useMediaQuery( '(max-width: 428px)' );
	const bgImage = isMobile ? image_mobile : image;
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.fullWidthImage }>
			{ bgImage && <Image className={ classes.image } src={ bgImage } alt={ 'Full Image' }/> }
			<Box className={ classes.innerWrap }>
				<SimpleGrid cols={ 2 } className={ classes.inner } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					},
				] }>
					<div className={ classes.content }>
						{ block_group_title && <Title order={ 2 } className={ classes.title }>{ block_group_title }</Title> }
						<Group spacing={ 'xs' } mt={ 'md' }>
							{ block_group_sub_title_icon &&
                <Svg className={ `${ classes.icon }` } style={ { stroke : block_group_sub_title_icon_color } }
                     svg={ block_group_sub_title_icon }/> }
							{ block_group_sub_title && <Text className={ classes.subTitle }>{ block_group_sub_title }</Text> }
						</Group>
						{ block_group_description &&
              <Text className={ classes.desc } mt="md"
                    dangerouslySetInnerHTML={ { __html : block_group_description } }/> }
						{ button_repeater && <CustomButton button={ button_repeater }/> }
					</div>
					<Box className={ classes.blockIconWrap }>
						{ block_group_image &&
              <Svg className={ `${ classes.blockIcon }` } style={ { stroke : block_group_icon_color } }
                   svg={ block_group_image }/> }
					</Box>
				</SimpleGrid>
			</Box>
		</div>
	);
}
'use client'

import React from "react";
import {
	createStyles,
	Container,
	Title,
	Group,
	Text,
	List,
	Image,
	rem, SimpleGrid,
} from "@mantine/core";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";
import VideoPlayer from "@/components/VideoPlayer";

interface HomeHeroProps {
	data: {
		group_option: string
		media_option: string
		video_format: string
		button_repeater: ButtonProps[]
		desc: string
		title: string,
		sub_title: string,
		image: string,
		video: string,
		video_file: string,
		hide_this_block: string,
		items_repeater: Items[]
	}
}

interface Items {
	text: string,
	item_text: string,
	icon: string,
	item_description: string,
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
	hero : {
		backgroundColor : theme.colors.gray1,
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	inner : {
		display  : 'flex',
		position : 'relative',
		gap      : `calc(${ theme.spacing.md } * 4)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			flexDirection : 'column-reverse',
			gap           : theme.spacing.md,
		},
	},
	
	content : {
		maxWidth : rem( 616 ),
		width    : '100%',
		color    : theme.colors.main,
		
		[theme.fn.smallerThan( 'lg' )] : {
			maxWidth : '50%',
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			maxWidth : '100%',
		},
	},
	
	title : {
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 32 ),
		},
	},
	
	subTitle : {
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	desc : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
		
		'a' : {
			color : theme.colors.main,
		},
	},
	
	itemText : {
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	text : {
		fontSize   : theme.fontSizes.lg,
		lineHeight : 1.5,
		fontWeight : 400,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	itemDescription : {
		fontSize : theme.fontSizes.lg,
	},
	
	image : {
		'figure' : {
			position     : 'relative',
			overflow     : 'hidden',
			borderRadius : `calc(${ theme.radius.sm } * 2)`,
			
			'&::after' : {
				position        : 'absolute',
				content         : '""',
				display         : 'block',
				left            : rem( 0 ),
				top             : rem( 0 ),
				width           : '100%',
				height          : '100%',
				backgroundColor : theme.colors.main,
				opacity         : '0.11999999731779099',
			},
			
			[theme.fn.smallerThan( 'md' )] : {
				height : rem( 408 ),
			},
			
			[theme.fn.smallerThan( 'sm' )] : {
				height : rem( 220 ),
			},
			
			'img' : {
				height : '100% !important',
			},
			
			'div' : {
				height : '100%'
			}
		},
	},
	
	lists : {
		maxWidth  : rem( 648 ),
		marginTop : theme.spacing.md,
		gap       : theme.spacing.md,
		display   : "grid",
	},
	
	list : {
		gap   : `calc(${ theme.spacing.md } / 2)`,
		color : theme.colors.main,
	},
	
	listItem : {
		listStyleType : 'none',
		color         : theme.colors.main,
		
		'span' : {
			display : 'flex',
		}
		
	},
	
	icon : {
		marginRight : `calc(${ theme.spacing.md } / 2)`,
		path        : {
			stroke : "inherit"
		}
		
	},
	
	itemGroup : {
		flexDirection : 'column',
		alignItems    : 'flex-start'
	},
}) );

const HomeHero: React.FC<HomeHeroProps> = ( {
	data : {
		title,
		desc,
		button_repeater,
		items_repeater,
		image,
		hide_this_block,
		group_option,
		media_option,
		video_format,
		video,
		video_file,
		sub_title
	}
} ) => {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	const groupOptionTrue = items_repeater && <SimpleGrid cols={ 2 } className={ classes.lists } breakpoints={ [
		{
			maxWidth : 'sm',
			cols     : 1
		}
	] }>
		{
			items_repeater?.map( ( item, key ) => {
				return (
					<Group noWrap className={ classes.list } key={ key }>
						{ item.icon &&
              <Svg className={ `${ classes.icon }` } style={ { stroke : item?.icon_color } }
                   svg={ item?.icon }/> }
						{ item.text && <Text className={ classes.itemDescription }>{ item.text }</Text> }
					</Group>
				)
			} )
		}
  </SimpleGrid>
	
	const groupOptionFalse = items_repeater?.map( ( item, key ) => {
		return (
			<List.Item className={ classes.listItem } key={ key }>
				{ item.icon &&
          <Svg className={ `${ classes.icon }` } style={ { stroke : item?.icon_color } }
               svg={ item?.icon }/> }
				<Group className={ classes.itemGroup } spacing={ 0 }>
					<Title order={ 5 } className={ classes.itemText }>{ item.item_text }</Title>
					<Text className={ classes.itemDescription }>{ item.item_description }</Text>
				</Group>
			</List.Item>
		)
	} )
	
	return (
		<div className={ `${ classes.hero }` }>
			<Container size="xl">
				<div className={ classes.inner }>
					<div className={ classes.content }>
						{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
						{
							sub_title &&
              <Title order={ 5 } className={ classes.subTitle } mt="md">
								{ sub_title }
              </Title>
						}
						{ desc && <Text className={ classes.desc } mt="md" dangerouslySetInnerHTML={ { __html : desc } }/> }
						<List mt="md" spacing="md">{ +group_option ? groupOptionTrue : groupOptionFalse }</List>
						{
							button_repeater &&
              <Group spacing={ 'md' } mt={ 32 }>
                <CustomButton button={ button_repeater }/>
              </Group>
						}
					</div>
					{
						+media_option
						? image && <Image src={ image } alt={ 'Hero Image' } className={ `${ classes.image }` }/>
						: <VideoPlayer source={ +video_format ? video_file : video }/>
					}
				</div>
			</Container>
		</div>
	);
}

export default HomeHero;
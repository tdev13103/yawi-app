'use client'

import React from "react";
import {
	createStyles,
	Container,
	Title,
	Group,
	Text,
	rem, List, Box,
} from "@mantine/core";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";

interface ContentWithListsProps {
	data: {
		button_repeater: ButtonProps[]
		content: string,
		title: string,
		items_repeater: Items[],
		hide_this_block: string,
	}
}

interface Items {
	title: string,
	icon: string,
	description: string,
	icon_bg_color: string
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
	contentWithLists : {
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		backgroundColor : theme.colors.main,
		color           : theme.colors.gray,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	inner : {
		display    : 'flex',
		alignItems : 'center',
		position   : 'relative',
		gap        : `calc(${ theme.spacing.md } * 4)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			flexDirection : 'column',
			gap           : `calc(${ theme.spacing.lg } * 2)`
		},
	},
	
	content : {
		maxWidth : rem( 632 ),
		width    : '100%',
		
		[theme.fn.smallerThan( 'md' )] : {
			maxWidth : '100%',
		},
	},
	
	title : {
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 32 ),
		},
	},
	
	desc : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
		
		a : {
			color : theme.colors.gray,
		},
		
		p : {
			margin : `${ theme.spacing.md } 0 0`
		}
	},
	
	itemText : {
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.lg,
		},
	},
	
	itemDescription : {
		fontSize : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	listItem : {
		listStyleType : 'none',
		color         : theme.colors.gray,
		
		'span' : {
			display : 'flex',
		}
		
	},
	
	iconWrap : {
		width          : rem( 56 ),
		height         : rem( 56 ),
		padding        : `calc(${ theme.spacing.md } /2)`,
		borderRadius   : rem( 6 ),
		display        : 'flex',
		alignItems     : 'center',
		justifyContent : 'center'
	},
	
	icon : {
		path : {
			stroke : 'inherit',
		}
	},
	
	itemGroup : {
		marginLeft    : theme.spacing.md,
		flexDirection : 'column',
		alignItems    : 'flex-start',
		gap           : `calc(${ theme.spacing.md } / 2)`
	},
}) );

const ContentWithLists: React.FC<ContentWithListsProps> = ( {
	data : {
		title,
		button_repeater,
		content,
		items_repeater,
		hide_this_block,
	}
} ) => {
	const { classes } = useStyles();
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ `${ classes.contentWithLists }` }>
			<Container size="xl">
				<div className={ classes.inner }>
					<div className={ classes.content }>
						{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
						<Text className={ classes.desc } mt="md" dangerouslySetInnerHTML={ { __html : content } }/>
						<Group mt={ 32 }>{ button_repeater && <CustomButton button={ button_repeater }/> }</Group>
					</div>
					<List spacing="md">
						{
							items_repeater?.map( ( item, key ) => {
								return (
									<List.Item className={ classes.listItem } key={ key }>
										{
											item?.icon &&
                      <Box className={ classes.iconWrap } bg={ `${ item?.icon_bg_color }` }>
                        <Svg className={ `${ classes.icon }` } style={ { stroke : item?.icon_color, } }
                             svg={ item?.icon }/>
                      </Box>
										}
										<Group className={ classes.itemGroup }>
											<Title order={ 4 } className={ classes.itemText }>{ item.title }</Title>
											<Text className={ classes.itemDescription }>{ item.description }</Text>
										</Group>
									</List.Item>
								)
							} )
						}
					</List>
				</div>
			</Container>
		</div>
	);
}

export default ContentWithLists;
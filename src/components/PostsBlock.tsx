'use client'
import {
	createStyles,
	SimpleGrid,
	Card,
	Image,
	Text,
	Container,
	Group,
	Badge,
	rem,
	Title, Button, Select,
} from '@mantine/core';
import Link from "next/link";
import { convertDate } from "@/helpers";
import React, { useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import ButtonIconWhite from "@/components/Icons/ButtonIconWhite";

interface SinglePost {
	singlePostContent: string;
}

interface Author {
	node: {
		name: string;
	};
}

interface Category {
	categoryId: string;
	name: string;
	slug: string;
}

interface FeaturedImage {
	node: {
		sourceUrl: string;
		title: string;
	};
}

interface Post {
	acf_single_post: SinglePost;
	author: Author;
	categories: {
		nodes: Category[];
	};
	date: string;
	excerpt: string;
	featuredImage: FeaturedImage;
	modified: string;
	postId: number;
	slug: string;
	title: string;
}

interface Posts {
	posts: Post[];
}

const useStyles = createStyles( ( theme ) => ({
	postsBlock : {
		paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		backgroundColor : theme.colors.gray1,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	filtrationWrap : {
		marginBottom    : `calc(${ theme.spacing.md } * 2)`,
		backgroundColor : theme.colors.white,
		width           : 'max-content',
		padding         : `calc(${ theme.spacing.md } / 2) ${ theme.spacing.md }`,
		borderRadius    : `calc(${ theme.radius.sm } * 2)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			width : '100%'
		},
	},
	
	filterBtn : {
		position        : 'relative',
		backgroundColor : 'transparent',
		color           : theme.colors.main,
		fontSize        : theme.fontSizes.lg,
		padding         : `calc(${ theme.spacing.md } / 2) ${ theme.spacing.md } !important`,
		
		'&:hover' : {
			backgroundColor : theme.colors.main,
			color           : theme.colors.white,
		},
		
		'&:not(:last-of-type):after' : {
			position        : 'absolute',
			content         : '""',
			display         : 'block',
			right           : rem( -13 ),
			top             : rem( 0 ),
			width           : rem( 1 ),
			height          : '100%',
			backgroundColor : theme.colors.main,
		},
	},
	
	filterBtnMobile : {
		marginBottom : `calc(${ theme.spacing.lg } * 2)`,
		border       : `${ rem( 1 ) } solid ${ theme.colors.main }`,
		borderRadius : `calc(${ theme.radius.sm } * 2)`,
		outline      : 'none',
		overflow     : 'hidden',
		
		input : {
			color  : theme.colors.main,
			border : 'none'
		}
	},
	
	activeCategory : {
		backgroundColor : theme.colors.main,
		color           : theme.colors.white,
	},
	
	cards : {
		gap : `calc(${ theme.spacing.md } * 2)`
	},
	
	card : {
		borderRadius : `calc(${ theme.radius.sm } * 2)`,
		overflow     : 'hidden',
		border       : `${ rem( 1 ) } solid ${ theme.colors.gray2 }`,
		transition   : 'transform 150ms ease, box-shadow 150ms ease',
		
		'&:hover' : {
			transform : 'scale(1.01)',
			boxShadow : theme.shadows.md,
		},
	},
	
	childCard : {
		display       : 'flex',
		flexDirection : "column",
		alignItems    : 'flex-start',
		height        : 'calc(100% - 260px)'
	},
	
	imageWrap : {
		position : 'relative'
	},
	
	image : {
		'figure' : {
			position : 'relative',
			overflow : 'hidden',
			
			'&::after' : {
				position        : 'absolute',
				content         : '""',
				display         : 'block',
				left            : rem( 0 ),
				top             : rem( 0 ),
				width           : '100%',
				height          : '100%',
				backgroundColor : theme.colors.blue,
				opacity         : '0.4000000059604645',
			},
		}
	},
	
	categories : {
		position        : 'absolute',
		bottom          : rem( 16 ),
		left            : rem( 16 ),
		backgroundColor : theme.colors.yellow2,
		textTransform   : 'initial',
		color           : theme.colors.main,
		fontSize        : theme.fontSizes.md,
		fontWeight      : 400,
		height          : rem( 37 ),
		padding         : `calc(${ theme.spacing.md } / 2) ${ theme.spacing.md }`
	},
	
	date : {
		color        : theme.colors.gray2,
		fontSize     : theme.fontSizes.lg,
		marginBottom : `calc(${ theme.spacing.md } / 2)`
	},
	
	title : {
		color        : theme.colors.main,
		marginBottom : `calc(${ theme.spacing.md } / 2)`
	},
	
	excerpt : {
		color        : theme.colors.main,
		fontSize     : theme.fontSizes.lg,
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		
		p : {
			margin : 0
		},
	},
	
	control : {
		fontWeight      : 600,
		height          : rem( 48 ),
		lineHeight      : 1.5,
		borderRadius    : `calc(${ theme.radius.sm } * 2)`,
		fontSize        : theme.fontSizes.lg,
		padding         : `${ rem( 1 ) } ${ rem( 14 ) } ${ rem( 1 ) } ${ rem( 26 ) }`,
		letterSpacing   : rem( 0.18 ),
		backgroundColor : theme.colors.main,
		width           : '100%',
		
		'.mantine-Button-inner' : {
			justifyContent : 'space-between'
		},
		
		'&:hover' : {
			backgroundColor : theme.colors.cyan6
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize      : theme.fontSizes.md,
			height        : rem( 42 ),
			padding       : `${ rem( 1 ) } ${ rem( 8 ) } ${ rem( 1 ) } ${ rem( 22 ) } `,
			letterSpacing : rem( 0.16 ),
			
			svg : {
				height : rem( 18 ),
				width  : rem( 18 ),
			}
		},
	},
}) );

export default function PostsBlock( { posts }: Posts ) {
	const { classes } = useStyles();
	const [selectedCategory, setSelectedCategory] = useState( "Visa allt" );
	const isMobile = useMediaQuery( '(max-width: 820px)' );
	
	const uniqueCategories = Array.from(
		new Set( posts.flatMap( post => post.categories.nodes?.map( category => category.name ) ) )
	);
	uniqueCategories.unshift( "Visa allt" );
	
	const handleCategoryClick = ( category: string ) => {
		setSelectedCategory( category );
	};
	
	const filteredPosts = posts?.filter( post => {
		if ( selectedCategory === "Visa allt" ) {
			return true;
		}
		return post.categories.nodes.some( category => category.name === selectedCategory );
	} );
	
	const cards = filteredPosts?.map( ( article, index: number ) => (
		<Card key={ index } className={ classes.card } component={ Link } href={ `blogg/${ article?.slug }` } padding={ 0 }>
			<Group className={ classes.imageWrap }>
				{
					article?.featuredImage?.node?.sourceUrl &&
          <Image className={ classes.image } src={ article.featuredImage?.node?.sourceUrl }
                 alt={ article?.featuredImage?.node?.title } height={ 260 }/>
				}
				{
					article?.categories?.nodes?.map( ( cat, index: number ) => {
						return (
							<Badge key={ index } className={ classes.categories }>
								{ cat?.name }
							</Badge>
						)
					} )
				}
			</Group>
			<Card.Section className={ classes.childCard } p={ 'xl' }>
				{
					article?.date &&
          <Text className={ classes.date }>
						{ convertDate( article.date ) }
          </Text>
				}
				{
					article?.title &&
          <Title order={ 4 } className={ classes.title }>
						{ article.title }
          </Title>
				}
				{
					article?.excerpt &&
          <Text className={ classes.excerpt } dangerouslySetInnerHTML={ { __html : article.excerpt } }/>
				}
				<Button rightIcon={ <ButtonIconWhite/> } className={ classes.control }>Läs nyhet</Button>
			</Card.Section>
		</Card>
	) );
	
	const categoriesSelect = (
		<Select
			className={ classes.filterBtnMobile }
			value={ selectedCategory }
			size="lg"
			rightSection={ <IconChevronDown color={ '#007C7E' } size="1.5rem"/> }
			onChange={ ( value: string ) => handleCategoryClick( value ) }
			data={ uniqueCategories?.map( ( category ) => ({
				value : category,
				label : category
			}) ) }
			styles={ ( theme ) => ({
				item : {
					color : theme.colors.main,
					
					// applies styles to selected item
					'&[data-selected]' : {
						
						'&, &:hover' : {
							backgroundColor : theme.colors.main,
							color           : theme.colors.white,
						},
					},
				},
			}) }
		/>
	);
	
	const categories = uniqueCategories?.map( ( category, index: number ) => {
		return (
			<Button className={ `${ classes.filterBtn } ${ selectedCategory === category ? classes.activeCategory : '' }` }
			        key={ index }
			        onClick={ () => handleCategoryClick( category ) }>{ category }</Button>
		)
	} )
	
	return (
		<div className={ classes.postsBlock }>
			<Container size={ 'xl' }>
				{
					isMobile
					? categoriesSelect
					: <Group spacing={ 'xl' } className={ classes.filtrationWrap }>
						{ categories }
					</Group>
				}
				<SimpleGrid className={ classes.cards } cols={ 3 } breakpoints={ [
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
}
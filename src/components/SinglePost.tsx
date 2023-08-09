'use client'

import React from 'react';
import { Container, createStyles, Image, rem, Text, Title } from "@mantine/core";
import { convertDate } from "@/helpers";
import CustomClassic from "@/components/blocks/CustomClassic";
import PageBlocks from "@/components/PageBlocks";
import { formattingBlocks } from "@/helpers/formattingBlocks";

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
	blocks: Block[]
}

interface Block {
	attributesJSON: string,
	blockImage: BlockImage[]
}

interface BlockImage {
	json: {
		url: string,
		id: string,
		name: string
	}
}

const useStyles = createStyles( ( theme ) => ({
	post : {
		paddingTop      : `calc(${ theme.spacing.lg } * 10)`,
		paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
		backgroundColor : theme.colors.gray1,
		
		[theme.fn.smallerThan( 'md' )] : {
			paddingTop    : `calc(${ theme.spacing.lg } * 8)`,
			paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
		},
	},
	
	image : {
		borderRadius : `calc(${ theme.radius.sm } * 2)`,
		overflow     : 'hidden',
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		
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
				opacity         : '0.23000000417232513',
			},
		}
	},
	
	title : {
		color        : theme.colors.main,
		marginBottom : theme.spacing.md,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 32 ),
		},
	},
	
	date : {
		color        : theme.colors.gray2,
		fontSize     : theme.fontSizes.lg,
		marginBottom : `calc(${ theme.spacing.md } * 2)`
	},
}) );

const SinglePost = ( { post }: { post: Post } ) => {
	const { classes } = useStyles();
	const transformedBlocks = (post?.blocks || [])?.map( ( block ) => formattingBlocks( block ) );
	return (
		<>
			<div className={ classes.post }>
				<Container size={ 'md' }>
					{
						post?.featuredImage?.node?.sourceUrl &&
            <Image className={ classes.image } src={ post?.featuredImage?.node?.sourceUrl }
                   alt={ post?.featuredImage?.node?.title } height={ 359 }/>
					}
					
					{
						post.title &&
            <Title className={ classes.title } order={ 1 }>
							{ post.title }
            </Title>
					}
					{
						post.date &&
            <Text className={ classes.date }>
							{ convertDate( post.date ) }
            </Text>
					}
					{
						post?.acf_single_post?.singlePostContent &&
            <CustomClassic data={ post?.acf_single_post?.singlePostContent }/>
					}
				</Container>
			</div>
			{
				transformedBlocks.length &&
        <PageBlocks blocks={ transformedBlocks }/>
			}
		</>
	);
};

export default SinglePost;
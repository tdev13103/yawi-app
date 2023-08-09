'use client'
import { createStyles, Title, Text, Card, SimpleGrid, Container, Group, rem, } from '@mantine/core';
import Stars from "@/components/Icons/Stars";

interface Testimonials {
	data: {
		description: string
		title: string,
		hide_this_block: string,
		testimonials_repeater: Testimonial[]
	}
}

interface Testimonial {
	author: string
	opinion: string
	stars_amount: string
}

const useStyles = createStyles( ( theme ) => ({
	testimonials : {
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
		textAlign : 'center',
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : rem( 22 ),
		},
	},
	
	description : {
		textAlign : 'center',
		color     : theme.colors.blue8,
		fontSize  : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	cards : {
		margin : `calc(${ theme.spacing.md } * 2 ) 0`,
		gap    : `calc(${ theme.spacing.md } * 2 )`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			margin : `calc(${ theme.spacing.xl }) 0 0`,
			gap    : theme.spacing.md,
		},
	},
	
	card : {
		color         : theme.colors.main,
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'flex-start',
	},
	
	cardDescription : {
		fontSize     : theme.fontSizes.lg,
		marginBottom : `calc(${ theme.spacing.xs } * 5 )`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize     : theme.fontSizes.md,
			marginBottom : theme.spacing.xl,
		},
	},
	
	cardAuthor : {
		margin : `auto 0 ${ theme.spacing.md }`,
	},
}) );

export default function Testimonials( {
	data : {
		description,
		title,
		testimonials_repeater,
		hide_this_block
	}
}: Testimonials ) {
	const { classes } = useStyles();
	
	const cards = testimonials_repeater?.map( ( card, key: number ) => (
		<Card className={ classes.card } key={ key } radius="md" padding="md">
			{
				card?.opinion &&
        <Text className={ classes.cardDescription }>
					{ card.opinion }
        </Text>
			}
			{
				card.author &&
        <Title order={ 5 } className={ classes.cardAuthor }>
					{ card.author }
        </Title>
			}
			<Group spacing={ 0 }>
				{
					Array.from( { length : +card.stars_amount }, ( _, index ) => (
						<Stars key={ index }/>
					) )
				}
			</Group>
		</Card>
	) );
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ classes.testimonials }>
			<Container size="xl">
				{
					title &&
          <Title order={ 3 } className={ classes.title }>
						{ title }
          </Title>
				}
				{
					description &&
          <Text className={ classes.description } mt="md">
						{ description }
          </Text>
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
					{ cards }
				</SimpleGrid>
			</Container>
		</div>
	);
}
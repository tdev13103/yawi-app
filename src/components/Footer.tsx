'use client'

import { createStyles, Text, Container, Group, rem, Image, SimpleGrid, Box } from '@mantine/core';
import { useThemeContext } from "@/context/theme.context";
import Link from "next/link";

interface FooterLink {
	link: string;
	label: string;
	target?: string;
	links?: FooterLink[];
	classes?: string
}

interface FooterActionProps {
	links?: FooterLink[];
}

const useStyles = createStyles( ( theme ) => ({
	footer : {
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
		marginTop : `calc(${ theme.spacing.lg } * 2)`
	},
	
	socialWrap : {
		maxWidth : rem( 534 )
	},
	
	description : {
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		fontSize     : theme.fontSizes.lg,
		
		[theme.fn.smallerThan( 'sm' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	social : {},
	
	groups : {
		display : 'flex',
		
		[theme.fn.smallerThan( 'sm' )] : {
			flexDirection : 'column',
			gap           : theme.spacing.xl,
		},
	},
	
	wrapper : {
		width : rem( 194 ),
	},
	
	link : {
		display        : 'block',
		color          : theme.colors.gray,
		fontSize       : theme.fontSizes.lg,
		textDecoration : 'none',
		
		'&.contact' : {
			textDecoration : 'underline',
			
			'&:hover' : {
				textDecoration : 'none',
			},
		},
		
		'&.address' : {
			width     : rem( 150 ),
			marginTop : theme.spacing.xl,
		},
		
		'&:hover' : {
			textDecoration : 'underline',
		},
	},
	
	title : {
		fontSize     : theme.fontSizes.lg,
		fontWeight   : 700,
		lineHeight   : 1.50,
		marginBottom : theme.spacing.md,
	},
	
	afterFooter : {
		marginTop  : `calc(${ theme.spacing.lg } * 2)`,
		alignItems : 'flex-end',
		
		[theme.fn.smallerThan( 'sm' )] : {
			flexDirection : 'column',
		},
	},
	
	footerImages : {
		gap : `calc(${ theme.spacing.md } * 2)`,
	},
	
	footerCopyright : {
		fontSize : theme.fontSizes.lg,
	},
	
	privacyWrap : {
		gap : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			gap           : theme.spacing.md,
			flexDirection : 'column',
			alignItems    : 'flex-start',
		},
	},
	
	privacy : {
		fontSize       : theme.fontSizes.lg,
		color          : theme.colors.gray,
		textDecoration : 'none',
		
		'&:hover' : {
			textDecoration : 'underline',
		},
	},
}) );

export function FooterAction( { links }: FooterActionProps ) {
	const { classes } = useStyles();
	const { themeSettings } = useThemeContext();
	const {
		footerAddress,
		footerCopyright,
		footerLabelMenu1,
		footerLabelMenu2,
		footerLabelMenu3,
		footerLogo : {
			title     : footerLogoTitle,
			sourceUrl : footerLogoUrl,
		},
		footerSocials,
		footerDescription,
		footerEmail,
		footerImages,
		footerPhone,
		privacyLink
	} = themeSettings;
	const titles = [footerLabelMenu1, footerLabelMenu2, footerLabelMenu3];
	
	const updatedData = links?.map( ( item, index ) => ({
		...item,
		title : titles[index] || ''
	}) );
	if ( updatedData ) {
		(updatedData[0] as any).links = [
			{
				link    : `tel:${ footerPhone }`,
				label   : footerPhone,
				classes : 'contact'
			},
			{
				link    : `mailto:${ footerEmail }`,
				label   : footerEmail,
				classes : 'contact'
			},
			{
				link    : `https://www.google.com/maps/search/?api=1&query=${ footerAddress }`,
				label   : footerAddress,
				target  : '_blank',
				classes : 'address'
			},
		];
	}
	const groups = updatedData?.map( ( group, key: number ) => {
		const links = group?.links?.map( ( link, index: number ) => {
			return (
				<Link key={ index } className={ `${ classes.link } ${ link?.classes }` } href={ link?.link }
				      target={ link?.target }>
					{ link?.label }
				</Link>
			)
		} );
		
		return (
			<div className={ classes.wrapper } key={ key }>
				<Text className={ classes.title }>{ group?.title }</Text>
				{ links }
			</div>
		);
	} );
	
	return (
		<footer className={ classes.footer }>
			<Container size="xl">
				{
					footerLogoUrl &&
          <Image src={ footerLogoUrl } alt={ footerLogoTitle } width={ 105 }
                 height={ 50 }/>
				}
				<SimpleGrid cols={ 2 } spacing={ rem( 32 ) } className={ classes.inner } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					<Box className={ classes.socialWrap }>
						{
							footerDescription &&
              <Text className={ classes.description }
                    dangerouslySetInnerHTML={ { __html : footerDescription } }/>
						}
						<Group spacing={ 'xs' } className={ classes.social }>
							{
								footerSocials?.map( ( social, key: number ) => {
									return (
										<a key={ key } target={ '_blank' } href={ social?.socialLink }>
											<Image width={ 40 } height={ 40 } src={ social?.socialIcon?.sourceUrl }
											       alt={ social?.socialIcon?.title }/>
										</a>
									)
								} )
							}
						</Group>
					</Box>
					<div className={ classes.groups }>{ groups }</div>
				</SimpleGrid>
			</Container>
			<Container size="xl">
				<SimpleGrid cols={ 2 } spacing={ rem( 32 ) } className={ classes.afterFooter } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					<Group className={ classes.footerImages }>
						{
							footerImages?.map( ( item, key: number ) => {
								return (
									<Image key={ key } src={ item?.image?.sourceUrl } width={ 'auto' } height={ 'auto' }
									       alt={ item?.image?.title }/>
								)
							} )
						}
					</Group>
					<Group className={ classes.privacyWrap }>
						{
							footerCopyright &&
              <Text className={ classes.footerCopyright }>
								{ footerCopyright }
              </Text>
						}
						{
							privacyLink &&
              <Link className={ classes.privacy } href={ privacyLink?.slug }>{ privacyLink?.title }</Link>
						}
					</Group>
				</SimpleGrid>
			</Container>
		</footer>
	);
}
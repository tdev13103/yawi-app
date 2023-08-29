'use client'

import {
	createStyles,
	Menu,
	Center,
	Header,
	Container,
	Group,
	Burger,
	Image,
	rem, Box,
} from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import { useThemeContext } from "@/context/theme.context";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import { modifyLinks } from "@/helpers";
import CustomButton from "@/components/Button";

interface HeaderLink {
	link: string;
	label: string;
	links?: HeaderLink[];
}

interface HeaderActionProps {
	links?: HeaderLink[];
}

const useStyles = createStyles( ( theme ) => ({
	header : {
		position        : 'fixed',
		padding         : `${ theme.spacing.xl } 0`,
		backgroundColor : 'transparent',
		
		'&.scrolled, .not-found &' : {
			backgroundColor : theme.colors.main
		},
		
		'&.blog.scrolled' : {
			backgroundColor : theme.colors.gray
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			padding : `calc(${ theme.spacing.md } * 2) 0`,
			border  : 'none',
		},
	},
	
	headerMobile : {
		
		[theme.fn.smallerThan( 'md' )] : {
			width          : '100%',
			justifyContent : 'space-between',
			flexWrap       : 'nowrap'
		},
	},
	
	inner : {
		display        : 'flex',
		justifyContent : 'space-between',
		alignItems     : 'center',
	},
	
	links : {
		gap : `calc(${ theme.spacing.md } * 2) `,
		
		[theme.fn.smallerThan( 'md' )] : {
			display : 'none',
		},
	},
	
	burger : {
		position : 'relative',
		zIndex   : 1000,
		
		[theme.fn.largerThan( 'md' )] : {
			display : 'none',
		},
	},
	
	link : {
		display        : 'block',
		lineHeight     : 1,
		padding        : `${ rem( 8 ) } ${ rem( 12 ) }`,
		borderRadius   : theme.radius.sm,
		textDecoration : 'none',
		color          : theme.colors.gray,
		fontSize       : theme.headings.sizes.h4.fontSize,
		fontWeight     : 600,
		
		'.scrolled &, .not-found &' : {
			'&:hover, &.active' : {
				color           : theme.colors.main,
				backgroundColor : theme.colors.gray,
			}
		},
		
		'.blog &' : {
			color : theme.colors.main,
			
			'&:hover, &.active' : {
				backgroundColor : theme.colors.gray,
			}
		},
		
		'.blog.scrolled &' : {
			'&:hover, &.active' : {
				backgroundColor : theme.colors.gray1,
			}
		},
		
		'.blog.open &' : {
			color : theme.colors.gray,
		},
		
		'&.child' : {
			'&:hover' : {
				color           : theme.colors.main,
				backgroundColor : theme.colors.gray,
			},
			
			'.blog &' : {
				color : theme.colors.gray,
				
				'&:hover, &.active' : {
					color           : theme.colors.main,
					backgroundColor : theme.colors.gray,
				}
			},
		},
		
		[theme.fn.largerThan( 'md' )] : {
			fontSize : theme.fontSizes.md,
			padding  : `${ rem( 10 ) } ${ rem( 12 ) }`,
			
			'&:hover, &.active' : {
				backgroundColor : theme.colors.main,
			},
		},
	},
	
	childLink : {
		padding : 0
	},
	
	linkLabel : {
		marginRight : rem( 5 ),
		fontSize    : theme.headings.sizes.h4.fontSize,
		
		[theme.fn.largerThan( 'md' )] : {
			fontSize : theme.fontSizes.md,
		},
	},
	
	burgerWrap : {
		display    : 'flex',
		alignItems : 'center',
		gap        : `calc(${ theme.spacing.md } * 2) `,
	},
	
	menuContainer : {
		position        : 'fixed',
		top             : 0,
		left            : 0,
		width           : '100%',
		height          : '100%',
		backgroundColor : theme.colors.main,
		zIndex          : 999,
		display         : 'flex',
		flexDirection   : 'column',
		paddingTop      : rem( 150 )
	},
	
	mobileLinks : {
		display       : 'flex',
		flexDirection : 'column',
	},
	
	mobileLinksChild : {
		display       : 'flex',
		flexDirection : 'column',
		alignItems    : 'flex-start',
		
		a : {
			fontSize    : theme.fontSizes.lg,
			paddingLeft : theme.spacing.xl,
		}
	},
	
	itemWithChildWrap : {
		position : 'relative',
	},
	
	itemIcon : {
		position : 'absolute',
		right    : rem( -20 ),
		
		'&.open' : {
			transform : 'rotate(-180deg)'
		}
	},
	
}) );

export function HeaderAction( { links }: HeaderActionProps ) {
	const {
		classes,
		theme
	} = useStyles();
	const {
		themeSettings : {
			headerLogo,
			headerLogoHomePage,
			buttonRepeater
		}
	} = useThemeContext();
	
	const [isOpen, setIsOpen] = useState( false );
	const [isMenuOpen, setIsMenuOpen] = useState( false );
	const [openItems, setOpenItems] = useState<string[]>( [] );
	const [scrolled, setScrolled] = useState( false );
	
	const isMobile = useMediaQuery( '(max-width: 820px)' );
	const pathname = usePathname()
	const isBlogPage = pathname.includes( '/blogg' );
	const logo = isBlogPage ? headerLogoHomePage : headerLogo;
	
	const handleLinkClick = ( link: string ) => {
		setOpenItems( ( prevOpenItems ) =>
			prevOpenItems.includes( link ) ? prevOpenItems?.filter( ( item ) => item !== link ) : [...prevOpenItems, link]
		);
	};
	const handleBurgerClick = () => {
		setIsOpen( !isOpen );
		setIsMenuOpen( !isMenuOpen );
		setOpenItems( [] );
	};
	
	useEffect( () => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 0;
			setScrolled( isScrolled );
		};
		
		handleScroll();
		
		window.addEventListener( 'scroll', handleScroll );
		
		return () => {
			window.removeEventListener( 'scroll', handleScroll );
		};
	}, [] );
	
	useEffect( () => {
		document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
	}, [isMenuOpen] );
	
	useEffect( () => {
		document.body.classList.remove( 'not-found' );
	}, [pathname] );
	
	const renderMobileLinks = ( links: HeaderLink[] ) => {
		return links.map( ( link, index: number ) => {
			const hasChildren = link?.links && link?.links.length > 0;
			const isOpen = openItems.includes( link?.link );
			
			if ( hasChildren ) {
				return (
					<Box key={ index }>
						<Group className={ classes.itemWithChildWrap }>
							{
								link?.link &&
                <Link href={ link.link } className={ classes.link } onClick={ () => handleBurgerClick() }>
                  <span className={ classes.linkLabel }>{ link.label }</span>
                </Link>
							}
							<IconChevronDown className={ `${ classes.itemIcon } ${ isOpen ? 'open' : '' }` } color={ 'white' }
							                 size={ rem( 24 ) } stroke={ 2 }
							                 onClick={ () => handleLinkClick( link.link ) }/>
						</Group>
						{ isOpen &&
              <Group className={ classes.mobileLinksChild }>{ renderMobileLinks( link?.links || [] ) }</Group> }
					</Box>
				);
			}
			
			return (
				<Link key={ index } href={ link?.link } onClick={ () => handleBurgerClick() } className={ classes.link }>
					{ link?.label }
				</Link>
			);
		} );
	};
	
	const items = links?.map( ( link, index: number ) => {
		const modifyLink = modifyLinks( link?.link );
		const isActive = pathname.startsWith( modifyLink )
		const menuItems = link?.links?.map( ( item, key: number ) => (
			<Menu.Item key={ key } className={ classes.childLink }>
				<Link href={ modifyLinks( item?.link ) } className={ `${ classes.link } child` }>
					{ item.label }
				</Link>
			</Menu.Item>
		) );
		
		if ( menuItems ) {
			return (
				<Menu key={ index } trigger={ `hover` }
				      transitionProps={ { exitDuration : 0 } }>
					<Menu.Target>
						<Link href={ modifyLink } className={ `${ classes.link } ${ isActive ? 'active' : '' }` }>
							<Center>
								<span className={ classes.linkLabel }>{ link?.label }</span>
								<IconChevronDown size={ rem( 12 ) } stroke={ 1.5 }/>
							</Center>
						</Link>
					</Menu.Target>
					<Menu.Dropdown style={ { background : '#007C7E' } }>{ menuItems }</Menu.Dropdown>
				</Menu>
			);
		}
		
		return (
			<Link key={ index } href={ modifyLink } className={ `${ classes.link } ${ isActive ? 'active' : '' } ` }>
				{ link?.label }
			</Link>
		);
	} );
	
	return (
		<Header
			className={ `${ classes.header } ${ isBlogPage ? 'blog' : '' } ${ scrolled ? 'scrolled' : '' } ${ isOpen ? 'open'
			                                                                                                         : '' }` }
			height={ 'auto' }>
			<Container className={ classes.inner } size="xl">
				<Group className={ classes.headerMobile }>
					{
						logo?.sourceUrl &&
            <Link href={ '/' }>
              <Image src={ logo?.sourceUrl } alt={ logo?.title } width={ 110 } height={ 50 }/>
            </Link>
					}
					{ isMobile && (
						<Box className={ classes.burgerWrap }>
							{ buttonRepeater &&
                <CustomButton staticIcon={ true } mobileClass={ 'small' } className={ isBlogPage ? 'blog' : '' }
                              button={ buttonRepeater }/> }
							<Burger color={ `${ ( !isBlogPage || isOpen) ? 'white' : `${ theme.colors.main }` }` } opened={ isOpen }
							        onClick={ handleBurgerClick }
							        className={ classes.burger } size="sm"/>
							{ isMenuOpen && (
								<div className={ classes.menuContainer }>
									<Group className={ classes.mobileLinks }>{ renderMobileLinks( links || [] ) }</Group>
								</div>
							) }
						</Box>
					) }
				</Group>
				{ !isMobile && (
					<Group className={ classes.links }>
						{ items }
						{ buttonRepeater &&
              <CustomButton staticIcon={ true } className={ isBlogPage ? 'blog' : '' } button={ buttonRepeater }/> }
					</Group>
				) }
			</Container>
		</Header>
	);
}
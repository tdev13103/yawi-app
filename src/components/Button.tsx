'use client'

import React from 'react';
import Svg from "@/components/Svg";
import { Button, createStyles, rem, Image } from '@mantine/core';
import Link from "next/link";

interface CustomButtonProps {
	button: ButtonProps[]
	isSubmitBtn?: boolean,
	mobileClass?: string
	className?: string
	checkboxValue?: boolean
	staticIcon?: boolean
	target?: string
}

interface ButtonProps {
	button: {
		title: string
		url: string
	}
	variant: string
	color: string
	icon: string | { sourceUrl: string, title: string }
	icon_color?: string
	iconColor?: string
	text?: string
}

const useStyles = createStyles( ( theme ) => ({
		control : {
			fontWeight    : 600,
			height        : rem( 48 ),
			lineHeight    : 1.5,
			borderRadius  : `calc(${ theme.radius.sm } * 2)`,
			fontSize      : theme.fontSizes.lg,
			padding       : `${ rem( 1 ) } ${ rem( 14 ) } ${ rem( 1 ) } ${ rem( 26 ) }`,
			letterSpacing : rem( 0.18 ),
			
			'&.filled.orange' : {
				backgroundColor : theme.colors.yellow2,
				color           : theme.colors.main,
				
				'&:hover' : {
					backgroundColor : theme.colors.yellow7,
				},
				
				":disabled" : {
					backgroundColor : theme.colors.disabled
				},
			},
			
			'&.filled.green' : {
				backgroundColor : theme.colors.main,
				color           : theme.colors.white,
				
				'&:hover' : {
					backgroundColor : theme.colors.cyan6
				},
				
				":disabled" : {
					backgroundColor : theme.colors.disabled
				},
			},
			
			'&.light.grey' : {
				color           : theme.colors.main,
				backgroundColor : theme.colors.gray,
				
				'&:hover' : {
					backgroundColor : theme.colors.gray1,
				},
				
				":disabled" : {
					backgroundColor : theme.colors.disabled
				},
			},
			
			'&.full' : {
				width : '100%',
				
				'.mantine-Button-inner' : {
					justifyContent : 'space-between'
				},
			},
			
			'&.light.grey.blog' : {
				backgroundColor : theme.colors.main,
				color           : theme.colors.white,
				
				'&:hover' : {
					backgroundColor : theme.colors.cyan6,
				},
				
				path : {
					stroke : theme.colors.white
				}
			},
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize      : theme.fontSizes.md,
				height        : rem( 42 ),
				padding       : `${ rem( 1 ) } ${ rem( 8 ) } ${ rem( 1 ) } ${ rem( 22 ) } `,
				letterSpacing : rem( 0.16 ),
				width         : '100%',
				
				'.mantine-Button-inner' : {
					justifyContent : 'space-between'
				},
				
				'&.small ' : {
					width : 'auto',
					
					'.mantine-Button-inner' : {
						justifyContent : 'initial'
					},
				}
			},
		},
		
		controlIcon : {
			display    : 'flex',
			alignItems : 'center',
			height     : rem( 26 ),
			width      : rem( 26 ),
			
			[theme.fn.smallerThan( 'sm' )] : {
				height : rem( 18 ),
				width  : rem( 18 ),
				
				svg : {
					height : rem( 18 ),
					width  : rem( 18 ),
				}
			},
			
			path : {
				stroke : 'inherit'
			}
		},
	})
)

const CustomButton = ( {
	button,
	isSubmitBtn = false,
	mobileClass = '',
	className = '',
	checkboxValue = false,
	staticIcon = false,
	target = ''
}: CustomButtonProps ) => {
	const { classes } = useStyles();
	return (
		<>
			{
				button?.map( ( btn, index ) => {
					return (
						isSubmitBtn
						? <Button key={ index } type="submit" disabled={ checkboxValue }
						          className={ `${ classes.control } ${ btn?.variant } ${ btn.color } ${ mobileClass } ${ className }` }
						          rightIcon={ <Svg className={ classes.controlIcon } svg={ btn?.icon }
						                           style={ { stroke : btn?.icon_color } }/> }
						>
							{ btn?.text ?? btn?.button?.title }
						</Button>
						: <Button key={ index } component={ Link }
						          href={ btn?.button?.url }
						          target={target}
						          className={ `${ classes.control } ${ btn?.variant } ${ btn.color } ${ mobileClass } ${ className }` }
						          rightIcon={ staticIcon ? <Image src={ (typeof btn.icon === "object" && btn.icon.sourceUrl) || '' }
						                                          alt={ (typeof btn.icon === "object" && btn.icon.title) || '' }/>
						                                 : <Svg className={ classes.controlIcon } svg={ btn?.icon }
						                                        style={ { stroke : btn?.icon_color } }/> }
						>
							{ btn?.button?.title }
						</Button>
					)
				} )
			}
		</>
	);
};

export default CustomButton;
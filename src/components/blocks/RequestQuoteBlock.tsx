'use client'

import {
	createStyles,
	Container,
	Title,
	Text,
	rem,
	Group,
	Box,
	SimpleGrid,
} from '@mantine/core';
import React, { useEffect, useState } from "react";
import Svg from "@/components/Svg";
import CustomButton from "@/components/Button";
import { useThemeContext } from "@/context/theme.context";
import InputForms from "@/components/InputForms";
import { useForm } from "@mantine/form";

interface RequestQuoteBlockProps {
	data: {
		sub_title: string
		title: string,
		background_image: string,
		hide_this_block: string,
		lists_repeater: Items[],
		button_repeater: ButtonProps[]
	}
}

interface Items {
	icon: string,
	icon_color: string,
	title: string
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

interface FormFields {
	type: string,
	name?: string,
	className: string,
	label?: string,
	placeholder?: string,
}

const useStyles = createStyles( ( theme ) => ({
	requestQuoteBlockWrap : {
		position           : 'relative',
		backgroundSize     : 'cover',
		backgroundPosition : 'center',
		minHeight          : rem( 790 ),
		marginBottom       : `calc(${ theme.spacing.lg } * 4)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			marginBottom : `calc(${ theme.spacing.lg } * 8)`,
		},
	},
	
	requestQuoteBlock : {
		transform       : 'translateY(200px)',
		padding         : `calc(${ theme.spacing.lg } * 2)`,
		backgroundColor : theme.colors.main,
		color           : theme.colors.gray,
		gap             : `calc(${ theme.spacing.md } * 2)`,
		borderRadius    : `calc(${ theme.radius.sm } * 3)`,
		
		[theme.fn.smallerThan( 'md' )] : {
			transform : 'translateY(120px)',
			padding   : `calc(${ theme.spacing.sm } * 2) ${ theme.spacing.md }`,
			gap       : `calc(${ theme.spacing.md } * 2)`,
		},
	},
	
	title : {
		maxWidth     : rem( 648 ),
		marginBottom : `calc(${ theme.spacing.md } * 2)`,
		
		[theme.fn.smallerThan( 'sm' )] : {
			maxWidth     : '100%',
			fontSize     : theme.headings.sizes.h3.fontSize,
			marginBottom : `${ theme.spacing.md }`,
		},
	},
	
	description : {
		fontSize : theme.fontSizes.lg,
		maxWidth : rem( 610 ),
		
		[theme.fn.smallerThan( 'sm' )] : {
			maxWidth : '100%',
			fontSize : theme.fontSizes.md,
		},
	},
	
	lists : {
		maxWidth  : rem( 648 ),
		marginTop : `calc(${ theme.spacing.md } * 2)`,
		gap       : theme.spacing.md,
		display   : "grid",
		
		[theme.fn.smallerThan( 'sm' )] : {
			marginTop : theme.spacing.md,
		},
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
		gap        : `calc(${ theme.spacing.md } / 2)`,
		alignItems : 'flex-start'
	},
	
	item_icon : {
		path : {
			stroke : 'inherit'
		}
	},
	
	form : {
		[theme.fn.largerThan( 'md' )] : {
			maxWidth : rem( 648 ),
		},
	},
	
	fields : {
		'.mantine-InputWrapper-label' : {
			color      : theme.colors.white,
			fontSize   : theme.fontSizes.lg,
			fontWeight : 600,
			margin     : '0 0 5px',
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
			},
		},
		
		'.mantine-Input-input' : {
			borderRadius : `calc(${ theme.radius.sm } * 2)`,
			border       : `1px solid ${ theme.colors.white }`,
			
			'&:hover,&:focus' : {
				border : `1px solid ${ theme.colors.yellow2 }`,
			},
		},
		
	},
	
	inputsWrap : {
		[theme.fn.smallerThan( 'sm' )] : {
			gap : 0,
		},
	},
	
	inputWrap : {
		[theme.fn.smallerThan( 'sm' )] : {
			marginBottom : `calc(${ theme.spacing.md } / 2)`,
			
			'&:nth-child(even)':{
				marginBottom : theme.spacing.md,
			},
		},
	},
	
	fieldInput : {
		
		'input, textarea' : {
			color           : theme.colors.white,
			fontSize        : theme.fontSizes.lg,
			padding         : `${ rem( 1 ) } ${ theme.spacing.md }`,
			border          : 'none',
			height          : rem( 48 ),
			backgroundColor : 'transparent',
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
			},
			
			'&::placeholder' : {
				color    : theme.colors.gray3,
				fontSize : theme.fontSizes.lg,
				
				[theme.fn.smallerThan( 'sm' )] : {
					fontSize : theme.fontSizes.md,
				},
			},
		},
		
		textarea : {
			height  : 'auto',
			padding : theme.spacing.md,
		}
	},
}) );

export default function RequestQuoteBlock( {
	data : {
		title,
		sub_title,
		background_image,
		hide_this_block,
		lists_repeater,
		button_repeater,
	}
}: RequestQuoteBlockProps ) {
	const { classes } = useStyles();
	const { themeSettings : { formsSettings } } = useThemeContext();
	const inputs = [
		{
			type        : 'text',
			name        : 'name',
			className   : `${ classes.fieldInput }`,
			label       : 'Namn',
			placeholder : 'Tony Lip',
		},
		{
			type        : 'number',
			name        : 'phone',
			className   : `${ classes.fieldInput }`,
			label       : 'Telefon',
			placeholder : 'Input',
		},
		{
			type        : 'text',
			name        : 'email',
			className   : `${ classes.fieldInput }`,
			label       : 'E-postadress',
			placeholder : 'din@epostadress.se',
		},
		{
			type        : 'text',
			name        : 'address',
			className   : `${ classes.fieldInput }`,
			label       : 'Adress',
			placeholder : 'Input',
		},
		{
			type        : 'text',
			name        : 'postnummer',
			className   : `${ classes.fieldInput }`,
			label       : 'Postnummer',
			placeholder : 'Input',
		},
		{
			type        : 'text',
			name        : 'ort',
			className   : `${ classes.fieldInput }`,
			label       : 'Ort',
			placeholder : 'Input',
		},
		{
			type        : 'select',
			name        : 'select1',
			className   : `${ classes.fieldInput }`,
			label       : 'Typ av kund',
			placeholder : 'Typ av kund',
		},
		{
			type        : 'select',
			name        : 'select2',
			className   : `${ classes.fieldInput }`,
			label       : 'När ska uppdraget utföras  ',
			placeholder : 'När ska uppdraget utföras',
		},
		{
			name        : 'message',
			type        : 'textarea',
			className   : `${ classes.fieldInput }`,
			label       : 'Meddelande',
			placeholder : 'Ditt meddelande',
		},
	];
	
	const [finalFormsFields, setFinalFormsFields] = useState<FormFields[]>( inputs );
	
	const currentFormFields = formsSettings?.filter( ( item ) => item?.formName === 'Request Quote form' )?.[0];
	
	const form = useForm( {
		initialValues : {
			name       : '',
			phone      : '',
			email      : '',
			address    : '',
			postnummer : '',
			ort        : '',
			select1    : '',
			select2    : '',
			message    : '',
		},
		validate      : {
			name       : ( value ) => (/^[a-zA-Z0-9]{2,30}$/.test( value ) ? null
			                                                               : 'Name must be 2-30 characters long and may only contain letters and numbers'),
			phone      : ( value ) => (/^(?:\+46|46|0)\s?(7\d{2}|8\d{1}|9\d{1})\s?\d{2}\s?\d{2}\s?\d{2}$/.test( value )
			                           ? null : 'Phone number is incorrect or in the wrong format.'),
			email      : ( value ) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value ) ? null : 'Invalid email'),
			address    : ( value ) => (value?.trim() !== '' ? null : 'Address field is required'),
			postnummer : ( value ) => (/^\d{3} ?\d{2}$/.test( value ) ? null
			                                                          : 'Postnummer must be 5 digits long and may contain a space after the first 3 digits'),
			ort        : ( value ) => (value?.trim() !== '' ? null : 'Ort field is required'),
			message    : ( value ) => (value?.trim() !== '' ? null : 'Meddelande field is required'),
		},
	} );
	
	
	useEffect( () => {
		setFinalFormsFields( () => {
			return inputs?.map( item => {
				return {
					...item,
					newName : (currentFormFields?.fields || [])?.filter(
						( subItem ) => subItem.name === item.name )[0]?.fieldId,
				};
			} );
		} );
	}, [] );
	
	const handleSubmit = async ( event: React.FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		form.validate()
		const target = event?.target as HTMLFormElement;
		
		if ( form.isValid() ) {
			try {
				const formData = new FormData( target );
				const url = `${ process.env.NEXT_PUBLIC_WORDPRESS_API_URL }/wp-json/gf/v2/forms/${ currentFormFields?.formId }/submissions`;
				
				const response = await fetch( url, {
					method : 'POST',
					body   : formData
				} );
				
				if ( response.ok ) {
					const data = await response.json();
					console.log( 'Response', data );
					form.reset();
				}
				else {
					const errorData = await response.json();
					console.log( 'Error data:', errorData );
				}
			}
			catch ( error ) {
				console.log( 'Error occurred:', error );
			}
		}
	};
	
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<Box className={ `${ classes.requestQuoteBlockWrap }` }
		     style={ {
			     backgroundImage : `linear-gradient(88deg, rgb(83, 82, 82) 0%, rgb(0 124 126 / 46%) 60%, rgba(255, 255, 255, 0) 100%), url(${ background_image })`
		     } }>
			<Container size="xl">
				<SimpleGrid cols={ 2 } className={ classes.requestQuoteBlock } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					<Box>
						{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
						{ sub_title &&
              <Text className={ classes.description } dangerouslySetInnerHTML={ { __html : sub_title } }/> }
						{
							lists_repeater &&
              <SimpleGrid cols={ 1 } className={ classes.lists }>
								{
									lists_repeater?.map( ( item, key ) => {
										return (
											<Group noWrap className={ classes.listItem } key={ key }>
												{ item.icon &&
                          <Svg className={ `${ classes.item_icon }` } style={ { stroke : item?.icon_color } }
                               svg={ item?.icon }/> }
												{ item.title && <Text className={ classes.itemText }>{ item.title }</Text> }
											</Group>
										)
									} )
								}
              </SimpleGrid>
						}
					</Box>
					<Box>
						<form className={ classes.form } onSubmit={ handleSubmit }>
							<div className={ classes.fields }>
								<SimpleGrid className={ classes.inputsWrap } cols={ 2 } breakpoints={ [
									{
										maxWidth : 'sm',
										cols     : 1
									}
								] }>
									{
										finalFormsFields?.map( ( input, index: number ) => {
											const isLastElement = index === finalFormsFields.length - 1;
											return (
												<div key={ index } className={classes.inputWrap} style={ { gridColumn : isLastElement ? '1 / -1' : 'auto' } }>
													<InputForms data={ input } form={ form }/>
												</div>
											)
										} )
									}
								</SimpleGrid>
								<Group mt={ 'md' }>
									<CustomButton isSubmitBtn={ true } button={ button_repeater }/>
								</Group>
							</div>
						</form>
					</Box>
				</SimpleGrid>
			</Container>
		</Box>
	);
}
'use client'
import {
	Text,
	Group,
	SimpleGrid,
	createStyles,
	rem,
	Container,
	Title,
	Box,
} from '@mantine/core';
import { useThemeContext } from "@/context/theme.context";
import React, { useEffect, useState } from "react";
import { useMediaQuery } from "@mantine/hooks";
import CustomButton from "@/components/Button";
import InputForms from "@/components/InputForms";
import { useForm } from "@mantine/form";


interface ContactUsProps {
	data: {
		title: string
		hide_this_block: string
		checkbox_text: string
		description: string
		button_repeater: ButtonProps[]
		submit_button_repeater: ButtonProps[]
		sub_title: string
	}
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
	classNameWrap?: string,
	classNameText?: string,
	value?: boolean,
	isMobile?: boolean,
	text?: string
}

const useStyles = createStyles( ( theme ) => {
	
	return {
		contactUs : {
			paddingTop      : `calc(${ theme.spacing.lg } * 5)`,
			paddingBottom   : `calc(${ theme.spacing.lg } * 5)`,
			backgroundColor : theme.colors.gray1,
			color           : theme.colors.main,
			
			[theme.fn.smallerThan( 'md' )] : {
				paddingTop    : `calc(${ theme.spacing.lg } * 2)`,
				paddingBottom : `calc(${ theme.spacing.lg } * 2)`,
			},
		},
		
		wrapper : {
			gap : `calc(${ theme.spacing.md } * 2)`,
			
			[theme.fn.smallerThan( 'sm' )] : {
				gap : theme.spacing.xl,
			},
		},
		
		form : {
			[theme.fn.largerThan( 'md' )] : {
				maxWidth : rem( 648 ),
			},
		},
		
		fields : {
			'.mantine-InputWrapper-label' : {
				color        : theme.colors.main,
				fontSize     : theme.fontSizes.lg,
				fontWeight   : 600,
				marginBottom : `calc(${ theme.spacing.sm } / 2)`,
				
				[theme.fn.smallerThan( 'sm' )] : {
					fontSize : theme.fontSizes.md,
				},
			},
			
			'.mantine-Input-input' : {
				borderRadius : `calc(${ theme.radius.sm } * 2)`,
				border       : `1px solid ${ theme.colors.main }`,
				
				'&:hover,&:focus': {
					border       : `1px solid ${ theme.colors.yellow2 }`,
				},
			},
			
		},
		
		fieldInput : {
			marginBottom : theme.spacing.xl,
			
			'input, textarea' : {
				color           : theme.colors.main,
				fontSize        : theme.fontSizes.lg,
				padding         : `${ rem( 1 ) } ${ theme.spacing.md }`,
				border          : 'none',
				height          : rem( 48 ),
				backgroundColor : 'transparent',
				
				[theme.fn.smallerThan( 'sm' )] : {
					fontSize : theme.fontSizes.md,
				},
				
				'&::placeholder' : {
					color    : theme.colors.main,
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
		
		description : {
			margin   : `${ theme.spacing.md } 0 calc(${ theme.spacing.md } * 2)`,
			fontSize : theme.fontSizes.lg,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
			},
		},
		
		checkboxWrap : {
			display      : 'flex',
			marginBottom : `calc(${ theme.spacing.md } * 2)`,
		},
		
		checkboxText : {
			color    : theme.colors.main,
			fontSize : theme.fontSizes.lg,
			
			[theme.fn.smallerThan( 'sm' )] : {
				fontSize : theme.fontSizes.md,
			},
			
			a : {
				color : theme.colors.main,
				
				[theme.fn.smallerThan( 'sm' )] : {
					fontSize : theme.fontSizes.lg,
				},
			},
		},
		
		checkbox : {
			input : {
				cursor          : 'pointer',
				backgroundColor : 'transparent',
				borderRadius    : `calc(${ theme.radius.sm } * 2)`,
				border          : `1px solid ${ theme.colors.main }`,
				
				'&:checked' : {
					backgroundColor : theme.colors.main,
					borderColor     : theme.colors.main
				}
			}
		},
	};
} );

export default function ContactUs( {
	data : {
		title,
		hide_this_block,
		checkbox_text,
		description,
		button_repeater,
		sub_title,
		submit_button_repeater,
	}
}: ContactUsProps ) {
	const { classes } = useStyles();
	const { themeSettings : { formsSettings } } = useThemeContext();
	const isMobile = useMediaQuery( '(max-width: 820px)' );
	
	const [checkboxValue, setCheckboxValue] = useState( false );
	
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
	}, [checkboxValue] );
	
	const form = useForm( {
		initialValues : {
			name    : '',
			email   : '',
			message : '',
		},
		validate      : {
			name    : ( value ) => (/^[a-zA-Z0-9]{2,30}$/.test( value ) ? null
			                                                            : 'Name must be 2-30 characters long and may only contain letters and numbers'),
			email   : ( value ) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test( value ) ? null : 'Invalid email'),
			message : ( value ) => (value?.trim() !== '' ? null : 'Meddelande field is required'),
		},
	} );
	
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
					setCheckboxValue( false )
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
	
	const handleCheckboxChange = () => {
		setCheckboxValue( ( prevValue ) => !prevValue );
	};
	
	const inputs = [
		{
			type        : 'text',
			name        : 'name',
			className   : `${ classes.fieldInput }`,
			label       : 'Namn',
			placeholder : 'Ditt namn',
		},
		{
			type        : 'text',
			name        : 'email',
			className   : `${ classes.fieldInput }`,
			label       : 'E-postadress',
			placeholder : 'din@epostadress.se',
		},
		{
			type        : 'textarea',
			name        : 'message',
			className   : `${ classes.fieldInput }`,
			label       : 'Meddelande',
			placeholder : 'Ditt meddelande',
		},
		{
			name          : 'checkbox',
			type          : 'checkbox',
			className     : `${ classes.checkbox }`,
			classNameWrap : `${ classes.checkboxWrap }`,
			classNameText : `${ classes.checkboxText }`,
			value         : checkboxValue,
			handleClick   : handleCheckboxChange,
			isMobile      : isMobile,
			text          : checkbox_text
		},
	];
	const [finalFormsFields, setFinalFormsFields] = useState<FormFields[]>( inputs );
	const currentFormFields = formsSettings?.filter( ( item ) => item?.formName === 'Contact form' )?.[0];
	
	if ( +hide_this_block ) {
		return null;
	}
	
	return (
		<div className={ `${ classes.contactUs }` }>
			<Container size={ 'xl' }>
				<SimpleGrid cols={ 2 } className={ classes.wrapper } breakpoints={ [
					{
						maxWidth : 'md',
						cols     : 1
					}
				] }>
					<Box>
						{ title && <Title order={ 2 } className={ classes.title }>{ title }</Title> }
						{ sub_title && <Title className={ classes.subTitle } order={ 5 } mt={ 'md' }>{ sub_title }</Title> }
						{ description && <Text className={ classes.description }>{ description }</Text> }
						<Group spacing={ 'md' } mt={ 32 }>
							{ button_repeater && <CustomButton button={ button_repeater }/> }
						</Group>
					</Box>
					<form className={ classes.form } onSubmit={ handleSubmit }>
						<div className={ classes.fields }>
							<SimpleGrid cols={ 2 } breakpoints={ [
								{
									maxWidth : 'sm',
									cols     : 1
								}
							] }>
								{
									finalFormsFields?.map( ( input, index: number ) => {
										const isLastElement = index > 1;
										return (
											<div key={ index } style={ { gridColumn : isLastElement ? '1 / -1' : 'auto' } }>
												<InputForms data={ input } form={ form }/>
											</div>
										)
									} )
								}
							</SimpleGrid>
							<Group>
								{ submit_button_repeater &&
                  <CustomButton isSubmitBtn={ true } checkboxValue={ !checkboxValue }
                                button={ submit_button_repeater }/> }
							</Group>
						</div>
					</form>
				</SimpleGrid>
			</Container>
		</div>
	);
}
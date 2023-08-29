import React from 'react';
import { Checkbox, rem, Select, Text, Textarea, TextInput, UnstyledButton } from "@mantine/core";
import SelectIcon from "@/components/Icons/SelectIcon";

interface InputForms {
	data: FormFields
	form?: any
}

interface FormFields {
	type: string,
	name?: string,
	newName?: string,
	options?: {
		label: string;
		value: string;
	}[]
	className: string,
	label?: string,
	placeholder?: string,
	classNameWrap?: string,
	classNameText?: string,
	value?: boolean,
	handleClick?: () => {},
	isMobile?: boolean,
	text?: string
}


const InputForms = ( {
	data,
	form
}: InputForms ) => {
	
	/**
	 * Define what type of input should be rendered
	 * @param param<FormFields>
	 * @param form
	 * @return {*}
	 */
	const renderSwitch = ( param: FormFields, form: any ) => {
		switch ( param?.type ) {
			case 'select':
				return <Select
					className={ param?.className }
					placeholder={ param?.placeholder }
					label={ param?.label }
					name={ param?.newName }
					withinPortal
					data={ param?.options ?? [] }
					size="lg"
					rightSection={ <SelectIcon/> }
					searchable
					nothingFound="No options"
					withAsterisk
					styles={ ( theme ) => ({
						dropdown     : {
							backgroundColor : theme.colors.main,
						},
						rightSection : {
							pointerEvents : 'none',
						},
						error        : {
							fontSize : theme.fontSizes.md
						},
						item         : {
							color           : theme.colors.white,
							backgroundColor : theme.colors.main,
							border          : 'none !important',
							
							'&:hover' : {
								backgroundColor : theme.colors.gray,
								color           : theme.colors.main,
							},
							// applies styles to selected item
							'&[data-selected]' : {
								backgroundColor : theme.colors.gray3,
								color           : theme.colors.gray,
							},
						},
					}) }
					{ ...form.getInputProps( `${ param?.name }` ) }
				/>
			
			case 'text':
				return <TextInput
					className={ param.className }
					label={ param?.label }
					name={ param?.newName }
					placeholder={ param?.placeholder }
					withAsterisk
					styles={ ( theme ) => ({
						error : {
							fontSize : theme.fontSizes.md
						}
					}) }
					{ ...form.getInputProps( `${ param?.name }` ) }/>
			
			case 'number':
				return <TextInput
					type="number"
					className={ param.className }
					label={ param?.label }
					name={ param?.newName }
					placeholder={ param?.placeholder }
					withAsterisk
					styles={ ( theme ) => ({
						error : {
							fontSize : theme.fontSizes.md
						}
					}) }
					{ ...form.getInputProps( `${ param?.name }` ) }/>
			
			case 'textarea':
				return <Textarea
					className={ param?.className }
					label={ param?.label }
					name={ param?.newName }
					placeholder={ param?.placeholder }
					minRows={ 4 }
					withAsterisk
					styles={ ( theme ) => ({
						error : {
							fontSize : theme.fontSizes.md
						}
					}) }
					{ ...form.getInputProps( `${ param?.name }` ) }
				/>
			
			case 'checkbox':
				return (
					<UnstyledButton className={ param?.classNameWrap } onClick={ param?.handleClick }>
						<Checkbox
							checked={ param?.value }
							size={ rem( param?.isMobile ? 24 : 30 ) }
							mr={ rem( 10 ) }
							onChange={ () => {} }
							tabIndex={ -1 }
							className={ param?.className }
						/>
						{ param?.text &&
              <Text className={ param?.classNameText } dangerouslySetInnerHTML={ { __html : param?.text } }/> }
					</UnstyledButton>
				)
			
			default:
				return null;
		}
	}
	
	return (
		<>
			{ renderSwitch( data, form ) }
		</>
	);
};

export default InputForms;
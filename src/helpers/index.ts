import { format } from 'date-fns';

export const convertToCamelCase = ( str: string ) => {
	const slicedStr = str.slice( 4 );
	const words = slicedStr.split( '-' );
	return words.map( word => {
		return word.charAt( 0 ).toUpperCase() + word.slice( 1 );
	} ).join( '' );
}

/**
 * Converting repeater fields to normal
 * @param data
 */
export const extractRepeaterFields = ( data: any ): { [key: string]: any } => {
	const result: { [key: string]: any } = {};
	
	const processField = ( field: string, value: any, obj: { [key: string]: any } ): void => {
		const matches = field.match( /\d+/ );
		const number = matches?.[0] || null;
		const startIndex = field.indexOf( `_${ number }_` );
		const repeaterKey = field.substring( 0, startIndex );
		const fieldKey = field.substring( startIndex + 3 );
		
		if ( fieldKey.includes( "repeater" ) ) {
			const subMatches = fieldKey.match( /\d+/ );
			const subNumber = subMatches?.[0] || null;
			const subStartIndex = fieldKey.indexOf( `_${ subNumber }_` );
			const subRepeaterKey = fieldKey.substring( 0, subStartIndex );
			const subFieldKey = fieldKey.substring( subStartIndex + 3 );
			
			if ( subFieldKey !== undefined && subRepeaterKey !== undefined && subNumber !== null && number !== null ) {
				obj[repeaterKey] = obj[repeaterKey] || [];
				obj[repeaterKey][number] = obj[repeaterKey][number] || {};
				obj[repeaterKey][number][subRepeaterKey] = obj[repeaterKey][number][subRepeaterKey] || [];
				obj[repeaterKey][number][subRepeaterKey][subNumber] = obj[repeaterKey][number][subRepeaterKey][subNumber] || {};
				obj[repeaterKey][number][subRepeaterKey][subNumber][subFieldKey] = value;
				
				// Recursive call to handle nested fields
				processField( subFieldKey, value, obj[repeaterKey][number][subRepeaterKey][subNumber] );
			}
		}
		else if ( number !== null ) {
			obj[repeaterKey] = obj[repeaterKey] || [];
			obj[repeaterKey][number] = obj[repeaterKey][number] || {};
			obj[repeaterKey][number][fieldKey] = value;
		}
	};
	
	const processRepeaterFields = ( fields: string[], obj: { [key: string]: any } ): void => {
		fields.forEach( ( field ) => {
			const fieldValue = data[field];
			
			if ( fieldValue !== undefined ) {
				processField( field, fieldValue, obj );
			}
		} );
	};
	
	const repeaterFields = Object.keys( data ).filter( ( key ) => key.includes( "repeater" ) );
	processRepeaterFields( repeaterFields, result );
	
	return result;
};


/**
 * Determines the contact type (phone number or email address) and adds corresponding prefixes.
 * @param input The string with contact information.
 * @returns A string with the added prefix "tel:" or "mailto:" if it's a phone number or email address respectively.
 *          If the input string doesn't match either a phone number or email address, it returns the original string unchanged.
 */
export const determineContactType = ( input: string ): string => {
	const phoneRegex = /^\d{2}-\d{3} \d{3} \d{2}$/;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	if ( phoneRegex.test( input ) ) {
		return "tel:" + input;
	}
	if ( emailRegex.test( input ) ) {
		return "mailto:" + input;
	}
	
	return `https://www.google.com/maps/search/?api=1&query=${ input }`;
}

/**
 * Converts a given date string to the format "dd MMMM yyyy".
 * @param dateString The date string to be converted.
 * @returns The converted date string in the format "dd MMMM yyyy".
 */
export const convertDate = ( dateString: string ): string => {
	const date = new Date( dateString );
	return format( date, 'dd MMMM yyyy' );
}

/**
 * Modifies links in the given string based on the value of the NEXT_PUBLIC_WORDPRESS_APP_URL environment variable.
 * If NEXT_PUBLIC_WORDPRESS_APP_URL is a valid string, the function replaces all occurrences of that string in the input string with an empty string.
 * Then, it removes a trailing slash (/) from the string, if present.
 *
 * @param string - The input string in which links need to be modified.
 * @returns The modified string with links replaced and trailing slash removed (if applicable).
 *
 * Notes:
 * - If NEXT_PUBLIC_WORDPRESS_APP_URL is not a valid string or is undefined, the function returns the input string unchanged.
 * - Link modification is performed by using the replace() method to replace all occurrences of the specified string.
 * - The trailing slash removal is achieved using a regular expression (/\/$/) to match and remove the slash at the end of the string.
 */
export const modifyLinks = ( string: string ): string => {
	const replace: string | undefined = process.env.NEXT_PUBLIC_WORDPRESS_APP_URL;
	
	if ( typeof replace === 'string' ) {
		return string.replace( replace, '' ).replace( /\/$/, "" );
	}
	return string;
}

/**
 * Extracts the YouTube video ID from a given URL.
 * Supports both full YouTube URLs and shortened formats.
 * @param source The YouTube URL from which to extract the video ID.
 * @returns The extracted YouTube video ID, or an empty string if not found.
 */
export const extractYouTubeVideoId = ( source: string ): string => {
	const regexFull = /[?&]v=([^&#]+)/;
	const regexShort = /^https?:\/\/(?:www\.)?youtu\.?be(?:\.com)?\/(?:watch\?v=|embed\/|v\/|youtu\.be\/|user\/\S+\/|playlist\?|watch\?.+&v=)([^#\&\?\/]+)/;
	const matchFull = source.match( regexFull );
	const matchShort = source.match( regexShort );
	
	if ( matchFull && matchFull[1] ) {
		return matchFull[1];
	}
	else if ( matchShort && matchShort[1] ) {
		return matchShort[1];
	}
	else {
		return '';
	}
}

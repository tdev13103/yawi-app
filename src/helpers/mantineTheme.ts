import { rem } from "@mantine/core";

export const defaultTheme = {
	fontFamily : 'var(--font-outfit)',
	lineHeight : 1.55,
	components : {
		Container : {
			defaultProps : {
				sizes : {
					xs : 540,
					sm : 720,
					md : 904,
					lg : 1140,
					xl : 1360,
				},
			},
		},
	},
	colors     : {
		main     : '#007C7E',
		gray     : '#F2F7F7',
		gray1    : '#E5EFEF',
		gray2    : '#888C9B',
		gray3    : '#ADB5BD',
		disabled : '#E9ECEF',
		green    : '#00787A',
		yellow   : '#F2C94C',
		yellow2  : '#F2C84C',
		yellow7  : '#C6A33D',
		white    : '#FFFFFF',
		cyan6    : '#006365',
		blue     : '#273872',
	},
	headings   : {
		sizes : {
			h1 : {
				fontSize   : rem( 72 ),
				lineHeight : 1.2,
			},
			h2 : {
				fontSize   : rem( 52 ),
				lineHeight : 1.2,
			},
			h3 : {
				fontSize   : rem( 32 ),
				lineHeight : 1.1,
			},
			h4 : {
				fontSize   : rem( 22 ),
				lineHeight : 1.2,
			},
			h5 : {
				fontSize   : rem( 18 ),
				lineHeight : 1.5,
			},
			h6 : {
				fontSize   : rem( 14 ),
				lineHeight : 1.3,
			}
		}
	},
}
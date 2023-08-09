import { getClient } from "@/lib/apolloClient";
import { QUERY_PAGE_BY_SLUG } from "@/data/posts";
import { formattingBlocks } from "@/helpers/formattingBlocks";

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

export async function pageSettings( entrySlug: string[] | string ) {
	const slug = typeof entrySlug === 'string' ? entrySlug : entrySlug[entrySlug.length - 1]
	
	const { data } = await getClient().query( {
		query     : QUERY_PAGE_BY_SLUG,
		variables : { slug },
		context   : {
			fetchOptions : {
				next : { revalidate : 5 },
			},
		},
	} );
	
	if ( data?.pageBy === null ) {
		return null
	}
	
	const transformedBlocks = data?.pageBy?.blocks?.map( ( block: Block ) => formattingBlocks( block ) );
	
	const transformedData = Object.fromEntries(
		Object.entries( data?.pageBy )?.filter( ( [key] ) => !key.startsWith( '_' ) )
	);
	
	return {
		...transformedData,
		blocks : transformedBlocks,
	};
}

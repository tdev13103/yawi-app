import { getClient } from "@/lib/apolloClient";
import { QUERY_POSTS } from "@/data/posts";

export async function postsSettings() {
	const { data } = await getClient().query( {
		query   : QUERY_POSTS,
		context : {
			fetchOptions : {
				next : { revalidate : 5 },
			},
		},
	} );
	
	return data?.posts?.nodes;
}

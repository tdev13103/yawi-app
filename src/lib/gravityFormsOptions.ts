import { getClient } from "@/lib/apolloClient";
import { QUERY_GRAVITY_FORMS } from "@/data/gravityForms";

export async function gravityFormsSettings() {
	const { data } = await getClient().query( {
		query   : QUERY_GRAVITY_FORMS,
		context : {
			fetchOptions : {
				next : { revalidate : 5 },
			},
		},
	} );
	return data?.gfForms?.nodes;
}

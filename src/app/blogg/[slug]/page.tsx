import React from 'react';
import { postsSettings } from "@/lib/postsSettings";
import SinglePost from "@/components/SinglePost";
import { Metadata } from "next";

interface Post {
	slug: string;
}

export async function generateMetadata(
	{ params : { slug } }: { params: { slug: string } }
): Promise<Metadata> {
	const posts = await postsSettings();
	const currentPost = posts.filter( ( post: Post ) => post?.slug === slug )?.[0]
	const { seo }: any = currentPost;
	
	return {
		title     : seo?.opengraphTitle,
		openGraph : {
			title       : seo?.opengraphTitle,
			description : seo?.opengraphDescription,
		},
	}
}

const Page = async ( { params : { slug } }: { params: { slug: string } } ) => {
	try {
		const posts = await postsSettings();
		const currentPost = posts.filter( ( post: Post ) => post?.slug === slug )?.[0]
		const { seo } = currentPost
		
		return (
			<>
				{
					seo?.schema?.raw &&
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={ { __html : JSON.stringify( seo?.schema?.raw ) } }
          />
				}
				<SinglePost post={ currentPost }/>
			</>
		);
	}
	catch ( error ) {
		console.error( 'Error retrieving page settings:', error );
		return null;
	}
};

export default Page;

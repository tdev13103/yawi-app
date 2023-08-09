import React from 'react';
import { pageSettings } from '@/lib/pageSettings';
import { postsSettings } from "@/lib/postsSettings";
import PostsBlock from "@/components/PostsBlock";
import { Metadata } from "next";
import ContactUs from "@/components/blocks/ContactUs";
import HeroBanner from "@/components/blocks/HeroBanner";
import NotFoundPage from "@/components/404";

export async function generateMetadata(): Promise<Metadata> {
	const data = await pageSettings( 'blogg' );
	if ( data !== null ) {
		const { seo }: any = data;
		
		return {
			title     : seo?.opengraphTitle,
			openGraph : {
				title       : seo?.opengraphTitle,
				description : seo?.opengraphDescription,
			},
		}
	}
	return {}
}

export default async function Page() {
	try {
		const pages = await pageSettings( 'blogg' );
		const posts = await postsSettings();
		
		if ( pages !== null ) {
			const { blocks } = pages;
			const { seo }: any = pages;
			
			return (
				<>
					{
						seo?.schema?.raw &&
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={ { __html : JSON.stringify( seo?.schema?.raw ) } }
            />
					}
					<HeroBanner data={ blocks[0].blockData }/>
					<PostsBlock posts={ posts }/>
					<ContactUs data={ blocks[1].blockData }/>
				</>
			);
		}
		
		return <NotFoundPage/>
	}
	catch ( error ) {
		console.error( 'Error retrieving page settings:', error );
		return null;
	}
};

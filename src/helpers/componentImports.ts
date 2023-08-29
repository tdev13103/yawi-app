import dynamic from "next/dynamic";

export const componentImports: Record<string, any> = {
	ContactUs           : dynamic( () => import('@/components/blocks/ContactUs') ),
	ContentWithLists    : dynamic( () => import('@/components/blocks/ContentWithLists') ),
	CustomClassic       : dynamic( () => import('@/components/blocks/CustomClassic') ),
	Faq                 : dynamic( () => import('@/components/blocks/Faq') ),
	FullWidthImage      : dynamic( () => import('@/components/blocks/FullWidthImage') ),
	HomeHero            : dynamic( () => import('@/components/blocks/HomeHero') ),
	OurProcedures       : dynamic( () => import('@/components/blocks/OurProcedures') ),
	OurProcess          : dynamic( () => import('@/components/blocks/OurProcess') ),
	Prices              : dynamic( () => import('@/components/blocks/Prices') ),
	Testimonials        : dynamic( () => import('@/components/blocks/Testimonials') ),
	HeroBanner          : dynamic( () => import('@/components/blocks/HeroBanner') ),
	AfterBanner         : dynamic( () => import('@/components/blocks/AfterBanner') ),
	PhotosBlock         : dynamic( () => import('@/components/blocks/PhotosBlock') ),
	RequestQuoteBlock   : dynamic( () => import('@/components/blocks/RequestQuoteBlock') ),
	CustomWysiwygEditor : dynamic( () => import('@/components/blocks/CustomWysiwygEditor') ),
};
import React from 'react';
import NotFoundPage from "@/components/404";
import { componentImports } from "@/helpers/componentImports";

interface Blocks {
	blocks: {
		blockName: string;
		blockData: Record<string, unknown>;
	}[];
}

const PageBlocks = ( { blocks }: Blocks ) => {
	const filteredBlocks = blocks?.filter(
		( item ) => componentImports[item?.blockName] !== undefined
	);
	
	return (
		<>
			{ filteredBlocks?.map( ( item, index: number ) => {
				const DynamicComponent = componentImports[item?.blockName];
				return <DynamicComponent key={ index } data={ item?.blockData }/>;
			} ) }
			
			{ !filteredBlocks?.length && <NotFoundPage/> }
		</>
	);
};

export default PageBlocks;

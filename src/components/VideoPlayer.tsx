'use client'

import React, { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import { extractYouTubeVideoId } from "@/helpers";
import { Box, createStyles, Image, rem } from "@mantine/core";
import VideoBtn from "@/components/Icons/VideoBtn";

const useStyles = createStyles( ( theme ) => ({
	videoPlayer : {
		position     : 'relative',
		overflow     : 'hidden',
		borderRadius : `calc(${ theme.radius.sm } * 2)`,
		width        : rem( 648 ),
		height       : rem( 365 ),
		
		[theme.fn.smallerThan( 'lg' )] : {
			height : rem( 286 ),
		},
		
		[theme.fn.smallerThan( 'md' )] : {
			width  : '100%',
			height : rem( 359 ),
			zoom   : 1.153
		},
		
		[theme.fn.smallerThan( 'sm' )] : {
			height : rem( 220 ),
			zoom   : 1.012
		},
		
		'div, figure, img, video' : {
			width  : '100% !important',
			height : '100% !important'
		},
		
		video : {
			borderRadius : `calc(${ theme.radius.sm } * 2)`,
		}
	},
	
	videoWrap : {
		position : 'relative',
		
		svg : {
			position  : 'absolute',
			top       : '50%',
			left      : '50%',
			transform : 'translate(-50%, -50%)'
		},
		
		video : {
			transform : 'scale(1.12)'
		}
	}
}) )

const VideoPlayer = ( { source }: { source: string } ) => {
	const { classes } = useStyles();
	const [playVideo, setPlayVideo] = useState( false );
	const [playYouTubeVideo, setPlayYouTubeVideo] = useState( false );
	const videoId = source ? extractYouTubeVideoId( source ) : ''
	const videoRef = useRef<HTMLVideoElement | null>( null );
	const isURL = source.includes( 'youtube' );
	
	// Specify the options for the YouTube player
	const opts = {
		width      : '100%',
		height     : '100%',
		playerVars : {
			autoplay : 1,
		},
	};
	
	const handleVideoClick = () => {
		setPlayVideo( ( prevState ) => !prevState );
		if ( videoRef.current ) {
			if ( playVideo ) {
				videoRef.current.pause();
			}
			else {
				videoRef.current.play();
			}
		}
	};
	
	const handleYouTubeVideoClick = () => {
		setPlayYouTubeVideo( ( prevState ) => !prevState );
	};
	
	return (
		<Box className={ classes.videoPlayer }>
			{
				isURL ? (
					<Box className={ classes.videoWrap } onClick={ handleYouTubeVideoClick }>
						{ !playYouTubeVideo &&
              <>
                <Image src={ `https://img.youtube.com/vi/${ videoId }/0.jpg` } alt="Video Thumbnail"/>
                <VideoBtn/>
              </>
						}
						{ playYouTubeVideo && <YouTube videoId={ videoId } opts={ opts }/> }
					</Box>
				) : (
					<Box className={ classes.videoWrap } onClick={ handleVideoClick }>
						<video ref={ videoRef } src={ source } controls={ false }/>
						{ !playVideo && <VideoBtn/> }
					</Box>
				)
			}
		</Box>
	);
};

export default VideoPlayer;

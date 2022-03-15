import React, { useState } from 'react'
import {
	useBlockProps,
	MediaUpload,
	InspectorControls,
	RichText
} from '@wordpress/block-editor';
import {
	ButtonGroup,
	Button,
	Panel,
	PanelBody
} from '@wordpress/components';


const HeadingLevels = [1, 2, 3, 4, 5, 6];

export default function Edit(props) {
	const {
		attributes: { 
			imgURL, 
			imgAlt, 
			content, 
			level 
		},
	} = props;

	const onFileSelect = (img) => {
		props.setAttributes({
			imgURL: img.url,
			imgID: img.id,
			imgAlt: img.alt
		})
	};

	const onChangeContent = (newContent) => {
		props.setAttributes({ content: newContent });
	};

	const onChangeLevel = (newLevel) => {
		props.setAttributes({ level: newLevel });
	};

	const CustomRichText = (
		<RichText
			tagName={`h${level}`}
			onChange={onChangeContent}
			value={content}
			placeholder="Title..."
			className="img-title"
		/>
	)
		
	return (
		<div {...useBlockProps()}>
			{
				props.attributes.imgURL ? (
					<>
						<img
							src={imgURL}
							alt={imgAlt}
						/>
						{CustomRichText}
					</>
				) : (
					<>
						<MediaUpload
							onSelect={onFileSelect}
							value={1}
							allowedTypes={['image']}
							render={({ open }) => (
								<Button onClick={open} variant="primary" className="btn-upload">Upload image</Button>
							)}
						/>
						{CustomRichText}
					</>

				)
			}

			<InspectorControls>
				<Panel>
					<PanelBody title="Size">
						<ButtonGroup>
							{HeadingLevels.map((targetLevel) => (
								<Button
									variant={targetLevel == level ? "primary" : "secondary"}
									onClick={() => onChangeLevel(targetLevel)}
								>
									{'H' + targetLevel}
								</Button>
							))}
						</ButtonGroup>
					</PanelBody>
				</Panel>
			</InspectorControls>
		</div>
	);
}

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


const HeadingLevels = [
	{ label: 'H1', value: 1 },
	{ label: 'H2', value: 2 },
	{ label: 'H3', value: 3 },
	{ label: 'H4', value: 4 },
	{ label: 'H5', value: 5 },
	{ label: 'H6', value: 6 }
]

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
			style={{ margin: "8px 0", textAlign: "center" }}
		/>
	)
		
	return (
		<div className="img-wrapper" {...useBlockProps()}>
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
							{HeadingLevels.map((item) => (
								<Button
									variant={item.value == level ? "primary" : "secondary"}
									onClick={() => onChangeLevel(item.value)}
								>
									{item.label}
								</Button>
							))}
						</ButtonGroup>
					</PanelBody>
				</Panel>
			</InspectorControls>
		</div>
	);
}

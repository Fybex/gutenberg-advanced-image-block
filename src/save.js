import { useBlockProps, RichText } from '@wordpress/block-editor';

export default function save(props) {
	const {
		attributes: { 
			imgURL, 
			imgAlt, 
			content, 
			level 
		},
	} = props;

	const HeadingTag = 'h' + level;

	return (
		<div className="img-wrapper" {...useBlockProps.save()}>
			<img
				src={imgURL}
				alt={imgAlt}
			/>
			<HeadingTag data-level={level}>
				<RichText.Content value={content} />
			</HeadingTag>
			
		</div>
	);
}

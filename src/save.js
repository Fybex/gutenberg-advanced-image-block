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
		<>
			{imgURL ? (
					<div {...useBlockProps.save()
					} >
						<img
							src={imgURL}
							alt={imgAlt}
						/>
						<HeadingTag data-level={level} className="img-title">
							<RichText.Content value={content} />
						</HeadingTag>

					</div >
				) : null }
		</>
	);
}

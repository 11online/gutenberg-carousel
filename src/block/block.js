/**
 * BLOCK: gutenberg-carousel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const TextControl = wp.components.TextControl;
const InspectorControls = wp.blocks.InspectorControls;
const RangeControl = wp.components.RangeControl;
const ColorPalette = wp.blocks.ColorPalette;
// const BlockControls = wp.blocks.BlockControls;
// const AlignmentToolbar = wp.blocks.AlignmentToolbar;
const Dropdown = wp.components.Dropdown;
// const PlainText = wp.blocks.PlainText;
// const RichText = wp.blocks.PlainText;
// const ColorPalette = wp.blocks.ColorPalette;
// const SelectControl = wp.components.SelectControl;
const DropZone = wp.components.DropZone;
const MediaUpload = wp.blocks.MediaUpload;
const Button = wp.components.Button;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */

let attributes = {
	randomKey: {
		type: 'string',
		default: 'carousel'
	},
	interval: {
		type: 'number',
		default: '0'
	},
	indicators: {
		type: 'boolean',
		default: true
	},
	slides: {
		type: 'array',
		default: []
	},
	height: {
		type: 'number',
		default: 400
	},
	width: {
		type: 'number',
		default: 100
	},
	color: {
		tyoe: 'string',
		default: '#fff'
	},
};

registerBlockType( 'cgb/block-gutenberg-carousel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Carousel' ), // Block title.
	icon: 'image-flip-horizontal', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	attributes: attributes,
	keywords: [
		__( 'Carousel' ),
	],

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function({ attributes, setAttributes, focus, setFocus, isSelected, className }) {

		if(attributes.randomKey === 'carousel') {
			const randomKey = "carousel-" + Math.floor(Math.random() * 1000);
			setAttributes({randomKey: randomKey});
		}

		const Controls = focus ? (
			<InspectorControls>
				<RangeControl
					label={ __( 'Height (px):' ) }
					value={ attributes.height }
					onChange={ value => setAttributes( { height: value } ) }
					min={ 100 }
					max={ 600 }
				/>
				<RangeControl
					label={ __( 'Width (%):' ) }
					value={ attributes.width }
					onChange={ value => setAttributes( { width: value } ) }
					min={ 10 }
					max={ 100 }
				/>
				{ __( 'Background Color:' ) }&nbsp;
				<ColorPalette
					value={ attributes.color }
					onChange={ value => setAttributes ( { color: value } ) }
				/>
			</InspectorControls>
		) : null

		const addSlide = (
			<MediaUpload
				onSelect={ ( media ) => {
					console.log( media )
					let newSlides = []
					media.forEach( upload => {
						let newSlide = {
							url: upload.url,
							caption: upload.caption,
							description: upload.description,
							alt: upload.alt,
							thumbnail: upload.sizes.thumbnail.url,
							id: upload.id
						}
						newSlides.push(newSlide)
					} )
					setAttributes( { slides: attributes.slides.concat(newSlides) } )
				} }
				type="image"
				multiple={true}
				render={ ( { open } ) => (
					<Button style={{padding: '0px', margin: '1px'}} onClick={ open }>
						<div style={{height: '150px', width: '150px', borderRadius: '4px', border: '1px dashed #e2e4e7', color: "#e2e4e7"}}>
							<div style={{position: "relative", top: "50%", transform: "translateY(-50%)"}}>
								Add Slide
							</div>
						</div>
					</Button>
				) }
			/>
		)

		const thumbnailControls = (
			<div className="stat-edit-buttons" style={{background: 'rgba(255,255,255,0.7)', position: 'relative', bottom: '37px', display: 'flex', justifyContent: 'space-between'}}>

				<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button">
					<span className="dashicons dashicons-arrow-left-alt2"></span>
				</button>

				<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button">
					<span className="dashicons dashicons-trash"></span>
				</button>

				<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button">
					<span className="dashicons dashicons-arrow-right-alt2"></span>
				</button>
			</div>
		)

		const thumbnail = (slide, i) => {
			return (
				<MediaUpload
					media={ slide.id }
					onSelect={ ( media ) => {
						let newSlides = [ ...attributes.slides ]
						let newSlide = {
							url: media.url,
							caption: media.caption,
							description: media.description,
							alt: media.alt,
							thumbnail: media.sizes.thumbnail.url
						}
						newSlides.splice(i, 1, newSlide)
						setAttributes( { slides: newSlides } )
					} }
					type="image"
					multiple={false}
					render={ ( { open } ) => (
						<Button style={{padding: '0px', height: '150px'}}>
							<img src={slide.thumbnail} style={{margin: '1px', borderRadius: '4px'}} onClick={ open }/>
							{ thumbnailControls }
						</Button>
					) }
				/>
			)
		}

		const ThumbnailGallery = (
			<div className="thumbnail-gallery" style={{display: 'flex', flexWrap: 'wrap',}}>
				{
					attributes.slides.map( (slide, i) => {
						return (
							thumbnail(slide, i)
						)
					})
				}
				{ addSlide }
			</div>
		)

		const renderSlides = slides => {
			return (
				<div className="carousel-inner" role="listbox">
					{
						slides.map( (slide, i) => {
							return (
						    <div className={i === 0 ? "item active" : "item"} style={{backgroundColor: attributes.color}}>
						      <img
									style={{
										width: 'auto',
										height: attributes.height,
										margin: 'auto',
									}}
									src={slide.url} alt={slide.alt}/>
						      <div className="carousel-caption">
						        {slide.caption}
						      </div>
								</div>
							)
						} )
					}
				</div>
			)
		}

		return [
			Controls,
			(
				<div className={className} id={attributes.randomKey}>
					<div id="carousel-example-generic" className="carousel slide container" data-ride="carousel" style={{margin: 'auto', width: attributes.width+'%'}} data-interval={attributes.interval}>

					  <ol className="carousel-indicators" style={{left: '20%'}}>
					    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
					    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
					  </ol>

						{ renderSlides(attributes.slides) }

					  <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
					    <span className="dashicons dashicons-arrow-left-alt2" aria-hidden="true" style={{position: 'relative', top: '50%'}}></span>
					    <span className="sr-only">Previous</span>
					  </a>
					  <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
					    <span className="dashicons dashicons-arrow-right-alt2" aria-hidden="true" style={{position: 'relative', top: '50%'}}></span>
					    <span className="sr-only">Next</span>
					  </a>
					</div>
					{ focus ?
						<div>
							{ ThumbnailGallery }
						</div>
					: null }
				</div>
			)
		]
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function({ attributes, className }) {
		return (
				<div className={className}>
					test
				</div>
			)
		},
} );

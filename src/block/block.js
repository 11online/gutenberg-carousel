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
const BlockControls = wp.blocks.BlockControls;
const AlignmentToolbar = wp.blocks.AlignmentToolbar;
const Dropdown = wp.components.Dropdown;
const PlainText = wp.blocks.PlainText;
const RichText = wp.blocks.PlainText;
const ColorPalette = wp.blocks.ColorPalette;
const SelectControl = wp.components.SelectControl;
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
	}
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
			const randomKey = "carousel" + Math.floor(Math.random() * 1000);
			setAttributes({randomKey: randomKey});
		}

		const addRemoveRow = (
			<div style={{textAlign: 'right'}}>
				{ __("Add Panel:") }&nbsp;
				<button type="button" style={{display: 'inline-block'}} className="components-button components-icon-button" onClick={() => {

				}}><span className="dashicons dashicons-plus"></span></button>
			</div>
		);

		return [
			(
				<div id="carousel-example-generic" className="carousel slide" data-ride="carousel">

				  <ol className="carousel-indicators">
				    <li data-target="#carousel-example-generic" data-slide-to="0" className="active"></li>
				    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
				    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
				  </ol>

				  <div className="carousel-inner" role="listbox">
				    <div className="item active">
				      <img src="https://picsum.photos/200/300/?random" alt="..."/>
				      <div className="carousel-caption">
				        ...
				      </div>
				    </div>
				    <div className="item">
				      <img src="https://picsum.photos/200/300/?random" alt="..."/>
				      <div className="carousel-caption">
				        ...
				      </div>
				    </div>
				    ...
				  </div>

				  <a className="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
				    <span className="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				    <span className="sr-only">Previous</span>
				  </a>
				  <a className="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
				    <span className="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				    <span className="sr-only">Next</span>
				  </a>
				</div>
			),
		];
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
			<div>test</div>
		);
	},
} );

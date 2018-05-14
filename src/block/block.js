/**
 * BLOCK: gutenberg-carousel
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import React from 'react';
import ChromePicker from 'react-color';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const TextControl = wp.components.TextControl;
const InspectorControls = wp.blocks.InspectorControls;
const RangeControl = wp.components.RangeControl;
const ColorPalette = wp.blocks.ColorPalette;
const ToggleControl = wp.components.ToggleControl;
// const BlockControls = wp.blocks.BlockControls;
// const AlignmentToolbar = wp.blocks.AlignmentToolbar;
const Dropdown = wp.components.Dropdown;
const PlainText = wp.blocks.PlainText;
// const RichText = wp.blocks.PlainText;
// const ColorPalette = wp.blocks.ColorPalette;
const SelectControl = wp.components.SelectControl;
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
		default: 0
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
		type: 'string',
		default: '#fff'
	},
	indicators: {
		type: 'boolean',
		default: true
	},
	showCaption: {
		type: 'boolean',
		default: true
	},
	showDescription: {
		type: 'boolean',
		default: true
	},
	currentSlide: {
		type: 'number',
		default: 0
	},
	colorPicker: {
		type: 'string',
		default: 'textColor'
	},
	backdropBorderRadius: {
		type: 'number',
		default: 0
	},
};

registerBlockType( 'cgb/block-gutenberg-carousel', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Carousel' ), // Block title.
	description: __( 'Carousels work best when images share the same dimensions' ),
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
	edit: function({ attributes, setAttributes, isSelected, className }) {

		if(attributes.randomKey === 'carousel') {
			const randomKey = "carousel-" + Math.floor(Math.random() * 1000);
			setAttributes({randomKey: randomKey});
		}

		const Controls = isSelected ? (
			<InspectorControls>
				<ToggleControl
					label={ __( 'Indicators:' ) }
					checked={ !! attributes.indicators }
					onChange={ () => setAttributes( { indicators: ! attributes.indicators } ) }
				/>
				<ToggleControl
					label={ __( 'Show Image Caption:' ) }
					checked={ !! attributes.showCaption }
					onChange={ () => setAttributes( { showCaption: ! attributes.showCaption } ) }
				/>
				<ToggleControl
					label={ __( 'Show Image Description:' ) }
					checked={ !! attributes.showDescription }
					onChange={ () => setAttributes( { showDescription: ! attributes.showDescription } ) }
				/>
				<RangeControl
				label={ __( "Rounded Corners for Text Backdrops:") }
					value={attributes.backdropBorderRadius}
					onChange={ value => setAttributes ( { backdropBorderRadius: value } ) }
					min={0}
					max={20}
					step={2}
				/>
				<RangeControl
					label={ __( 'Autoplay Interval:' ) }
					value={ attributes.interval }
					onChange={ value => {
						setAttributes( { interval: value } )
					} }
					min={ 0 }
					max={ 10 }
					step={ 0.5 }
				/>
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
					let newSlides = []
					media.forEach( upload => {
						let newSlide = {
							url: upload.url,
							caption: upload.caption,
							description: upload.description,
							alt: upload.alt,
							thumbnail: upload.sizes.thumbnail.url,
							id: upload.id,
							textColor: 'rgb(255, 255, 255)',
							backdropColor: 'rgba(0, 0, 0, 0)',
							backdropOpacity: 0,
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
								{ 'Add Slide(s)' }
							</div>
						</div>
					</Button>
				) }
			/>
		)

		const thumbnail = (slide, i) => {

			const swapSlide = {
				left: () => {
					let newSlides = [ ...attributes.slides ]
					let swappedSlide = newSlides.splice(i, 1)[0]
					newSlides.splice(i-1, 0, swappedSlide)
					setAttributes( { slides: newSlides } )
				},
				right: () => {
					let newSlides = [ ...attributes.slides ]
					let swappedSlide = newSlides.splice(i, 1)[0]
					newSlides.splice(i+1, 0, swappedSlide)
					setAttributes( { slides: newSlides } )
				},
			}

			const deleteSlide = () => {
				if ( attributes.currentSlide === i && attributes.slides.length - 1 === i ) {
					selectSlide(i-1)
				}
				else if ( attributes.currentSlide === attributes.slides.length - 1 ) {
					selectSlide(attributes.currentSlide-1)
				}
				let newSlides = [ ...attributes.slides ]
				newSlides.splice(i, 1)
				setAttributes( { slides: newSlides } )
			}

			const selectSlide = (slide) => {
				jQuery('#'+attributes.randomKey).carousel(slide)
				changeCurrentSlide.direct(slide)
			}

			const renderThumbnailControls = (editSlideButton) => {
				return (
					<div className="stat-edit-buttons" style={{background: 'rgba(255,255,255,0.7)', position: 'relative', bottom: '37px', display: 'flex', justifyContent: 'space-between'}}>
					{ i > 0 ? (
						<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button" onClick={ () => {
							swapSlide.left()
						} }>
							<span className="dashicons dashicons-arrow-left-alt2"></span>
						</button> ) : null }

						{ editSlideButton }

						{ thumbnailOptionsButton }

						<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button" onClick={ () => {
							deleteSlide()
						} }>
							<span className="dashicons dashicons-trash"></span>
						</button>

					{ i < attributes.slides.length - 1 ? (
						<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button" onClick={ () => {
							swapSlide.right()
						} }>
							<span className="dashicons dashicons-arrow-right-alt2"></span>
						</button> ) : null }
					</div>
				)
			}

			const editSlideButton = (
				<MediaUpload
					media={ slide.id }
					onSelect={ ( media ) => {
						let newSlides = [ ...attributes.slides ]
						let newSlide = {
							url: media.url,
							caption: media.caption,
							description: media.description,
							alt: media.alt,
							thumbnail: media.sizes.thumbnail.url,
							textColor: newSlides[i].textColor,
							backdropColor: newSlides[i].backdropColor,
							backdropOpacity: newSlides[i].backdropOpacity,
						}
						newSlides.splice(i, 1, newSlide)
						setAttributes( { slides: newSlides } )
					} }
					type="image"
					multiple={false}
					render={ ( { open } ) => (
						<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button" onClick={ open }>
							<span className="dashicons dashicons-format-image"></span>
						</button>
					) }
				/>
			)

			const thumbnailOptionsButton = (
				<Dropdown
					className="thumbnail-options-button"
					contentClassName="thumbnail-options-box-container"
					position="bottom right"
					renderToggle={ ( { isOpen, onToggle } ) => (
							<button  style={{paddingLeft: "2px", paddingRight: "2px"}} className="components-button components-icon-button" onClick={ onToggle }  aria-expanded={ isOpen }>
								<span className="dashicons dashicons-admin-generic" onClick={() => selectSlide(i)}></span>
							</button>
					) }
					renderContent={ () => renderThumbnailOptionsBox() }
				/>
			)

			const renderThumbnailOptionsBox = () => {

				const renderColorControlBox = (attribute) => {

					function hexToRgb(hex, alpha) {
						if ( hex ) {
					    hex   = hex.replace('#', '');
					    var r = parseInt(hex.length == 3 ? hex.slice(0, 1).repeat(2) : hex.slice(0, 2), 16);
					    var g = parseInt(hex.length == 3 ? hex.slice(1, 2).repeat(2) : hex.slice(2, 4), 16);
					    var b = parseInt(hex.length == 3 ? hex.slice(2, 3).repeat(2) : hex.slice(4, 6), 16);
					    if ( alpha || alpha === 0 ) {
					      return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
					    }
					    else {
					      return 'rgb(' + r + ', ' + g + ', ' + b + ')';
					    }
					  }
						else {
							if ( alpha || alpha === 0 ) {
								let newSlides = [ ...attributes.slides ]
								newSlides[i].backdropOpacity = 0
								setAttributes( { slides: newSlides } )
								return 'rgba(0, 0, 0, 0)'
							}
							else {
					      return 'rgb(255, 255, 255)'
					    }
						}
					}

					const checkAttributeType = (attribute, value) => {
						let newSlides = [ ...attributes.slides ]
						if (attribute === 'backdropColor') {
							newSlides[i][attribute] = hexToRgb(value, slide.backdropOpacity)
						}
						else {
							newSlides[i][attribute] = hexToRgb(value)
						}
						setAttributes( { slides: newSlides } )
					}

					return (
						<div className='color-control-box' style={{padding: '10px'}}>
							<ColorPalette
								disableCustomColors
								onChange={ value => checkAttributeType(attribute, value) }
								value={attributes.slides[i][attribute]}
							/>
							<div class="components-color-palette__item-wrapper components-color-palette__custom-color">
								<div>
									<button type="button" aria-expanded="false" class="components-color-palette__item" aria-label="Custom color picker"
									onClick={ () => setAttributes( { customColor: ! attributes.customColor } ) }>
										<span class="components-color-palette__custom-color-gradient"></span>
									</button>
								</div>
							</div>
							{ attributes.customColor ?
								<ChromePicker
									style={{width: '100%'}}
									color={ attributes.slides[i][attribute] }
									onChangeComplete={ color => checkAttributeType(attribute, color.hex) }
									style={ { width: '100%' } }
									disableAlpha
								/>
							: null }
						</div>
					)
				}

				const convertBackdropColor = (colorString, value) => {
					let colorStringArr = colorString.split(' ')
					colorStringArr[colorStringArr.length-1] = `${value})`
					colorString = colorStringArr.join(' ')
					return colorString
				}

				const applyAllButton = (
					<button onClick={ () => handleApplyAll() } style={{width: '100%'}}>Apply All</button>
				)

				const handleApplyAll = () => {
					let c = confirm("Are you sure you want to apply these settings to ALL slides? This action will overwrite previous settings.")
					if (c) {
						applyAll()
					}
					else {
						return
					}
				}

				const applyAll = () => {
					let newSlides = [ ...attributes.slides ]
					let changedSlides = newSlides.map( ( s ) => {
						s.textColor = newSlides[i].textColor
						s.backdropColor = newSlides[i].backdropColor
						s.backdropOpacity = newSlides[i].backdropOpacity
						return s
					})
					console.log(changedSlides)
					setAttributes( { slides: changedSlides } )
				}

				return (
					<div className='thumbnail-options-box' style={{padding: '10px'}}>
						<SelectControl
						 label={ __("Select Color For:") }
						 value={ attributes.colorPicker }
						 options={ [
							 { value: 'textColor', label: 'Text' },
							 { value: 'backdropColor', label: 'Backdrop' }
						 ] }
						 onChange={ value => setAttributes( { colorPicker: value } ) }
						/>
						{ renderColorControlBox(attributes.colorPicker) }
						<RangeControl
							label={ __( "Backdrop Opacity:") }
							value={slide.backdropOpacity}
							onChange={ value => {
								let newSlides = [ ...attributes.slides ]
								newSlides[i].backdropOpacity = value
								newSlides[i].backdropColor = convertBackdropColor(newSlides[i].backdropColor, value)
								setAttributes( { slides: newSlides } )
							} }
							min={0}
							max={1}
							step={0.05}
						/>
						{ applyAllButton }
					</div>
				)
			}

			return ( //Finally, return value for thumbnail()
				<Button style={{padding: '0px', height: '150px'}}>
					<img src={slide.thumbnail} style={{margin: '1px', borderRadius: '4px'}} onClick={ () => {
						selectSlide(i)
					} }/>
					{ renderThumbnailControls(editSlideButton) }
				</Button>
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

		const renderPlainText = (field, i) => {
			return (
				<PlainText
					style={ { backgroundColor: 'rgba(0,0,0,0)', textAlign: 'center',  color: attributes.slides[i].textColor } }
					value={ attributes.slides[i][field] }
					onChange={ value => {
						let newSlides = [ ...attributes.slides ]
						newSlides[i][field] = value
						setAttributes( { slides: newSlides } )
					} }
					placeHolder={ field }
				/>
			)
		}

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
										<div className="carousel-backdrop" style={{backgroundColor: slide.backdropColor, borderRadius: `${attributes.backdropBorderRadius}px`}}>
							        { attributes.showCaption ? (
												<h3 style={{color: slide.textColor}}>
													{ renderPlainText('caption', i) }
												</h3>
											) : null }
											{ attributes.showDescription ? (
												<p style={{color: slide.textColor }}>
													{ renderPlainText('description', i) }
												</p>
											) : null }
										</div>
						      </div>
								</div>
							)
						} )
					}
				</div>
			)
		}

		const renderIndicators = slides => {
			return attributes.indicators ? (
					<ol className="carousel-indicators" style={{left: '20%'}}>
						{ slides.map( (slide, i) => {
							return (
								<li data-target={'#'+attributes.randomKey} key={i} data-slide-to={i} className={ i === 0 ? "active" : null }></li>
							)
						} ) }
					</ol>
				) : null
		}

		const changeCurrentSlide = {
			left: () => {
				if ( attributes.currentSlide != 0 ) {
					setAttributes( { currentSlide: attributes.currentSlide - 1 } )
				} else {
					setAttributes( { currentSlide: attributes.slides.length - 1 } )
				}
			},
			right: () => {
				if ( attributes.currentSlide != attributes.slides.length - 1 ) {
					setAttributes( { currentSlide: attributes.currentSlide + 1 } )
				} else {
					setAttributes( { currentSlide: 0 } )
				}
			},
			direct: (slide) => {
				setAttributes( { currentSlide: slide } )
			}
		}

		return [
			Controls,
			(
				<div className={className} id={className+'-'+attributes.randomKey}>
					<div id={attributes.randomKey} className="carousel slide container" data-ride="carousel" style={{margin: 'auto', width: attributes.width+'%'}} data-interval={0}>

					  { renderIndicators(attributes.slides) }
						{ renderSlides(attributes.slides) }

					  <a className="left carousel-control" href={'#'+attributes.randomKey} role="button" data-slide="prev" onClick={ () => changeCurrentSlide.left()}>
					    <span className="dashicons dashicons-arrow-left-alt2" aria-hidden="true" style={{position: 'relative', top: '50%'}}></span>
					    <span className="sr-only">Previous</span>
					  </a>
					  <a className="right carousel-control" href={'#'+attributes.randomKey} role="button" data-slide="next" onClick={ () => changeCurrentSlide.right()}>
					    <span className="dashicons dashicons-arrow-right-alt2" aria-hidden="true" style={{position: 'relative', top: '50%'}}></span>
					    <span className="sr-only">Next</span>
					  </a>
					</div>
					{ isSelected ?
						<div>
							{ ThumbnailGallery }
						</div>
					: null }
				</div>
			),
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
										<div className="carousel-backdrop" style={{borderRadius: attributes.backdropBorderRadius, backgroundColor: slide.backdropColor}}>
							        { attributes.showCaption ? (
												<h3 style={{color: slide.textColor, paddingTop: '0.25em', paddingBottom: attributes.showDescription ? '0px' : '0.25em'}}>
													{ slide.caption }
												</h3>
											) : null }
											{ attributes.showDescription ? (
												<p style={{color: slide.textColor, paddingBottom: '0.25em', addingTop: attributes.showCaption ? '0px' : '0.25em'}}>
													{ slide.description }
												</p>
											) : null }
										</div>
						      </div>
								</div>
							)

						} )
					}
				</div>
			)
		}

		const renderIndicators = slides => {
			return attributes.indicators ? (
					<ol className="carousel-indicators">
						{ slides.map( (slide, i) => {
							return (
								<li data-target={'#'+attributes.randomKey} key={i} data-slide-to={i} className={ i === 0 ? "active" : null }></li>
							)
						} ) }
					</ol>
				) : null
		}

		return (
				<div className={className} id={className+'-'+attributes.randomKey}>
					<div id={attributes.randomKey} className="carousel slide container" data-ride="carousel" style={{margin: 'auto', width: attributes.width+'%'}} data-interval={attributes.interval * 1000}>

					  { renderIndicators(attributes.slides) }
						{ renderSlides(attributes.slides) }

					  <a className="left carousel-control" href={'#'+attributes.randomKey} role="button" data-slide="prev">
					    <span className="dashicons dashicons-arrow-left-alt2" aria-hidden="true" style={{position: 'relative', top: '50%'}}></span>
					    <span className="sr-only">Previous</span>
					  </a>
					  <a className="right carousel-control" href={'#'+attributes.randomKey} role="button" data-slide="next">
					    <span className="dashicons dashicons-arrow-right-alt2" aria-hidden="true" style={{position: 'relative', top: '50%'}}></span>
					    <span className="sr-only">Next</span>
					  </a>
					</div>
				</div>
			)
		}
} );

import React, { Component, PropTypes } from 'react';

class ImagePanel extends Component {
	constructor(props) {
		super(props);
		console.log(props);
	}

	render() {
		return (
			<div className='image-panel'>
				<div>图片</div>
			</div>
		)
	}
}

export default ImagePanel
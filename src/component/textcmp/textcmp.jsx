import React, {Component} from 'react';

import './textcmp.less';

class TextCmp extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<div className='cmp-inner text-cmp' style={this.props.innerStyle} data-id={this.props.data.id}>
				{this.props.data.text}
			</div>
		)
	}
}

export default TextCmp
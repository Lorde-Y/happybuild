import React, {Component} from 'react';

import './btncmp.less';

class BtnCmp extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			<button className='cmp-inner btn-cmp' style={this.props.innerStyle} data-id={this.props.data.id}>
				{this.props.data.text}
			</button>
		)
	}
}

export default BtnCmp
import React, {Component} from 'react';

import './enhancer.less';

export default function Enhancer(Cmp) {
	class EnhancerCmp extends Component {
		constructor(props) {
			super(props);
		}

		render() {
			const { style, id, type } = {...this.props.cmpData};
			const { position, left, top, ...others } = {...style};
			const outerStyle = {
				position: position,
				left: `${left}px`,
				top: `${top}px`
			};
			return (
				<div 
					id={`CMP_${type}_${id}`} 
					className={`wrapper-cmp ${this.props.active ? 'active' : ''}`} 
					style={outerStyle}
				>
					<Cmp
						data={this.props.cmpData}
						innerStyle={{...others}}
					/>
				</div>
			)
		}
	}
	return EnhancerCmp
}
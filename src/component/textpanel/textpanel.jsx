import React, { Component, PropTypes } from 'react';

import { textCmp } from 'config/cmp';

import './textpanel.less';

const textItems = [{
	text: '标题1',
	class: 'title',
	style: {
		fontSize: 48
	}
},{
	text: '标题2',
	class: 'sub-title',
	style: {
		fontSize: 36
	}
},{
	text: '正文',
	class: 'main-body',
	style: {
		fontSize: 16
	}
},{
	text: '段落字体',
	class: 'section',
	style: {
		fontSize: 24
	}
},{
	text: 'BOLD TITLE',
	class: 'bold',
	style: {
		fontSize: 24,
		fontWeight: 'bold'
	}
}];

const SetTextCmp = ({ textItems, onClick }) => (
	<div className='text-panel'>
		{
			textItems.map((items, idx)=> {
				return (
					<div 
						className={`text-opts ${items.class}`} 
						key={idx} 
						style={items.style}
						onClick={ ()=> onClick(items) }
					>
						{items.text}
					</div>
				)
			})
		}
	</div>
);

class TextPanel extends Component {
	constructor(props) {
		super(props);
	}

	handleCmpClick = (data)=> {
		const { style, ...others } = {...textCmp};
		const cmpData = {
			...others,
			text: data.text,
			style: {
				...style,
				...data.style
			}
		};
		this.props.createCmp(cmpData);
	};

	render() {
		return (
			<SetTextCmp
				onClick={ style => this.handleCmpClick(style) }
				textItems={textItems}
			/>
		)
	}
}

export default TextPanel
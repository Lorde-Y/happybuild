import React, { Component, PropTypes } from 'react';

import { btnCmp } from 'config/cmp';
import custombtn from 'config/custombtn';

import './btnpanel.less';

const CustomBtn = ({data, onClick})=> (
	<ul className='clearfix'>
		{
			data.map((item, id)=> {
				return (
					<li key={id} style={item.style} onClick={ ()=> { onClick(item) } }>
						{item.text}
					</li>
				)
			})
		}
	</ul>
);

class BtnPanel extends Component {
	constructor(props) {
		super(props);
	}

	handleBtnClick = (data)=> {
		const { style, ...others } = { ...btnCmp };
		const { text, btnType } = { ...data };
		const btnData = {
			...others,
			text,
			btnType,
			style: {
				...style,
				...data.style
			}
		}
		this.props.createCmp(btnData);
	};

	render() {
		return (
			<div className='btn-panel'>
				<CustomBtn 
					data={custombtn}
					onClick={ (data)=> this.handleBtnClick(data) }
				/>
			</div>
		)
	}
}

export default BtnPanel
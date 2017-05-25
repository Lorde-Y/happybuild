import React, { Component, PropTypes } from 'react';

import TextPanel from 'component/textpanel';
import BtnPanel from 'component/btnpanel';
import ImagePanel from 'component/imagepanel';

import './elementpanel.less';

const elementPanels = [
	{
		type: 'text',
		panel: TextPanel
	},{
		type: 'image',
		panel: ImagePanel
	},{
		type: 'btn',
		panel: BtnPanel
	}
];

let showPanels = [];

const TogglePanel = ({ type, showPanels, createCmp }) => (
	<div className='element-panel'>
		{
			showPanels.map( (items, id)=> {
				const Panel = items.panel;
				const active = items.type === type ? 'active' : '';
				return (
					<div className={`cmp-panel cmp-${items.type} ${active}`} key={id}>
						<Panel 
							createCmp={createCmp}
						/>
					</div>
				)
			})
		}
	</div>
);

class ElementPanel extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { type } = {...this.props};
		const idx = elementPanels.findIndex( item => item.type === type);
		const id = showPanels.findIndex( item => item.type === type);
		if (id === -1) {
			showPanels.push(elementPanels[idx]);
		}
		return (
			<TogglePanel
				showPanels={showPanels}
				type={this.props.type}
				createCmp={ this.props.createCmp }
			/>
		)
	}
}

ElementPanel.defaultProps = {
	type: 'text'
}

ElementPanel.propTypes = {
	type: React.PropTypes.string
}

export default ElementPanel
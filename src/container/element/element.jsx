import React, {Component} from 'react';

import ElementPanel from 'component/elementpanel';

import * as actionCreators from 'action/page';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import './element.less';

const elementArr = [
	{
		text: '文字',
		type: 'text',
		icon: null
	},{
		text: '图片',
		type: 'image',
		icon: null
	},{
		text: '按钮',
		type: 'btn',
		icon: null
	}
];

const ElementTypes = ({currType, typesArr, onClick}) => (
	<ul className='element-ul'>
		{
			typesArr.map((item, id)=> {
				let type = item.type;
				return (
					<li 
						className={ type=== currType ? 'active' : ''} 
						key={id} 
						onClick={ () => onClick(type) }
					>
						{item.text}
					</li>
				)
			})
		}		
	</ul>
);

class Element extends Component {
	constructor(props) {
		super(props);
		this.state = {
			type: 'text'
		};
	}

	handleElementClick = (type)=> {
		this.setState({type: type});
	};

	handleCreateCmp = (data)=> {
		this.props.createCmp(data)
	};

	render() {
		return (
			<aside className='element'>
				<ElementTypes
					currType={this.state.type}
					typesArr={elementArr}
					onClick={ type => this.handleElementClick(type)}
				/>
				<ElementPanel
					type={this.state.type}
					createCmp={ data => this.handleCreateCmp(data) }
				/>
			</aside>
		)
	}
}

function mapStateToProps(state={}) {
	return {
		data: {...state}
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		createCmp: actionCreators.createCmp
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Element)
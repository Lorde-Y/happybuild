import React, {Component} from 'react';
import Element from 'container/element';
import Canvas from 'container/canvas';
import Proxy from 'container/proxy';

class Root extends Component {
	constructor(props) {
		super(props);
	}

	render(){
		return (
			<div className='root'>
				<Element />
				<Canvas />
				<Proxy />
			</div>
		)
	}
}

export default Root
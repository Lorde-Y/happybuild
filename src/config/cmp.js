const cmpStyle = {
	position: 'absolute',
	left: 0,
	top: 0,
	borderRadius: 0,
	borderWidth: 0,
	borderColor: 'transparent'
}

let textCmp = {
	type: 'text',
	style: {
		...cmpStyle,
		width: 320,
		height: 'auto',
		color: '#000',
		fontSize: 16,
		lineHeight: 1,
		textAlign: 'center',
		textDecoration: 'none',
		fontWeight: 'normal',
		fontStyle: 'normal'
	}
};

let imgCmp = {
	type: 'image',
	style: {
		...cmpStyle,
		width: 120,
		height: 80
	}
};

let btnCmp = {
	type: 'btn',
	style: {
		...cmpStyle,
		width: 80,
		height: 30,
		color: '#fff',
		fontSize: 12,
		textAlign: 'center',
		background: '#ff8533'
	}
};

export { textCmp, imgCmp, btnCmp }
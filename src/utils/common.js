const isArray = (arr) => {
	return Array.isArray(arr);
};			

export const isPlainObject = (obj) => {
	if(!obj || Object.prototype.toString.call(obj) !== '[object Object]') {
		return false;
	}
	const hasOwn = Object.prototype.hasOwnProperty;
	const fnToString = hasOwn.toString;
	const ObjectFunctionString = fnToString.call( Object );

	const proto = Object.getPrototypeOf(obj);
	const Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

	return typeof Ctor === 'function' && fnToString.call(Ctor) === ObjectFunctionString;
};

export const isEmptyObject = (obj) => {
	let name;
	for(name in obj) {
		return false;
	}
	return true;
}

export function deepCopy(result, obj) {
    // let result = {};
    for(let key of Object.keys(obj)) {
        if (typeof obj[key] === 'object') {
        	if (isArray(obj[key])) {
        		result[key] = [].concat(obj[key]);
        	}else {
        		result[key] = deepCopy({}, obj[key])
        	}
        }else {
            result[key] = obj[key]
        }
    }
    return result
}

// 深拷贝
// export const deepCopy = (dist, ...args) => {
// 	let src, copy, copyIsArray, clone;

// 	if(typeof dist !== 'object') {
// 		dist = {};
// 	}
// 	for(const arg of args) {
// 		for(const key in arg) {
// 			src = dist[ key ];
// 			copy = arg[ key ];
// 			// if(dist === copy) {
// 			// 	continue;
// 			// }
// 			if(copy && (isPlainObject(copy)) ||
// 				(copyIsArray = (isArray(copy))) ) {
// 				if(copyIsArray) {
// 					copyIsArray = false;
// 					clone = src && isArray(src) ? src : [];
// 				} else {
// 					clone = src && (typeof src === 'object') ? src : {};
// 				}
// 				dist[ key ] = deepCopy(clone, copy);
// 			} else if(copy !== undefined) {
// 				dist[ key ] = copy;
// 			}
// 		}
// 	}
// 	return dist;
// };


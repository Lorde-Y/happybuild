export function getMousePosition(event) {
	return {
		x: event.pageX - (window.scrollX || window.pageXOffset),
		y: event.pageY - (window.scrollY || window.pageYOffset)
	}
}

export function	pauseEvent (event) {
	event.stopPropagation();
	event.preventDefault();
}

export function addEventsToDocument(eventsObj) {
	for (let event in eventsObj) {
		document.addEventListener(event, eventsObj[event]);
	}
}

export function removeEventsFromDocument(eventsObj) {
	for (let event in eventsObj) {
		document.removeEventListener(event, eventsObj[event]);
	}
}
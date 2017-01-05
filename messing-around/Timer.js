class Timer {
	constructor() {
		this.messageStyle = 'color: #ff00ff; font-weight: bold; font-size: 20px';		
	}
	start() { 
		console.time(); 
		console.log('%c Start timer!', this.messageStyle); 
	}
	end() {
		console.timeEnd();
		console.log('%c End timer!', this.messageStyle); 
	}
	wait(delay) {
		console.log('%c Start wait!', this.messageStyle); 
		setTimeout(() => {
			console.log('%c End wait!', this.messageStyle); 
		}, delay * 1000);
	}
}

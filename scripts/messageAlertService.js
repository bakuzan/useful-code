(function() {
   'use strict';
   
   var masMessage = document.createElement('span');
   masMessage.id = 'message-alert-system-message';
   masMessage.style.cssText = `
     display: none;
     position: fixed;
	 bottom: 40px;
	 right: 40px;
	 width: 150px;
	 height: 50px;
	 background-color: #000;
	 color: #fff;
	 border: 1px solid #fff;
	 font-size: 12px;
	 font-weight: 600;
	 font-family: Arial,Helvetica,sans-serif;
	 z-index: 10000;
   `;
   document.body.appendChild(masMessage);
   
   function toggleMasMessage() {
	   masMessage.style.display = 'block';
	   window.setTimeout(function() {
		   masMessage.style.display = 'none';
	   }, 2500);
   }
   
   function setMasMessageColour(colour) {
	   masMessage.style['background-color'] = colour;
   }
   
   function setMasMessageText(text) {
	   masMessage.textContent = text;
   }
   
   var mas = {
	   displayMessage: function(message) {
		   setMasMessageColour('#00ff00');
		   setMasMessageText(message);
		   toggleMasMessage();
	   },
	   displayError: function(error) {
		   setMasMessageColour('#ff0000');
		   setMasMessageText(error);
		   toggleMasMessage();
	   }
   };
   
})();

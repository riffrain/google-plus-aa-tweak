chrome.extension.onRequest.addListener(
function(request, sender, callback) {
   	 if (request.getOptions){
   	 	 callback(localStorage);
   	 }
   }
);
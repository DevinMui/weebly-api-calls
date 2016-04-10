/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function(){
	var url;
	var method;
	var params;
	var headers;
	var external_edit;
	var format;
	var MyElement = PlatformElement.extend({
		initialize: function(){
			url = this.settings.get("url")
			method = this.settings.get("method")
			params = this.settings.get("parameters")
			headers = this.settings.get("headers")
			external_edit = this.settings.get("external_edit")
			format = this.settings.get("format").split(" ")
			//if(url !=== " "){
				debugger
				if(method === 'GET'){
					console.log('GET')
					jQuery.get(url).done(function(html){
						console.dir(html)
						var html_code=""
						$('#api_data').empty()
						if(html.length === undefined){
							for (i=0; i<format.length; i++){
									if(format[i] === "<br>"){
										html_code += "<br>"
									} else {
										var item = html[format[i]] // html[0]["name"]
										html_code += item + " " // return something like "John"
									}
							}
							$('#api_data').append("<p>" + html_code + "</p>") // "John j@j.com <br> 16"
						} else {
							for(x=0;x<html.length;x++){
								for (i=0; i<format.length; i++){
									if(format[i] === "<br>"){
										html_code += "<br>"
									} else {
										var item = html[x][format[i]] // html[0]["name"]
										console.log(item)
										html_code += item + " "// return something like "John"
									}
								}
								$('#api_data').append("<p>" + html_code + "</p>") // "John j@j.com <br> 16"
							}
						}
					}).fail(function(error){
						console.log(error)
					})
				}
			//}

		}
	});

	return MyElement;
})();
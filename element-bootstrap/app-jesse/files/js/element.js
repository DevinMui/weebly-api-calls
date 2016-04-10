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
			params = this.settings.get("parameters").split(",")
			headers = this.settings.get("headers")
			external_edit = this.settings.get("external_edit")
			format = this.settings.get("format").split(" ")

			// if headers
			console.log("data" + params)
			console.log("headers" + headers)
			if(headers && params){
				$.ajaxSetup({headers: headers, data: params})
			} else if(headers){
				$.ajaxSetup({headers: headers})
			} else if(data){
				$.ajaxSetup({data: params})
			}

			var item = {
				url: url,
				/*data: params,
				headers: headers*/
			}

			if(method === 'GET'){
				jQuery.get(url).done(function(html){
					console.dir(html)
					jsonParser(html,format)
				}).fail(function(error){
					console.log(error)
				})
			} else if(method === 'POST'){
				$.post(url, params).done(function(html){
					jsonParser(html,format)
				})
			} else if(method === 'PUT'){
				$.put(item).done(function(html){
					jsonParser(html,format)
				})
			} else if(method === 'DELETE'){
				$.delete(item).done(function(html){
					jsonParser(html,format)
				})
			} else if(method === 'PATCH'){
				$.patch(item).done(function(html){
					jsonParser(html,format)
				})
			}
		}
	});

	return MyElement;
})();

// define custom methods
jQuery.each( [ "put", "delete", "patch" ], function( i, method ) {
  jQuery[ method ] = function( url, data, callback, type ) {
    if ( jQuery.isFunction( data ) ) {
      type = type || callback;
      callback = data;
      data = undefined;
    }

    return jQuery.ajax({
      url: url,
      type: method,
      dataType: type,
      data: data,
      success: callback
    });
  };
});

function jsonParser(html, format){
	console.log(format)
	if(html.length === undefined){
		for (i=0; i<format.length; i++){
				if(format[i] === "<br>"){
					html_code += "<br>"
				} else if(format[i] === "\s"){ // cuz spaces stripped out
					html_code += " "
				} else {
					var item = html[format[i]] // html[0]["name"]
					html_code += item // return something like "John"
				}
		}
		html_code = html_code.replace("undefined", "")
		$('#api_data').append("<p>" + html_code + "</p>") // "John j@j.com <br> 16"
		//$('#results').append("<p>" + html_code.replace("undefined", "") + "</p>") // i feel sorry for people named undefined now
		//unshrekt ex de nice troll plox
	} else {
		for(x=0;x<html.length;x++){
			var html_code=""
			for (i=0; i<format.length; i++){
				if(format[i] === "<br>"){
					html_code += "<br>"
				} else if(format[i] === "\s"){ // cuz spaces stripped out
					html_code += " "
				} else {
					var item = html[x][format[i]] // html[0]["name"]
					console.log(item)
					html_code += item // return something like "John"
				}
			}
		}
		html_code = html_code.replace("undefined", "")
		$('#api_data').append("<p>" + html_code + "</p>") // "John j@j.com <br> 16"
		//$('#results').append("<p>" + html_code + "</p>")
	}
}
/**
 * This is required for element rendering to be possible
 * @type {PlatformElement}
 */
(function(){
	var url
	var method
	var parameters
	var headers
	var external_edit
	var MyElement = PlatformElement.extend({
		initialize.function(){
			url = this.settings.get("url")
			method = this.settings.get("method")
			parameters = this.settings.get("parameters")
			headers = this.settings.get("headers")
			external_edit = this.settings.get("external_edit")

			var item = {
				url: url,
				data: params,
				headers: headers
			}
			if(method === 'GET'){
				$.get(item).done(function(html){
					console.dir(html)
				})
			} else if(method === 'POST'){
				$.post(item).done(function(html){
					console.dir(html)
				})
			} else if(method === 'PUT'){
				$.put(item).done(function(html){
					console.dir(html)
				})
			} else if(method === 'DELETE'){
				$.delete(item).done(function(html){
					console.dir(html)
				})
			} else if(method === 'PATCH'){
				$.patch(item).done(function(html){
					console.dir(html)
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
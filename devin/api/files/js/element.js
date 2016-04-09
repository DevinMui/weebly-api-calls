(function() {
    var Api = PlatformElement.extend({
        initialize: function() {
            // we normalize the styles on initial load.
            $(document).ready(function() {
                this.fixStyles();
            }.bind(this));

            this.fixStyles();
        },

        /**
         * Lots of styles are applied by default to editable areas of
         * the editor. To make the element looks how you want, some styles
         * need to be overwritten.
         */
        fixStyles: function() {
            this.$('.editable-text').each(function(index, value) {
                $(value).attr('style', '');
            });

            this.$('.element').each(function(index, value) {
                $(value).attr('style', '');
            });
        }
    });

    return Api;
})();
/**
 * Uses leaflet
 */
(function($) {

    var Alpaca = $.alpaca;

    Alpaca.Fields.GeoreferenceField = Alpaca.Fields.TextField.extend(
    /**
     * @lends Alpaca.Fields.GeoreferenceField.prototype
     */
    {
        /**
         * @see Alpaca.Fields.TextField#setup
         */
        setup: function()
        {
            var self = this;
            console.log("testing availability 2");
            this.GeoreferenceFieldAvailable = false;
            if (!self.isDisplayOnly() && typeof(L) !== "undefined")
            {
	            console.log("georeference : ok");
                this.GeoreferenceFieldAvailable = true;
            }

            this.base();

            // set up default spectrum settings
            if (typeof(this.options.georeference) === "undefined")
            {
                this.options.georeference = {};
            }

        },

        /**
         * @see Alpaca.Fields.TextField#getFieldType
         */
        getFieldType: function() {
            return "georeference";
        },

        /**
         * @see Alpaca.Fields.TextField#getType
         */
        getType: function() {
            return "string";
        },

        afterRenderControl: function(model, callback)
        {
            var self = this;

            this.base(model, function() {

                if (self.control)
                {
                    // if we can render the plugin...
                    if (self.GeoreferenceFieldAvailable && self.options.georeference)
                    {
                        if (self.data) {
                            $(self.control).attr("value", self.data);
                        }

                        $(self.control).addClass("georeference");

                        $(self.control).on("change", function(e) {
                            self.setValue($(this).val());
                        });
                    }
                    console.log(self.getId());
                    console.log(self.control[0].id);
                    /*var container = self.getContainerEl();

                    // apply additional css
                    $(container).addClass("alpaca-georeference");
                    $('<div style="clear:both;"></div>').appendTo(container);

                    var mapCanvasId = self.getId() + "-map-canvas";
                    if ($('#' + mapCanvasId).length === 0)
                    {
                        $("<div id='" + mapCanvasId + "' class='alpaca-field-address-mapcanvas'></div>").appendTo(self.getFieldEl());
                    }

                    var map = L.map(mapCanvasId).setView([51.505, -0.09], 13);

                    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    }).addTo(map);

                    L.marker([51.5, -0.09]).addTo(map)
                        .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
                        .openPopup();
                    */
                }

                callback();
            });
        }

        /* builder_helpers */
        ,

        /**
         * @see Alpaca.Fields.TextField#getTitle
         */
        getTitle: function() {
            return "Georeference";
        },

        /**
         * @see Alpaca.Fields.TextField#getDescription
         */
        getDescription: function() {
            return "A georeferencer using Leaflet";
        }

        /* end_builder_helpers */
    });

    Alpaca.registerFieldClass("georeference", Alpaca.Fields.GeoreferenceField);

})(jQuery);

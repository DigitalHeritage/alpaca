/**
 * Bulma Theme ("bulma")
 *
 * Defines the Alpaca theme for Bulma 0.7+ with Font Awesome 5 icons.
 *
 * The views are:
 *
 *    bulma-view
 *    bulma-edit
 *    bulma-create
 *
 * This theme can also be selected by specifying the following view:
 *
 *    {
 *       "ui": "bulma",
 *       "type": "view" | "edit" | "create"
 *    }
 *
 */
(function($) {

    var Alpaca = $.alpaca;

    // custom styles
    var styles = {};
    styles["button"] = "button is-light";
    styles["smallButton"] = "button is-light is-small";
    styles["addIcon"] = "fas fa-plus";
    styles["removeIcon"] = "fas fa-minus";
    styles["upIcon"] = "fas fa-arrow-up";
    styles["downIcon"] = "fas fa-arrow-down";
    styles["expandedIcon"] = "fas fa-expand";
    styles["collapsedIcon"] = "fas fa-compress";
    styles["table"] = "table is-striped is-bordered is-hoverable";

    // custom callbacks
    var callbacks = {};
    callbacks["required"] = function()
    {
        var fieldEl = this.getFieldEl();

        // required fields get a little star in their label
        //var label = $(fieldEl).find("label.alpaca-control-label");
        //$('<span class="alpaca-icon-required glyphicon glyphicon-star"></span>').prependTo(label);
        var label = $(fieldEl).find("label.alpaca-control-label");
        if ($(label).length > 0)
        {
            $(label).append("<span class='alpaca-required-indicator'>(required)</span>")
        }

    };
    callbacks["invalid"] = function()
    {
        // if this is a control field, add class "has-error"
        if (this.isControlField)
        {
            $(this.getFieldEl()).addClass('has-error');
        }

        /*
        // if this is a container field, add class "has-error"
        if (this.isContainerField)
        {
            $(this.getFieldEl()).addClass('has-error');
        }
        */

    };
    callbacks["valid"] = function()
    {
        // valid fields remove the class 'has-error'
        $(this.getFieldEl()).removeClass('has-error');
    };
    callbacks["control"] = function()
    {
        // controls get some special formatting

        // fieldEl
        var fieldEl = this.getFieldEl();

        // controlEl
        var controlEl = this.getControlEl();

        // all controls get the "form-control" class injected
        $(fieldEl).find("input").addClass("form-control input");
        $(fieldEl).find("textarea").addClass("form-control input");
        $(fieldEl).find("select").addClass("form-control input");
        // except for the following
        $(fieldEl).find("input[type=checkbox]").removeClass("form-control");
        $(fieldEl).find("input[type=file]").removeClass("form-control");
        $(fieldEl).find("input[type=radio]").removeClass("form-control");

        // special case for type == color, remove form-control
        if (this.inputType === "color")
        {
            $(fieldEl).find("input").removeClass("form-control");
        }

        // any checkbox inputs get the "checkbox" class on their checkbox
        $(fieldEl).find("input[type=checkbox]").parent().parent().addClass("checkbox");
        // any radio inputs get the "radio" class on their radio
        $(fieldEl).find("input[type=radio]").parent().parent().addClass("radio");

        // if form has "form-inline" class, then radio and checkbox labels get inline classes
        if ($(fieldEl).parents("form").hasClass("form-inline"))
        {
            // checkboxes
            $(fieldEl).find("input[type=checkbox]").parent().addClass("checkbox-inline");

            // radios
            $(fieldEl).find("input[type=radio]").parent().addClass("radio-inline");
        }

        // all control labels get class "control-label"
        $(fieldEl).find("label.alpaca-control-label").addClass("control-label");

        // if in horizontal mode, add a wrapper div (col-sm-9) and label gets (col-sm-3)
        if (this.view.horizontal)
        {
            $(fieldEl).find("label.alpaca-control-label").addClass("col-sm-3");

            //align help text with input.
            $(fieldEl).find(".help-block").addClass("col-sm-offset-3 col-sm-9");

            var wrapper = $("<div></div>");
            wrapper.addClass("col-sm-9");

            $(controlEl).after(wrapper);
            wrapper.append(controlEl);

            $(fieldEl).append("<div style='clear:both;'></div>");
        }
    };
    callbacks["container"] = function()
    {
        var containerEl = this.getContainerEl();

        if (this.view.horizontal)
        {
            $(containerEl).addClass("form-horizontal");
        }
    };
    callbacks["form"] = function()
    {
        var formEl = this.getFormEl();

        // use pull-right for form buttons
        //$(formEl).find(".alpaca-form-buttons-container").addClass("pull-right");
    };
    callbacks["enableButton"] = function(button)
    {
        $(button).removeAttr("disabled");
    };
    callbacks["disableButton"] = function(button)
    {
        $(button).attr("disabled", "disabled");
    };
    callbacks["collapsible"] = function()
    {
        var fieldEl = this.getFieldEl();
        var legendEl = $(fieldEl).find("legend").first();
        var anchorEl = $("[data-toggle='collapse']", legendEl);
        if ($(anchorEl).length > 0)
        {
            var containerEl = this.getContainerEl();

            // container id
            var id = $(containerEl).attr("id");
            if (!id) {
                id = Alpaca.generateId();
                $(containerEl).attr("id", id);
            }

            // set up container to be collapsible
            $(containerEl).addClass("collapse");
            if (!this.options.collapsed)
            {
                $(containerEl).addClass("in");
            }

            // set up legend anchor
            if (!$(anchorEl).attr("data-target")) {
                $(anchorEl).attr("data-target", "#" + id);
            }

            $(anchorEl).mouseover(function(e) {
                $(this).css("cursor", "pointer");
            })
        }
    };

    // table-control callbacks
    callbacks["tableHeaderRequired"] = function(schema, options, domEl)
    {
        // required fields get a little star in their label
        $('<span class="alpaca-icon-required glyphicon glyphicon-star"></span>').prependTo(domEl);

    };
    callbacks["tableHeaderOptional"] = function(schema, options, domEl)
    {
    };

    Alpaca.registerView({
        "id": "bulma-display",
        "parent": "web-display",
        "type": "display",
        "ui": "bulma",
        "title": "Display View for Bulma CSS framework",
        "displayReadonly": true,
        "callbacks": callbacks,
        "styles": styles,
        "templates": {}
    });

    Alpaca.registerView({
        "id": "bulma-display-horizontal",
        "parent": "bulma-display",
        "horizontal": true
    });

    Alpaca.registerView({
        "id": "bulma-edit",
        "parent": "web-edit",
        "type": "edit",
        "ui": "bulma",
        "title": "Edit View for Bulma CSS framework",
        "displayReadonly": true,
        "callbacks": callbacks,
        "styles": styles,
        "templates": {}
    });

    Alpaca.registerView({
        "id": "bulma-edit-horizontal",
        "parent": "bulma-edit",
        "horizontal": true
    });

    Alpaca.registerView({
        "id": "bulma-create",
        "parent": "bulma-edit",
        "title": "Create View for Bulma CSS framework",
        "type": "create",
        "displayReadonly": false
    });

    Alpaca.registerView({
        "id": "bulma-create-horizontal",
        "parent": "bulma-create",
        "horizontal": true
    });

})(jQuery);

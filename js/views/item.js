var itemView = Backbone.View.extend({
    tagName: "div",

    events: {
        "change   .editItem": "editItem",
        "change   .itemOwner": "editItemOwner"
    },

    template: $('#itemTemplate').html(),

    initialize: function () {
        'use strict';
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function () {
        'use strict';
        var rendered = Mustache.to_html(this.template, this.model.toJSON());
        $(this.el).html(rendered);
        return this;
    },

    editItem: function (e) {
        'use strict';
        var value = $(this.el).find('.editItem').val();
        this.model.set({name: value});
        this.model.sync("update", this.model);
    },

    editItemOwner: function (e) {
        'use strict';
        var value = $(this.el).find('.itemOwner').val();
        this.model.set({name: value});
        this.model.sync("update", this.model);
    },
});
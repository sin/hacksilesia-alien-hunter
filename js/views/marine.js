var marineView = Backbone.View.extend({
    tagName: "div",

    events: {
        "change   .editMarine": "editMarine"
    },

    template: $('#marineTemplate').html(),

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

    editMarine: function (e) {
        'use strict';
        var value = $(this.el).find('.editMarine').val();
        this.model.set({nick: value});
        this.model.sync("update", this.model);
    }
});
var alienView = Backbone.View.extend({
    tagName: "div",

    events: {
        "change   .editAlien": "editAlien",
        "change   .editAlienBID": "editAlienBID"
    },

    template: $('#alienTemplate').html(),

    initialize: function () {
        'use strict';
        _.bindAll(this, 'render');
        this.model.bind('change', this.render);
    },

    render: function () {
        'use strict';
        var data = this.model.toJSON();
        data.BIDs = [];
        BIDs.forEach(function(entry) {
            if (data.bid == entry) {
                data.BIDs.push({val: entry, sel: true, msg: entry.split(';')[0]});
            } else {
                data.BIDs.push({val: entry, sel: false, msg: entry.split(';')[0]});
            }
        });
        var rendered = Mustache.to_html(this.template, data);
        $(this.el).html(rendered);
        return this;
    },

    editAlien: function (e) {
        'use strict';
        var value = $(this.el).find('.editAlien').val();
        this.model.set({nick: value});
        this.model.sync("update", this.model);
    },
    editAlienBID: function (e) {
        'use strict';
        var value = $(this.el).find('.editAlienBID').val();
        this.model.set({bid: value});
        this.model.sync("update", this.model);
    }
});
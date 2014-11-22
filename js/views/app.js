var appView = Backbone.View.extend({
    el: $('.alien'),

    events: {
        "keypress   .addMarine": "addMarine",
        "keypress   .addAlien": "addAlien"
    },

    marineInput: $('.addMarine'),
    alienInput: $('.addAlien'),

    initialize: function () {
        'use strict';
        _.bindAll(this, 'render', 'addOne');
        players.bind('add', this.addOne);
        $.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
            options.url = 'http://alienhpy.mybluemix.net:80/' + options.url;
        });

        $.getJSON('bids', function(data) {
            'use strict';
            BIDs = data;
            BIDs.forEach(function(entry) {
                BIDsObj.BIDs.push({val: entry, sel: false, msg: entry.split(';')[0]});
            });
            var rendered = Mustache.to_html($('#alienAddTemplate').html(), BIDsObj);
            $('.addAlienEl').html(rendered);
            players.fetch();
        });
    },

    addOne: function (data) {
        'use strict';
        if (data.get('team') === 'marines') {
            var view = new marineView({model: data});
            this.$('.marinesList').append(view.render().el);
        } else {
            var view = new alienView({model: data});
            this.$('.aliensList').append(view.render().el);
        }
    },

    addMarine: function (e) {
        'use strict';
        e.stopPropagation();

        var value = this.marineInput.val();

        if (!value || e.which !== 13) {
            return;
        }

        players.create({nick: value, team: 'marines', BID: ''});
        this.marineInput.val('');
    },

    addAlien: function (e) {
        'use strict';
        e.stopPropagation();

        var name = this.alienInput.val();
        var BID = this.$('.BID').val();

        if (!name || !BID || e.which !== 13) {
            return;
        }
        players.create({nick: name, team: 'alien', bid: BID});
        this.alienInput.val('');
        this.$('.BID').val('');
    }
});
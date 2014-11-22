var playersCollection = Backbone.Collection.extend({
    model: playerModel,
    url: 'player'
});
var itemsCollection = Backbone.Collection.extend({
    model: itemModel,
    url: 'items'
});
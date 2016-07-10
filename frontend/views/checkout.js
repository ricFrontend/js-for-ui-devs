const Backbone = require('backbone')
const datalayer = require('../lib/datalayer')

const Checkout = Backbone.View.extend({
	initialize: function() {

	},
	render: function() {
		this.$el.html('');

		this.$el.append(`
			<div>Checkout</div>
		`)
	}
})

module.exports = Checkout
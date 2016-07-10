const Backbone = require('backbone')
const datalayer = require('../lib/datalayer')

const ordersList = Backbone.View.extend({
	events: {
		'click .btn-delete': 'deleteOrder'
	},
	initialize: function(orderCollection){
		
		this.orderCollection = orderCollection

		this.listenTo(this.orderCollection, 'add', this.render)
		this.listenTo(this.orderCollection, 'remove', this.render)
		this.listenTo(this.orderCollection, 'change', this.render)
	},
	deleteOrder: function(e) {
		const $row = $(e.currentTarget).closest('.row')
		const model = this.orderCollection.findWhere({uuid: $row.data('uuid')})

		const orderModel = this.orderCollection.remove({
			uuid: model.id
		})

		orderModel.destroy()
	},
	render: function() {
		var self = this;

		this.$el.html('')

		var lista = this.orderCollection.toArray();


		if (lista.length > 0) {
			this.orderCollection.toArray().reverse().forEach(function(model){
				var data = model.toJSON()

				self.$el.append(`
					<div class="row" data-uuid="${data.uuid}">
						<div class="col-xs-10">
							<h2>${data.products[0].productName || data.products[0].product.name}</h2>
							
							<p>Cantidad: ${data.products[0].quantity}</p>
						</div>
						<div class="col-xs-1">
							<button class="btn btn-danger btn-delete">x</button>
						</div>
					</div>
				`)
			})
			this.$el.append(`
				<div class="text-center">
					<button>Comprar</button>
				</div>
			`)
		} else {
			self.$el.append(`
				<div>Ningun producto seleccionado</div>
			`)
		}
	}
})

module.exports = ordersList
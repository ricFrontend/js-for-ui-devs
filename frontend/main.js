const $ = require('jquery')
window.$ = $

const datalayer = require('./lib/datalayer')

const Product = require('./datalayer-definitions/product')
const productCollection = new Product.Collection()
datalayer.registry('products', productCollection)

const Order = require('./datalayer-definitions/order')
const orderCollection = new Order.Collection()
datalayer.registry('orders', orderCollection)

const xhrProducts = productCollection.fetch()
const xhrOrder = orderCollection.fetch()

xhrProducts.then(function(){
	console.log('Product collection loaded')
})

xhrProducts.catch(function(err){
	console.log('Product collection coundn\'t load', err)
})

xhrOrder.then(function(){
	console.log('order collection loaded')
})

xhrOrder.catch(function(err){
	console.log('order collection coundn\'t load', err)
})


// Add order fetch here
const ProductList = require('./views/product-list')
const productList = new ProductList(productCollection)

const OrderList = require('./views/order-list')
const orderList = new OrderList(orderCollection)

$('.product-list').append(productList.$el)
$('.order-list').append(orderList.$el)
productList.render()
orderList.render()

// Elements exposed to window
window.datalayer = datalayer
window.productCollection = productCollection
window.Product = Product
window.Order = Order
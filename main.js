$(function(){
	var $orders = $('#orders');
	var $name = $('#name');
	var $lname = $('#lname');

	$.ajax({
	type: 'GET',
	url:'orders.txt',
	success: function(orders){
		$.each(orders, function(i, order){
			$orders.append('<li>name ' + order.name + 'lastname'+order.lname+'</li>');
		});
	},
	error: function(){
		alert('error');
	}
		
	});
	$('#add-order').on('click', function(){
		var order = {
			name: $name.val(),
			lname: $lname.val(),
		};
		$.ajax({
			type: 'POST',
			url: 'orders.txt',
			data: order,
			success: function(newOrder){
				$orders.append('<li>name ' + newOrder.name + ' lastname '+newOrder.lname+'</li>');
				
			},
			error: function(){
				alert('error');
			}
		});
	});
	
});
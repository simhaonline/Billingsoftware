$(document).on('change','#select_id',function(e){
 	
 	e.preventDefault();
 	$.ajax({
 		type:'POST',
 		url:'/create_sales_return_ajax/',
 		data:{
 			action:'return',
 			selection:$('#select_id').val(),
 			csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
 		},
 		dataType: "json",
 		success:function(data){
 			 
 			$('tbody').html(data['tag_str']);
 			countings=data['count']

 		}
 	});
 }); 


 $(document).on('change','#select_id',function(e){
console.log("hhh")
    e.preventDefault();
       
           $.ajax({
        type:'POST',
        url:'/create_sales_return_ajax/',
        data:{
            action:'custome',
            cust:$('#select_id').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },

        dataType: "json",
        success:function(data){
            $('#cust_credit').val(data['get_cust_credit'])
            $('#cust_debit').val(data['get_cust_debit'])
            // $('#sale_tot').val(parseFloat(data['get_cust_credit'])-parseFloat(data['get_cust_debit'])+parseFloat($('#cust_sale_total').val()))
        }
     });   
 }); 
// var countin=$('#counts').val()
// console.log(countin)


           

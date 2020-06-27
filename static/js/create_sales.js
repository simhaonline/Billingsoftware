
if ($('#sale_type_id').val() == 1) {

               
                
            

  var count=0  
 $(document).on('change','#bar_code_id,#select_id',function(e){ 
    $('#sale_type_id').attr('disabled',true);
    $('#myTable').show()
    var barcodes="#bar_code_id".concat(count);  
    $('#baring').val($('#bar_code_id').val()) 
    count=count+1
    e.preventDefault();  
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'selection',
            selection_bar:$('#bar_code_id').val(),
            selection_sele:$('#select_id').val(),
            select_type:$('#sale_type_id').val(),
            counti:count,

            fintotal:$('#final_subtotal').val(),
            fintaxe:$('#final_taxtotal').val(),
            findiscount:$('#final_disctotal').val(),

            sub_toti:$('#subtotal_id').val(),
            sub_taxi:$('#tax_amount_id').val(),
            sub_disci:$('#discount_id').val(),

            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        dataType: "json",
        success:function(data){
            // $('#bar_code_id').val(data['get_barcode']);
            console.log("hh"+data['tag_str'])
            $('#unit_id').html(data['tag_str']);
            $('#qty_id').val(1);
            $('#stock_id').val(data['get_stock']);
            $('#price_id').val(data['get_price']);
            
            $('#discount_id').val(data['get_discount']);
            $('#tax_amount_id').val(data['tax_amount']);
            $('#subtotal_id').val(data['discount_subbtotal']+(data['cess_total']/100));
            $('tbody').prepend(data['tag_str2']);
            $('#final_subtotal').val(data['totals'])
            $('#final_taxtotal').val(data['tax_totals'])
            $('#final_disctotal').val(data['disc_totals'])
           $('#bar_code_id').val("");
           $('#bar_code_id').focus();
           // $('#select_id').val(data['get_pro_ids']).trigger("change");

            $.ajax({
                type:'POST',
                url:'/create_sales_ajax/',
                data:{
                    action:'quantity',
                    selection_bar:$('#baring').val(),
                    selection_sele:$('#select_id').val(),
                    select_type:$('#sale_type_id').val(),
                    quanties:1,

                    fintotal:$('#final_subtotal').val(),
                    fintaxe:$('#final_taxtotal').val(),
                    findiscount:$('#final_disctotal').val(),

                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                },
                dataType: "json",

                success:function(data){
                    
                     $('#sale_tot').val(Math.round(data['totals']+(data['cess_total']/100)))
                     $('#cust_sale_total').val(data['totals'])
                     $('#total_tax_id').val(data['tax_totals'])
                     $('#total_discount_id').val(data['disc_totals'])
                     $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(data['totals']+(data['cess_total']/100)))
                     $('#sp_discount').val(Math.round(data['totals']+(data['cess_total']/100)))
                      
                }
            });
            }
    }); 
   

 }); 


  $(document).on('input','#qty_id',function(e){
         var barcodes="#bar_code_id".concat(count);   
    e.preventDefault();
    
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'quantity',
            selection_bar:$('#baring').val(),
            selection_sele:$('#select_id').val(),
            select_type:$('#sale_type_id').val(),
            quanties:$('#qty_id').val(),
            unit_val:$('#unit_id').val(),
            fintotal:$('#final_subtotal').val(),
            fintaxe:$('#final_taxtotal').val(),
            findiscount:$('#final_disctotal').val(),

            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        dataType: "json",

        success:function(data){
            $('#tax_amount_id').val((data['total_tax_amount']).toFixed(3));
            
            $('#discount_id').val((data['total_discount']).toFixed(3));
            $('#subtotal_id').val((data['tax_subtotal']+(data['cess_total']/100)).toFixed(3));


            var qty_id="#qty_id".concat(count);
            $(qty_id).val($('#qty_id').val());
            var subtotal_id="#subtotal_id".concat(count);
            $(subtotal_id).val((data['tax_subtotal']).toFixed(3));
            var tax_amount_id="#tax_amount_id".concat(count);
            $(tax_amount_id).val((data['total_tax_amount']).toFixed(3));
            var discount_id="#discount_id".concat(count);
            $(discount_id).val((data['total_discount']).toFixed(3));


             $('#sale_tot').val(Math.round(data['totals']+(data['cess_total']/100)))
            
             $('#cust_sale_total').val(data['totals'])
             $('#total_tax_id').val(data['tax_totals'])
             $('#total_discount_id').val(data['disc_totals'])
             $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(data['totals']+(data['cess_total']/100)))
             $('#sp_discount').val(Math.round(data['totals']+(data['cess_total']/100)))
             
        }
    });
 });


$(document).on('change','#unit_id',function(e){ 
 var barcodes="#bar_code_id".concat(count); 
    e.preventDefault();  
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'unit_selection',
            selection_bar:$('#baring').val(),
            selection_sele:$('#select_id').val(),
            select_type:$('#sale_type_id').val(),
            sele_qty:$('#qty_id').val(),
            unit_val:$('#unit_id').val(),
            fintotal:$('#final_subtotal').val(),
            fintaxe:$('#final_taxtotal').val(),
            findiscount:$('#final_disctotal').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        dataType: "json",
        success:function(data){
            $('#tax_amount_id').val((data['total_tax_amount']).toFixed(3));
            
            $('#discount_id').val((data['total_discount']).toFixed(3));
            $('#subtotal_id').val((data['tax_subtotal']+(data['cess_total']/100)).toFixed(3));

            var price_id="#price_id".concat(count);
            $(price_id).val(data['get_price']);
            var unit_id="#unit_id".concat(count);
            $(unit_id).val($('#unit_id').val());
            var unit_post_id="#unit_post_id".concat(count);
            $(unit_post_id).val($('#unit_id option:selected').text());
            var subtotal_id="#subtotal_id".concat(count);
            $(subtotal_id).val((data['tax_subtotal']).toFixed(3));
            var tax_amount_id="#tax_amount_id".concat(count);
            $(tax_amount_id).val((data['total_tax_amount']).toFixed(3));
            var discount_id="#discount_id".concat(count);
            $(discount_id).val((data['total_discount']).toFixed(3));
           
            $('#sale_tot').val(Math.round(data['totals']+(data['cess_total']/100)))
            $('#cust_sale_total').val(data['totals'])
            $('#total_tax_id').val(data['tax_totals'])
            $('#total_discount_id').val(data['disc_totals'])
            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(data['totals']+(data['cess_total']/100)))
            $('#sp_discount').val(Math.round(data['totals']+(data['cess_total']/100)))

            
            }
    }); 
   

 }); 


$(document).on('click','#update',function(e){
$("#select_id").prop('disabled',false);
$("#bar_code_id").prop('disabled',false);
$("#unit_id").prop('disabled',false);
$("#stock_id").prop('disabled',false);
$("#price_id").prop('disabled',false);
$("#tax_amount_id").prop('disabled',false);
$("#discount_id").prop('disabled',false);

   $('center').html('')
   $(".dis1").css("display", "none");
   $('#bar_code_id').focus();
   swal ( "Success" ,  "Product updation succesfull!" ,  "success" )
 }); 


//editing --------------------------------------------------------------------------

$(document).on('click','#editing',function(e){
    var tis=this
    swal({   title: "Do you wish to edit this product!",   
    text: "Are you sure to proceed?",   
    type: "warning",   
    showCancelButton: true,   
    confirmButtonColor: "#DD6B55",   
    closeOnConfirm: false,   
    closeOnCancel: false }, 
    function(isConfirm){   
        if (isConfirm) 
    {   
          
    swal("Edition", "Update the desired field carefully!", "info");
       // Find the row
       var row = $(tis).closest("tr"); 
    var text = row.find("#counts").val(); // Find the text

    var barco="#bar_code_id".concat(text);
    var select_id="#select_id".concat(text);
    var unit_id="#unit_id".concat(text);
    var qty_id="#qty_id".concat(text);
    var stock_id="#stock_id".concat(text);
    var price_id="#price_id".concat(text);
    var tax_amount_id="#tax_amount_id".concat(text);
    var discount_id="#discount_id".concat(text);
    var subtotal_id="#subtotal_id".concat(text);
    
    // Let's test it out
   $(".dis1").css("display", "block");
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'edit_op',
            barcode:$(barco).val(),
            selection:$(select_id).val(),
            unit:$(unit_id).val(),
            qty:$(qty_id).val(),
            stock:$(stock_id).val(),
            price:$(price_id).val(),
            tax:$(tax_amount_id).val(),
            discount:$(discount_id).val(),
            subtotal:$(subtotal_id).val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },

        dataType: "json",
        success:function(data){
            var tots=$('#final_subtotal').val()
            var new_tots=parseFloat(tots)-parseFloat(data['get_subtotal'])
           
           $('#final_subtotal').val(new_tots)
           $('#sale_tot').val(Math.round(new_tots))
           $('#cust_sale_total').val(new_tots)
           $('#edit_tot').val(new_tots)

            var taxs=$('#final_taxtotal').val()
            var new_taxs=parseFloat(taxs)-parseFloat(data['get_tax'])
           $('#final_taxtotal').val(new_taxs)
           $('#total_tax_id').val(new_taxs)

           var discs=$('#final_disctotal').val()
            var new_discs=parseFloat(discs)-parseFloat(data['get_discount'])
           $('#final_disctotal').val(new_discs)
           $('#total_discount_id').val(new_discs)
          

            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(new_tots+(new_tots/100)))
            $('#sp_discount').val(Math.round(new_tots+(new_tots/100)))
            
            $('#bar_code_id').val(data['bar'])
            $('#select_id').val(data['sel']).trigger("change")
            $('#unit_id').val(data['get_unit'])
            $('#qty_id').val(data['get_qty'])
            $('#stock_id').val(data['get_stock'])
            $('#price_id').val(data['get_price'])
            $('#tax_amount_id').val(data['get_tax'])
            $('#discount_id').val(data['get_discount'])
            $('#subtotal_id').val(data['get_subtotal'])
            $('#subtotal_id').val(data['get_subtotal'])
            $('center').html('<input type="button" id="update" class="btn btn-info mb-5" value="Confirm" style="font-size:25px ">')
             $("#select_id").prop('disabled',true);
            $("#bar_code_id").prop('disabled',true);
            $("#unit_id").prop('disabled',true);
            $("#stock_id").prop('disabled',true);
            $("#price_id").prop('disabled',true);
            $("#tax_amount_id").prop('disabled',true);
            $("#discount_id").prop('disabled',true);
            }
    });
    $(tis).closest('tr').remove();
    } 
        else {     
             
            swal("Cancelled", "Editing has been Cancelled!", "error");   
            } });
});


//deletion --------------------------------------------------------------------------

  $(document).on('click', '#deleting', function () {
    var tis=this
    swal({   title: "Product will be deleted permanently!",   
    text: "Are you sure to proceed?",   
    type: "warning",   
    showCancelButton: true,   
    confirmButtonColor: "#DD6B55",   
    closeOnConfirm: false,   
    closeOnCancel: false }, 
    function(isConfirm){   
        if (isConfirm) 
    {   
        swal("Product Removed!", "Your Product is removed permanently!", "success");  
        
    var row = $(tis).closest("tr");    // Find the row
    var text = row.find("#counts").val(); // Find the text
    var tax_amount_id="#tax_amount_id".concat(text);
    var discount_id="#discount_id".concat(text);
    var subtotal_id="#subtotal_id".concat(text);
    
    // Let's test it out
   
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'del_op',
            tax:$(tax_amount_id).val(),
            discount:$(discount_id).val(),
            subtotal:$(subtotal_id).val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },

        dataType: "json",
        success:function(data){
            
            var tots=$('#sale_tot').val()

            var new_tots=parseFloat(tots)-parseFloat(data['get_subtotal'])
            $('#sale_tot').val(Math.round(new_tots))
            $('#cust_sale_total').val(new_tots)
            var dd=$('#final_subtotal').val()
            $('#final_subtotal').val(parseFloat(dd)-parseFloat(data['get_subtotal']))
           
            // $('#subtotal_id').val()
             var taxs=$('#total_tax_id').val()
            var new_taxs=parseFloat(taxs)-parseFloat(data['get_tax'])
           $('#total_tax_id').val(new_taxs)
            var cc=$('#final_taxtotal').val()
            $('#final_taxtotal').val(parseFloat(cc)-parseFloat(data['get_tax']))

           var discs=$('#total_discount_id').val()
            var new_discs=parseFloat(discs)-parseFloat(data['get_discount'])
           $('#total_discount_id').val(new_discs)
            var ee=$('#final_disctotal').val()
            $('#final_disctotal').val(parseFloat(ee)-parseFloat(data['get_discount']))

            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(new_tots+(new_tots/100)))
            $('#sp_discount').val(Math.round(new_tots+(new_tots/100)))
            }
    });
     $(tis).closest('tr').remove();
    } 
        else {     
             
            swal("Cancelled", "Product is not removed!", "error");   
            } });
  
});



 $(document).on('input','#special_discount_id',function(e){

    e.preventDefault();

            
            $('#sale_tot').val(parseFloat($('#sp_discount').val())-parseFloat($('#special_discount_id').val()))
            $('#cust_sale_total').val(parseFloat($('#sp_discount').val())-parseFloat($('#special_discount_id').val()))
            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+$('#sale_tot').val())
        
 });

 $(document).on('change','#custome_id',function(e){

    e.preventDefault();
       
           $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'custome',
            cust:$('#custome_id').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },

        dataType: "json",
        success:function(data){
            $('#cust_credit').val(data['get_cust_credit'])
            $('#cust_debit').val(data['get_cust_debit'])
            $('#sale_tot').val(parseFloat(data['get_cust_credit'])-parseFloat(data['get_cust_debit'])+parseFloat($('#cust_sale_total').val()))
        }
     });   
 }); 



}




















            else{
               



























  var count=0  
 $(document).on('change','#bar_code_id,#select_id',function(e){ 
    $('#sale_type_id').attr('disabled',true);
    $('#myTable').show()
    var barcodes="#bar_code_id".concat(count);  
    $('#baring').val($('#bar_code_id').val()) 
    count=count+1
    e.preventDefault();  
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'selection',
            selection_bar:$('#bar_code_id').val(),
            selection_sele:$('#select_id').val(),
            select_type:$('#sale_type_id').val(),
            counti:count,

            fintotal:$('#final_subtotal').val(),
            fintaxe:$('#final_taxtotal').val(),
            findiscount:$('#final_disctotal').val(),

            sub_toti:$('#subtotal_id').val(),
            sub_taxi:$('#tax_amount_id').val(),
            sub_disci:$('#discount_id').val(),

            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        dataType: "json",
        success:function(data){
            // $('#bar_code_id').val(data['get_barcode']);
            
            $('#unit_id').html(data['tag_str']);
            $('#qty_id').val(1);
            $('#stock_id').val(data['get_stock']);
            $('#price_id').val(data['get_price']);
            
            $('#discount_id').val(data['get_discount']);
            $('#tax_amount_id').val(data['tax_amount']);
            $('#subtotal_id').val(data['discount_subbtotal']);
            $('tbody').prepend(data['tag_str2']);
            $('#final_subtotal').val(data['totals'])
            $('#final_taxtotal').val(data['tax_totals'])
            $('#final_disctotal').val(data['disc_totals'])
           $('#bar_code_id').val("");
           $('#bar_code_id').focus();
           // $('#select_id').val(data['get_pro_ids']).trigger("change");

            $.ajax({
                type:'POST',
                url:'/create_sales_ajax/',
                data:{
                    action:'quantity',
                    selection_bar:$('#baring').val(),
                    selection_sele:$('#select_id').val(),
                    select_type:$('#sale_type_id').val(),
                    quanties:1,

                    fintotal:$('#final_subtotal').val(),
                    fintaxe:$('#final_taxtotal').val(),
                    findiscount:$('#final_disctotal').val(),

                    csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
                },
                dataType: "json",

                success:function(data){
                    
                     $('#sale_tot').val(Math.round(data['totals']))
                     $('#cust_sale_total').val(data['totals'])
                     $('#total_tax_id').val(data['tax_totals'])
                     $('#total_discount_id').val(data['disc_totals'])
                     $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(data['totals']))
                     $('#sp_discount').val(data['totals'])
                      
                }
            });
            }
    }); 
   

 }); 


  $(document).on('input','#qty_id',function(e){
         var barcodes="#bar_code_id".concat(count);   
    e.preventDefault();
    
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'quantity',
            selection_bar:$('#baring').val(),
            selection_sele:$('#select_id').val(),
            select_type:$('#sale_type_id').val(),
            quanties:$('#qty_id').val(),
            unit_val:$('#unit_id').val(),
            fintotal:$('#final_subtotal').val(),
            fintaxe:$('#final_taxtotal').val(),
            findiscount:$('#final_disctotal').val(),

            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        dataType: "json",

        success:function(data){
            $('#tax_amount_id').val((data['total_tax_amount']).toFixed(3));
            $('#discount_id').val((data['total_discount']).toFixed(3));
            $('#subtotal_id').val((data['tax_subtotal']).toFixed(3));


            var qty_id="#qty_id".concat(count);
            $(qty_id).val($('#qty_id').val());
            var subtotal_id="#subtotal_id".concat(count);
            $(subtotal_id).val((data['tax_subtotal']).toFixed(3));
            var tax_amount_id="#tax_amount_id".concat(count);
            $(tax_amount_id).val((data['total_tax_amount']).toFixed(3));
            var discount_id="#discount_id".concat(count);
            $(discount_id).val((data['total_discount']).toFixed(3));


             $('#sale_tot').val(Math.round(data['totals']))
             $('#cust_sale_total').val(data['totals'])
             $('#total_tax_id').val(data['tax_totals'])
             $('#total_discount_id').val(data['disc_totals'])
             $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(data['totals']))
             $('#sp_discount').val(data['totals'])
             
        }
    });
 });



$(document).on('change','#unit_id',function(e){ 

    e.preventDefault();  
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'unit_selection',
            selection_bar:$('#baring').val(),
            selection_sele:$('#select_id').val(),
            select_type:$('#sale_type_id').val(),
            sele_qty:$('#qty_id').val(),
            unit_val:$('#unit_id').val(),
            fintotal:$('#final_subtotal').val(),
            fintaxe:$('#final_taxtotal').val(),
            findiscount:$('#final_disctotal').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },
        dataType: "json",
        success:function(data){
            $('#tax_amount_id').val((data['total_tax_amount']).toFixed(3));
            
            $('#discount_id').val((data['total_discount']).toFixed(3));
            $('#subtotal_id').val((data['tax_subtotal']).toFixed(3));

            var price_id="#price_id".concat(count);
            $(price_id).val(data['get_price']);
            var unit_id="#unit_id".concat(count);
            $(unit_id).val($('#unit_id').val());
            var unit_post_id="#unit_post_id".concat(count);
            $(unit_post_id).val($('#unit_id option:selected').text());
            var subtotal_id="#subtotal_id".concat(count);
            $(subtotal_id).val((data['tax_subtotal']).toFixed(3));
            var tax_amount_id="#tax_amount_id".concat(count);
            $(tax_amount_id).val((data['total_tax_amount']).toFixed(3));
            var discount_id="#discount_id".concat(count);
            $(discount_id).val((data['total_discount']).toFixed(3));
           
            $('#sale_tot').val(Math.round(data['totals']))
            $('#cust_sale_total').val(data['totals'])
            $('#total_tax_id').val(data['tax_totals'])
            $('#total_discount_id').val(data['disc_totals'])
            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(data['totals']))
            $('#sp_discount').val(Math.round(data['totals']+(data['cess_total']/100)))

            
            }
    }); 
   

 }); 


$(document).on('click','#update',function(e){
$("#select_id").prop('disabled',false);
$("#bar_code_id").prop('disabled',false);
$("#unit_id").prop('disabled',false);
$("#stock_id").prop('disabled',false);
$("#price_id").prop('disabled',false);
$("#tax_amount_id").prop('disabled',false);
$("#discount_id").prop('disabled',false);

   $('center').html('')
   $(".dis1").css("display", "none");
   $('#bar_code_id').focus();
   swal ( "Success" ,  "Product updation succesfull!" ,  "success" )
 }); 


//editing --------------------------------------------------------------------------

$(document).on('click','#editing',function(e){
    var tis=this
    swal({   title: "Do you wish to edit this product!",   
    text: "Are you sure to proceed?",   
    type: "warning",   
    showCancelButton: true,   
    confirmButtonColor: "#DD6B55",   
    closeOnConfirm: false,   
    closeOnCancel: false }, 
    function(isConfirm){   
        if (isConfirm) 
    {   
          
    swal("Edition", "Update the desired field carefully!", "info");
       // Find the row
       var row = $(tis).closest("tr"); 
    var text = row.find("#counts").val(); // Find the text

    var barco="#bar_code_id".concat(text);
    var select_id="#select_id".concat(text);
    var unit_id="#unit_id".concat(text);
    var qty_id="#qty_id".concat(text);
    var stock_id="#stock_id".concat(text);
    var price_id="#price_id".concat(text);
    var tax_amount_id="#tax_amount_id".concat(text);
    var discount_id="#discount_id".concat(text);
    var subtotal_id="#subtotal_id".concat(text);
    
    // Let's test it out
   $(".dis1").css("display", "block");
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'edit_op',
            barcode:$(barco).val(),
            selection:$(select_id).val(),
            unit:$(unit_id).val(),
            qty:$(qty_id).val(),
            stock:$(stock_id).val(),
            price:$(price_id).val(),
            tax:$(tax_amount_id).val(),
            discount:$(discount_id).val(),
            subtotal:$(subtotal_id).val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },

        dataType: "json",
        success:function(data){
            var tots=$('#final_subtotal').val()
            var new_tots=parseFloat(tots)-parseFloat(data['get_subtotal'])
           
           $('#final_subtotal').val(new_tots)
           $('#sale_tot').val(Math.round(new_tots))
           $('#cust_sale_total').val(new_tots)
           $('#edit_tot').val(new_tots)

            var taxs=$('#final_taxtotal').val()
            var new_taxs=parseFloat(taxs)-parseFloat(data['get_tax'])
           $('#final_taxtotal').val(new_taxs)
           $('#total_tax_id').val(new_taxs)

           var discs=$('#final_disctotal').val()
            var new_discs=parseFloat(discs)-parseFloat(data['get_discount'])
           $('#final_disctotal').val(new_discs)
           $('#total_discount_id').val(new_discs)
          

            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(new_tots))
            $('#sp_discount').val(new_tots)
            
            $('#bar_code_id').val(data['bar'])
            $('#select_id').val(data['sel']).trigger("change")
            $('#unit_id').val(data['get_unit'])
            $('#qty_id').val(data['get_qty'])
            $('#stock_id').val(data['get_stock'])
            $('#price_id').val(data['get_price'])
            $('#tax_amount_id').val(data['get_tax'])
            $('#discount_id').val(data['get_discount'])
            $('#subtotal_id').val(data['get_subtotal'])
            $('#subtotal_id').val(data['get_subtotal'])
            $('center').html('<input type="button" id="update" class="btn btn-info mb-5" value="Confirm" style="font-size:25px ">')
             $("#select_id").prop('disabled',true);
            $("#bar_code_id").prop('disabled',true);
            $("#unit_id").prop('disabled',true);
            $("#stock_id").prop('disabled',true);
            $("#price_id").prop('disabled',true);
            $("#tax_amount_id").prop('disabled',true);
            $("#discount_id").prop('disabled',true);
            }
    });
    $(tis).closest('tr').remove();
    } 
        else {     
             
            swal("Cancelled", "Editing has been Cancelled!", "error");   
            } });
});


//deletion --------------------------------------------------------------------------

  $(document).on('click', '#deleting', function () {
    var tis=this
    swal({   title: "Product will be deleted permanently!",   
    text: "Are you sure to proceed?",   
    type: "warning",   
    showCancelButton: true,   
    confirmButtonColor: "#DD6B55",   
    closeOnConfirm: false,   
    closeOnCancel: false }, 
    function(isConfirm){   
        if (isConfirm) 
    {   
        swal("Product Removed!", "Your Product is removed permanently!", "success");  
        
    var row = $(tis).closest("tr");    // Find the row
    var text = row.find("#counts").val(); // Find the text
    var tax_amount_id="#tax_amount_id".concat(text);
    var discount_id="#discount_id".concat(text);
    var subtotal_id="#subtotal_id".concat(text);
    
    // Let's test it out
   
    $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'del_op',
            tax:$(tax_amount_id).val(),
            discount:$(discount_id).val(),
            subtotal:$(subtotal_id).val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },

        dataType: "json",
        success:function(data){
            
            var tots=$('#sale_tot').val()

            var new_tots=parseFloat(tots)-parseFloat(data['get_subtotal'])
            $('#sale_tot').val(Math.round(new_tots))
            $('#cust_sale_total').val(new_tots)
            var dd=$('#final_subtotal').val()
            $('#final_subtotal').val(parseFloat(dd)-parseFloat(data['get_subtotal']))
           
            // $('#subtotal_id').val()
             var taxs=$('#total_tax_id').val()
            var new_taxs=parseFloat(taxs)-parseFloat(data['get_tax'])
           $('#total_tax_id').val(new_taxs)
            var cc=$('#final_taxtotal').val()
            $('#final_taxtotal').val(parseFloat(cc)-parseFloat(data['get_tax']))

           var discs=$('#total_discount_id').val()
            var new_discs=parseFloat(discs)-parseFloat(data['get_discount'])
           $('#total_discount_id').val(new_discs)
            var ee=$('#final_disctotal').val()
            $('#final_disctotal').val(parseFloat(ee)-parseFloat(data['get_discount']))

            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+Math.round(new_tots))
            $('#sp_discount').val(new_tots)
            }
    });
     $(tis).closest('tr').remove();
    } 
        else {     
             
            swal("Cancelled", "Product is not removed!", "error");   
            } });
  
});



 $(document).on('input','#special_discount_id',function(e){

    e.preventDefault();

            
            $('#sale_tot').val(parseFloat($('#sp_discount').val())-parseFloat($('#special_discount_id').val()))
            $('#cust_sale_total').val(parseFloat($('#sp_discount').val())-parseFloat($('#special_discount_id').val()))
            $('#subtotal_sumss').html('<i class="fa fa-fw fa-rupee"></i>'+data['final_total'])
        
 });

 $(document).on('change','#custome_id',function(e){

    e.preventDefault();
       
           $.ajax({
        type:'POST',
        url:'/create_sales_ajax/',
        data:{
            action:'custome',
            cust:$('#custome_id').val(),
            csrfmiddlewaretoken:$('input[name=csrfmiddlewaretoken]').val()
        },

        dataType: "json",
        success:function(data){
            $('#cust_credit').val(data['get_cust_credit'])
            $('#cust_debit').val(data['get_cust_debit'])
            $('#sale_tot').val(parseFloat(data['get_cust_credit'])-parseFloat(data['get_cust_debit'])+parseFloat($('#cust_sale_total').val()))
        }
     });   
 }); 











            }
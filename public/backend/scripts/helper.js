$(document).ready(function(){
    $('.uploadsrc[src=""]').hide();
    $('img.uploadsrc:not([src=""])').show();

    $("#uploadfeatured").on('change', function(e){
        
        var preview = document.querySelector('.uploadsrc');
        var file    = document.querySelector('#uploadfeatured').files[0];
        var reader  = new FileReader();
      
        reader.onloadend = function () {
          preview.src = reader.result;
          $('img.uploadsrc:not([src=""])').show();
        }
      
        if (file) {
          reader.readAsDataURL(file);
        } else {
          preview.src = "";
        }
    });



    $("#upload_link").on('click', function(e){
        e.preventDefault();
        $("#uploadfeatured:hidden").trigger('click');
    });


    

    $("#addCategory").click(function(){
        
       var cat= $("#cat").val();
        $.ajax({
            type: 'POST',
            data:{"title":cat},
            url: '/dashboard/blogpost/addCategory',
            success: function(res) {
               if(res.success==true)
               $('.list-group-item.cat-list')
               .append('<div class="custom-control custom-checkbox mb-1"  style="display: flex;justify-content: space-between;"><input type="checkbox" name="cat_id" value="'+res.data.id+'" class="custom-control-input cat-chk" id="'+res.data.id+'"><label class="custom-control-label" for="'+res.data.id+'">'+res.data.title+'</label><button id="deleteCategory" class="btn btn-white px-2 deleteCategory" data-id="'+res.data.id+'"  type="button" ><i class="material-icons">remove</i></button></div>');
               else{
                $('.cat_error')
               .append('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> '+res.message+' </div>');
               }
            }
          });

    });


    $('.list-group-item').on('click', '.deleteCategory', function() {
       
      var catid= $(this).attr('data-id');
       $.ajax({
           type: 'POST',
           data:{"id":catid},
           url: '/dashboard/blogpost/deleteCategory',
           success: function(res) {
              if(res.success==true){
              $('input[value="'+catid+'"]').parent().remove();
              $('.cat_error').append('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> '+res.message+' </div>');
              }
              else{
               $('.cat_error')
              .append('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> '+res.message+' </div>');
              }
           }
         });

   });

   $("#postupdate").click(function(){

    var post_id= $("#post_id").val();
    var post_title= $("#post_title").val();
    var author_id= $("#author_id").val();
    var post_content=$(".ql-editor").html();
    var fd = new FormData();
     var files = $('#uploadfeatured')[0].files[0];
      if(files){
     fd.append('post_thumbnail',files);
      }
     fd.append('post_title',post_title);
     fd.append('post_content',post_content);
     fd.append('post_author',author_id);
     fd.append('post_status',"publish");
    // fd.append('id',"publish");
    if(!post_title){
     $('.post_error')
     .append('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>Post title is required</div>');
    }
    else{
     var cat=[];
     $.each($("input[name='cat_id']:checked"), function(){
       cat.push($(this).val());
   });
   fd.append('cat_ids',cat);
   console.log(fd);
   
     $.ajax({
         type: 'PUT',
         data:fd,
         processData: false,
         contentType: false,
         url: '/dashboard/blogpost/update/'+post_id,
         success: function(res) {
            if(res.success==true){
           
            $('.post_success')
            .append('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> '+res.message+' </div>');
        
         setTimeout(function(){
             $('.post_success')
             .html('');
         }, 3000);
     }
            else{
             $('.post_error')
            .append('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> '+res.message+' </div>');
            setTimeout(function(){
             $('.post_error')
             .html('');
         }, 3000);  
         }
         }
                });}
 });

$("#postsubmit").click(function(){

   var post_title= $("#post_title").val();
   var author_id= $("#author_id").val();
   var post_content=$(".ql-editor").html();
   var featured=$("input[name='featured']:checked").val();
  console.log(featured)
   var fd = new FormData();
   var files = $('#uploadfeatured')[0].files[0];
    fd.append('post_thumbnail',files);
    fd.append('post_title',post_title);
    fd.append('post_content',post_content);
    fd.append('post_author',author_id);
    fd.append('post_status',"publish");
    fd.append('featured',featured);
   if(!post_title){
    $('.post_error')
    .append('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>Post title is required</div>');
   }
   else{
    var cat=[];
    $.each($("input[name='cat_id']:checked"), function(){
      cat.push($(this).val());
  });
  fd.append('cat_ids',cat)
  
    $.ajax({
        type: 'POST',
        data:fd,
        processData: false,
        contentType: false,
        url: '/dashboard/blogpost/addpost',
        success: function(res) {
           if(res.success==true){
          
           $('.post_success')
           .append('<div class="alert alert-success alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> '+res.message+' </div>');
       
        setTimeout(function(){
            $('.post_success')
            .html('');
        }, 3000);
    }
           else{
            $('.post_error')
           .append('<div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button> '+res.message+' </div>');
           setTimeout(function(){
            $('.post_error')
            .html('');
        }, 3000);  
        }
        }
               });}
});
})


$("#updatePassword").on('submit',function() {
  var oldpass= $('#old_password').val();
  var pass= $('#new_password').val();
  var oldpass= $('#old_password').val();
  console.log(oldpass + ' '+pass)
  var repass=$('#confirm_new_password').val();
  if(pass != repass){
    $(".error-message").html(' <div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>Error!</strong> Password and Confirm Password does not match </div>');
    return false;
  }
  if(oldpass == pass){
    $(".error-message").html(' <div class="alert alert-danger alert-dismissible fade show mb-0" role="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button><i class="fa fa-check mx-2"></i><strong>Error!</strong> Password and New Password cannot be same </div>');
    return false;
  }
  else{
    return true;
  }
  
})



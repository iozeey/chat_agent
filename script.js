$(document).ready(function() {

  $(".draggable-div").draggable({ 
    revert: "invalid",
  });
  
  $( "#staging-box" ).droppable({
    accept: "#suggestions .draggable-div",
    greedy: true,
    tolerance: 'touch',
    drop: function( event, ui ) {
       ui.helper.data('originalPosition',ui.position);
      $(ui.helper).removeClass('template-draggable');
      $(ui.helper).addClass('template-dragged');
      $('#button_send').show();
    }
  });
  
  $( "#suggestions" ).droppable({
    accept: "#suggestions .draggable-div",
    drop: function( event, ui ) {
        //do something
    }
  });
  
  $('.cancel').click(function(){
    var element = $(this).closest('.template-container');

    element.draggable({ disabled: false }).animate({left: 0, top: 0 });
    toggleEditable(element);
    element.removeClass('template-dragged');
    element.addClass('template-draggable');

    element.children('p').text(element.children('p').data('old_text'));
    var element = $("[class*='template-dragged']");
    if(element.length == 0){
      $('#button_send').hide();
    }
  });
     
  $(document).on('click','.edit',function(e){
    var element = $(this).closest('.template-container');
    var old_text = element.children('p').text();
    element.children('p').data('old_text',old_text);
    element.draggable({ disabled: true });
    toggleEditable(element);

  });  

  $(document).on('click','.send',function(e){
    var message;
    var element = $("[class*='template-dragged']");
    if(element.length == 1){
      message = element.children('span').clone();
      message.prepend($("<span><strong>Agent: </strong></span>"));
      message.appendTo($('#chat-box'))
    }else{
      for(var i = 0; i< element.length; i++ ){
          message= ($(element[i]).children('span').clone());
          if(i == 0){
              message.prepend($("<span><strong>Agent: </strong></span>"))
          }
          message.appendTo($('#chat-box'))
        }
    }
    // message.prepend()
    // $('#chat-box').append($('<p>').text('Bob Smith: Hi').css("font-weight", "bold"))
    $('#chat-box').append($('<p>').prepend("<span><strong>Bob Smith:</strong> Hi </span>"))
    element.remove();

    var scroll=$('#chat-box');
    scroll.animate({scrollTop: scroll.prop("scrollHeight")});
    $('#button_send').hide();
  });

  function toggleEditable(element){
    var isEditable = element.children('span').is('.editable');
    element.children('span').prop('contenteditable',!isEditable).toggleClass('editable');
  }

  function revertDraggable($selector) {
    $selector.each(function() {
      var $this = $(this),
          position = $this.data("originalPosition");
      if (position) { 
          $this.animate({
              left: position.left,
              top: position.top
          }, 500, function() {
              $this.data("originalPosition", null);
          });
      }
    });
  }

});
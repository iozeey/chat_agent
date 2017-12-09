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
  });
     
  $(document).on('click','.edit',function(e){
    var element = $(this).closest('.template-container');
    var old_text = element.children('p').text();
    element.children('p').data('old_text',old_text);
    element.draggable({ disabled: true });
    toggleEditable(element);

  });  

  $(document).on('click','.send',function(e){
    var element = $(this).closest('.template-container');
    var message = element.children('p').clone();
    message.prepend("<span><strong>Agent user:</strong></span>")
    message.appendTo($('#chat-box'))
    $('#chat-box').append($('<p>').text('Bob Smith:Hi'))
    // $('#chat-box').add($('#bob_smith'))
    // $('#bob_smith').appendTo($('#chat-box'))
    element.remove();

    var scroll=$('#chat-box');
    scroll.animate({scrollTop: scroll.prop("scrollHeight")});

  });

  function toggleEditable(element){
    var isEditable = element.children('p').is('.editable');
    element.children('p').prop('contenteditable',!isEditable).toggleClass('editable');
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
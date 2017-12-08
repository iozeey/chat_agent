$(document).ready(function() {
	var bool_value = "123";
  $('.box-item').draggable({
    	cursor: 'move',
    	helper: "clone"
  });

  $("#suggestions").droppable({
    drop: function(event, ui) {
      var itemid = $(event.originalEvent.toElement).attr("itemid");
      $('.box-item').each(function() {
        if ($(this).attr("itemid") === itemid) {
          $(this).appendTo("#suggestions");
        }
      });
    }
  });

  var edit= $('<span class="edit" id="edit_button"><input type="button" value="Edit"/></span>');
  var send= $('<span class="send"><input type="button" value="Send"/></span>');

  $("#edit_suggestions").droppable({
    drop: function(event, ui) {
      var itemid = $(event.originalEvent.toElement).attr("itemid");
      $('.box-item').each(function(e) {
        if ($(this).attr("itemid") === itemid) {
          	$(this).appendTo("#edit_suggestions");
          	edit.attr("data-item-id", $(this).attr("id"));
          	send.attr("data-item-id", $(this).attr("id"));
          	$(edit).appendTo("#edit_suggestions");
          	$(send).appendTo("#edit_suggestions");
        }
      });
    },
  });
	
edit.click(function(e){
    var $div=$('#'+$(this).attr("data-item-id")), isEditable=$div.is('.editable');
    $('#'+$(this).attr("data-item-id")).prop('contenteditable',!isEditable).toggleClass('editable')
});

$(function() {
  $("#draggable").draggable();
  $("#droppable").droppable({
    drop: function(event, ui) {
    }
  });
});

send.click(function trigger_drop(e) {
	$('#'+$(this).attr("data-item-id")).appendTo($('#droppable'))
	$(this).remove();
	$('#edit_button').remove();
});
});
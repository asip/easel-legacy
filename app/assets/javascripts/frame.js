// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener('turbolinks:load', function() {
  
  var trigger = document.querySelector('.lm-trigger')
  if (trigger){
    new Luminous(trigger);
  }

  $('#tag_list').tagEditor({
    delimiter: ', '
  });
});

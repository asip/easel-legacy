// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

document.addEventListener('turbolinks:load', function() {
  //$('.strip').on('click',
  //  function(e){
  //    e.preventDefault();
  //    Strip.show($(e.target.href);
  //  }
  //);
  $('#tag_list').tagEditor({
    delimiter: ', '
  });
});

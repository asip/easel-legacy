
document.addEventListener('turbolinks:load', function () {

  var trigger = document.querySelector('.lm-trigger')
  if (trigger) {
    new Luminous(trigger);
  }

  $('#tag_list').tagEditor({
    delimiter: ', '
  });

});
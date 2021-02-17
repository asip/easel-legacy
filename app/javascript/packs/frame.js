
document.addEventListener('turbo:load', function () {

  const lm_trigger = document.querySelector('.lm-trigger');
  if (lm_trigger) {
    new Luminous(lm_trigger);
  }

  const te_trigger = document.querySelector('#tag_list')
  if (te_trigger) {
    $(te_trigger).tagEditor('destroy');
    $(te_trigger).tagEditor({
      placeholder: '',
      delimiter: ', '
    });
  }

});
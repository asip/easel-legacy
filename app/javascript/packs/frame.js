const lm_trigger = document.querySelector('.lm-trigger');
const te_trigger = document.querySelector('#tag_list');

var initFrame = () => {

  if (lm_trigger) {
    new Luminous(lm_trigger);
  }

  if (te_trigger) {
    $(te_trigger).tagEditor('destroy');
    $(te_trigger).tagEditor({
      placeholder: '',
      delimiter: ', '
    });
  }

};

document.addEventListener('turbo:load', initFrame());
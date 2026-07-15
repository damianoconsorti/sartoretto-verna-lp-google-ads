(function () {
  function smoothScrollTo(id) {
    var target = document.getElementById(id);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  document.addEventListener('click', function (event) {
    var scrollTrigger = event.target.closest('[data-sv-scroll]');
    if (scrollTrigger) {
      event.preventDefault();
      smoothScrollTo(scrollTrigger.getAttribute('data-sv-scroll'));
      return;
    }

    var heroCard = event.target.closest('[data-sv-interest]');
    if (heroCard) {
      var value = heroCard.getAttribute('data-sv-interest');
      var select = document.querySelector('[data-sv-subject]');
      if (select && value) {
        select.value = value;
      }
      smoothScrollTo('contatti');
    }
  });

  document.addEventListener('submit', function (event) {
    var form = event.target.closest('[data-sv-form]');
    if (!form) return;

    event.preventDefault();

    var success = form.parentElement.querySelector('[data-sv-success]');
    if (!success) return;

    form.hidden = true;
    success.hidden = false;
  });
})();

// Interactive helpers: timer + checklist persistence

(function() {
  // ============ TIMER ============
  // Click to toggle. Long-press / right-click to reset.
  function fmt(s) {
    const m = Math.floor(s / 60), r = s % 60;
    return `${String(m).padStart(2,'0')}:${String(r).padStart(2,'0')}`;
  }
  function attachTimer(el) {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    const initial = parseInt(el.dataset.seconds || '180', 10);
    let remaining = initial;
    let interval = null;
    const label = el.querySelector('.t-label');
    label.textContent = fmt(remaining);

    function tick() {
      remaining -= 1;
      label.textContent = fmt(Math.max(0, remaining));
      if (remaining <= 0) {
        clearInterval(interval); interval = null;
        el.classList.remove('running');
        el.style.background = '#0A0A0A';
        el.style.color = '#DEFF1A';
        // small flash
        let flashes = 0;
        const f = setInterval(() => {
          el.style.opacity = el.style.opacity === '0.4' ? '1' : '0.4';
          if (++flashes > 6) { clearInterval(f); el.style.opacity = '1'; }
        }, 250);
      }
    }
    el.addEventListener('click', (e) => {
      if (e.shiftKey || e.altKey) {
        clearInterval(interval); interval = null;
        remaining = initial;
        el.classList.remove('running');
        label.textContent = fmt(remaining);
        return;
      }
      if (interval) {
        clearInterval(interval); interval = null;
        el.classList.remove('running');
      } else {
        if (remaining <= 0) remaining = initial;
        interval = setInterval(tick, 1000);
        el.classList.add('running');
      }
    });
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      clearInterval(interval); interval = null;
      remaining = initial;
      el.classList.remove('running');
      label.textContent = fmt(remaining);
    });
  }

  // ============ CHECKLIST ============
  function attachCheck(el) {
    if (el.dataset.bound) return;
    el.dataset.bound = '1';
    const id = el.dataset.checkId;
    const key = 'cl_' + id;
    if (id && localStorage.getItem(key) === '1') {
      el.classList.add('done');
    }
    el.addEventListener('click', () => {
      el.classList.toggle('done');
      if (id) {
        if (el.classList.contains('done')) localStorage.setItem(key, '1');
        else localStorage.removeItem(key);
      }
    });
  }

  function init() {
    document.querySelectorAll('.timer').forEach(attachTimer);
    document.querySelectorAll('.check-row').forEach(attachCheck);
  }

  // run on load + on slide change (deck-stage may swap visibility)
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
  // re-bind any newly added (just in case)
  setInterval(init, 1500);
})();

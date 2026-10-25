// Bucket list: remembers which boxes are checked on this device and shows progress.
(function () {
  var boxes = document.querySelectorAll('#checklist input[type="checkbox"]');
  var bar = document.getElementById('bar');
  var text = document.getElementById('progress-text');
  var KEY = 'bucket-list-checked';

  var saved = [];
  try { saved = JSON.parse(localStorage.getItem(KEY)) || []; } catch (e) {}

  boxes.forEach(function (box, i) {
    box.checked = saved.indexOf(i) !== -1;
    box.addEventListener('change', update);
  });

  function update() {
    var done = [];
    boxes.forEach(function (box, i) { if (box.checked) done.push(i); });
    try { localStorage.setItem(KEY, JSON.stringify(done)); } catch (e) {}
    var pct = boxes.length ? Math.round((done.length / boxes.length) * 100) : 0;
    bar.style.width = pct + '%';
    text.textContent = done.length + ' of ' + boxes.length + ' done 🌱';
  }

  update();
})();

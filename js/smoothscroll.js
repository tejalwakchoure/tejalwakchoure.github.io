const SmoothScroll = (target, speed, smooth) => {
  if (target === document)
    target = (document.documentElement || document.body.parentNode || document.body) // cross browser support for document scrolling

  let moving = false;
  let pos = target.scrollTop;
  target.addEventListener('mousewheel', scrolled, false)
  /* target.addEventListener('DOMMouseScroll', scrolled, false) */

  function scrolled(e) {
    e.preventDefault(); // disable default scrolling
    let delta = e.delta || e.wheelDelta;
    if (delta === undefined) {
      //we are on firefox
      delta = -e.detail;
    }
    delta = Math.max(-1, Math.min(1, delta)) // cap the delta to [-1,1] for cross browser consistency

    pos += -delta * speed
    pos = Math.max(0, Math.min(pos, (target.scrollHeight - target.clientHeight) + (smooth * 2))) // limit scrolling

    if (!moving) update()
  }

  function update() {
    moving = true
    let delta = (pos - target.scrollTop) / smooth;

    delta -= 1;

    if(pos - target.scrollTop === smooth * 2)
      delta = 0;

    target.scrollTop += delta
    if (Math.abs(delta) > 0.5)
      requestFrame(update)
    else
      moving = false
  }

  var requestFrame = function() { // requestAnimationFrame cross browser
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(func) {
        window.setTimeout(func, 1000 / 50);
      }
    );
  }()
}

export default SmoothScroll;

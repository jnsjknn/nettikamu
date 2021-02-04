const smoothScrollingIsSupported =
  'scrollBehavior' in document.documentElement.style;
const scrollOptions = {
  behavior: 'smooth',
  left: 0,
  top: 0
};

const getScrollTop = () => {
  return (
    (window.pageYOffset || document.documentElement.scrollTop) -
    (document.documentElement.clientTop || 0)
  );
};

const scrollToTop = (e, duration = 450) => {
  const start = window.performance.now();
  const scrollTop = getScrollTop();

  if (scrollTop === 0) return;

  if (smoothScrollingIsSupported) {
    window.scrollTo(scrollOptions);
  }

  if (!smoothScrollingIsSupported) {
    const step = timestamp => {
      const elapsed = timestamp - start;

      if (elapsed < duration) {
        const k = elapsed / duration;

        window.scrollTo(
          scrollOptions.left,
          scrollTop * (1 - k) + scrollOptions.top * k
        );
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }
};

export default scrollToTop;

const dateToTimeAgo = date => {
  const now = new Date().getTime();
  const time = new Date(date).getTime();
  const diffSec = (now - time) / 1000;
  if (diffSec < 60) {
    return Math.floor(diffSec) + 's sitten';
  }
  if (diffSec < 3600) {
    return Math.floor(diffSec / 60) + 'min sitten';
  }
  if (diffSec < 24 * 3600) {
    return Math.floor(diffSec / 60 / 60) + 'h sitten';
  }
  if (diffSec < 7 * 24 * 3600) {
    return Math.floor(diffSec / 60 / 60 / 24) + 'pv sitten';
  }
  if (diffSec < 52 * 7 * 24 * 3600) {
    return Math.floor(diffSec / 60 / 60 / 24 / 7) + 'vk sitten';
  }
  return Math.floor(diffSec / 60 / 60 / 24 / 7 / 52) + 'v sitten';
};

export default dateToTimeAgo;

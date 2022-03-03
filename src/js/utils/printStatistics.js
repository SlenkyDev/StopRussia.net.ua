const statsEl = document.getElementById('stats');

export const printStats = targets => {
  statsEl.innerHTML = `<pre>${JSON.stringify(targets, null, 2)}</pre>`;
};

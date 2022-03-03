export let targets = {
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
};

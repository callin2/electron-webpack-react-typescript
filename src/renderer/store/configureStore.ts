export var M;

if (process.env.NODE_ENV === 'production') {
    (M = require('./configureStore.prod')); // eslint-disable-line global-require
} else {
    (M = require('./configureStore.dev')); // eslint-disable-line global-require
}


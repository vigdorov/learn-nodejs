const util = require('util');

let phrases;

function PhraseError(message) {
  this.message = message;
  // прикрепили стек и вторым параметром запретили показ лишнего шага стека (а именно конструктора ошибки)
  Error.captureStackTrace(this, PhraseError);
}

util.inherits(PhraseError, Error);

PhraseError.prototype.name = 'PhraseError';

exports.connect = function () {
  phrases = require('./ru');
}

exports.getPhrases = function (name) {
  if (!phrases[name]) {
    throw new PhraseError(`Нет такой фразы - ${name}`);
  }
  return phrases[name];
}
const showError = func => (err, ...args) => {
  if (err) {
    console.log(err);
    return;
  }
  return func(...args);
};

module.exports = {
  showError,
};
const createError = (code, message) => {
  const err = new Error(message);
  err.status = code;
  return err;
};

module.exports = createError;

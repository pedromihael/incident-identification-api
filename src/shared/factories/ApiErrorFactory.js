class ApiErrorFactory {
  createError(type, error) {
    return {
      isApiError: true,
      type,
      error,
    };
  }
}

module.exports = ApiErrorFactory;

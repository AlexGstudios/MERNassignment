const errorResponse = (
  res,
  statusCode = 500,
  message = "An error has occurred"
) => {
  return res.status(statusCode).json({
    error: {
      msgBody: message,
      msgError: true,
    },
  });
};

const messageResponse = (res, message, isAuthenticated, user, bottles) => {
  return res.status(200).json({
    message: { msgBody: message, msgError: false },
    isAuthenticated,
    user,
    bottles,
  });
};

module.exports = { errorResponse, messageResponse };

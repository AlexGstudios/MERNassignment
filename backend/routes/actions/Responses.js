const errorResponse = (
  res,
  statusCode = 500,
  message = "An error has occurred"
) => {
  return res.status(statusCode).json({
    // ändrade här fron error till message
    message: {
      msgBody: message,
      msgError: true,
    },
  });
};

const messageResponse = (res, message, isAuthenticated) => {
  return res.status(200).json({
    message: { msgBody: message, msgError: false },
    isAuthenticated,
  });
};

module.exports = { errorResponse, messageResponse };

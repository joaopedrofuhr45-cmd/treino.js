module.exports = (err, req, res, next) => {
  console.error('--- ERRO CAPTURADO ---');
  console.error(err);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Erro interno no servidor';
  
  return res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      status: statusCode
    }
  });
};

'use strict';

const successHanlder = function(res, data) {
  res.status(200).json({
    data,
    success: true,
    error: null
  });
};

const errorHanlder = function(res, error) {
  res.status(200).json({
    error,
    success: false,
    data: null
  });
};

const serverErrorHanlder = function(res, error) {
  res.status(500).json(error);
};

module.exports = {
  successHanlder: successHanlder,
  errorHanlder: errorHanlder,
  serverErrorHanlder: serverErrorHanlder
};

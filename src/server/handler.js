const predictClassification = require('../services/inferenceService');
const storeData = require('../services/storeData');
const crypto = require('crypto');
const getHistories = require('../services/getHistories');


async function postPredictHandler(request, h) {
  const { image } = request.payload;
  const { model } = request.server.app;
 
  const { confidenceScore, label, suggestion } = await predictClassification(model, image);
  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  const data = {
    "id": id,
    "result": label,
    "suggestion": suggestion,
    "confidenceScore": confidenceScore,
    "createdAt": createdAt
  }
  


  const response = h.response({
    status: 'success',
    message: 'Model is predicted successfully',
    data: data
  })
  response.code(201);
  return response;
}

async function getHistoriesHandler(request, h) {
  const data = await getHistories("\(default\)");

  const response = h.response({
      status: "success",
      data,
  });
  response.code(200)
  return response;
}

 
module.exports = {postPredictHandler, getHistoriesHandler};

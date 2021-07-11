const postToApi = async (url, data) => {
  const response = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" }
  });
  return response;
}

const postToLog = async (data) => {
  const url = 'http://localhost:9000/api/log';
  const response = await postToApi(url, data);
  const jsonResponse = await response.json();
  if (jsonResponse.activity_id) {
    return jsonResponse.activity_id;
  }
  return null;
}

const postToActivity = async (data) => {
  const url = 'http://localhost:9000/api/activity';
  const response = await postToApi(url, data);
  const jsonResponse = await response.json();
  if (jsonResponse.activity_id) {
    return jsonResponse.activity_id;
  }
  return null;
}

export { postToLog, postToActivity };
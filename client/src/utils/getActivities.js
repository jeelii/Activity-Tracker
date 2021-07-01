const getActivities = async () => {
  const apiResponse = await fetch('http://localhost:9000/api/activity');
  const jsonResponse = await apiResponse.json();
  return jsonResponse;
}

export default getActivities;
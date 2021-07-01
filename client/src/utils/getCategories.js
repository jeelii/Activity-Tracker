const getCategories = async () => {
  const apiResponse = await fetch('http://localhost:9000/api/activity/category');
  const jsonResponse = await apiResponse.json();
  return jsonResponse.categories;
}

export default getCategories;
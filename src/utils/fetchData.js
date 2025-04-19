const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': 'YOUR_API_KEY', // 🔁 Replace with your key
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
  }
};

export const fetchData = async (url, options) => {
  const response = await fetch(url, options);
  const data = await response.json();
  return data;
};

export { exerciseOptions };

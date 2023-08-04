

export default async function getData(url) {
    
  try {
    let response = await fetch(url, {
    method: 'GET',
    headers: {
          'Content-type': 'application/json; charset=UTF-8',
    }
});
    let result = await response.json();
    
    return result;
  } catch (err) {
    console.error(err);
    return[];
  }
};

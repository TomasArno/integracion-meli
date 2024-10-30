type Method = "POST" | "GET" | "PATCH" | "DELETE";

async function fetchData(param: { url: string; method?: Method }) {
  const { url, method = "GET" } = param;
  console.log(method);

  const response = await fetch(url, {
    headers: {},
    method,
  });

  const data = await response.json();

  if (response.status != 200 && response.status != 201) alert(data.response);
  else return data;
}

export default fetchData;

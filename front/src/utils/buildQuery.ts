function buildQuery(query: object) {
  const queryParsed = removeFalsyProps(query);
  let queryString: string = "?";

  for (const key in queryParsed) {
    queryString += `${key}=${queryParsed[key]}&`;
  }

  return queryString;
}

function removeFalsyProps(obj: object) {
  for (const key in obj) {
    if (!obj[key]) delete obj[key];
  }

  return obj;
}

export { buildQuery, removeFalsyProps };

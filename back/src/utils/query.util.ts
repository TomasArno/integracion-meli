function parseQueryParam(query: object) {
  const queryParsed = validateQueryProps(removeFalsyProps(query));

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

function validateQueryProps(query: object) {
  const availablePropsMap = {
    orderState: "order.status",
    q: "q",
    orderDateFrom: "order.date_created.from",
    orderDateTo: "order.date_created.to",
    seller: "seller",
    offset: "offset",
    limit: "limit",
  };

  const availableProps = {
    sort: "date_desc",
  };

  for (const key in query) {
    if (availablePropsMap[key])
      availableProps[availablePropsMap[key]] = query[key];
  }

  return availableProps;
}

export { parseQueryParam, removeFalsyProps };

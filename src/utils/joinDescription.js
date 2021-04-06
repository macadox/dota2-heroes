const joinDescription = (data, delimiter) => {
  return Array.isArray(data) ? data.join(delimiter) : data;
};

export default joinDescription;


const paginate = (array, pageSize, pageNumber) => {
  if (pageNumber < 1 || pageSize < 1) {
    return;
  }
  pageNumber -= 1;
  return array.slice(pageNumber * pageSize, (pageNumber + 1) * pageSize);
};

const totalPages = (arraySize, pageSize) => {
  return Math.ceil(arraySize / pageSize);
};



module.exports = {
  paginate, 
  totalPages,
}
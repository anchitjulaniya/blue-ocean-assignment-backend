// For reducing redundency - to be used in future
const applyApiFeatures = (query, queryString, sortField = 'name', searchField) => {

  if (queryString.search && searchField) {
    query = query.find({
      [searchField]: {
        $regex: queryString.search,
        $options: 'i'
      }
    });
  }

  const sortOrder = queryString.sort === 'desc' ? -1 : 1;
  query = query.sort({ [sortField]: sortOrder });
 
  const page = Number(queryString.page) || 1;
  const limit = Number(queryString.limit) || 10;
  const skip = (page - 1) * limit;

  query = query.skip(skip).limit(limit);

  return query;
};
 
 
module.exports = applyApiFeatures;
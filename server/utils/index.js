const getAge = dateString => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const validateQuery = query => {
  const isObject = typeof query === 'object' && query !== null;
  if (!isObject) return false;
  const isEmpty =
    Object.keys(query).length === 0 && query.constructor === Object;
  if (isEmpty) return false;
  return true;
};

const toMongoQuery = requestQuery => {
  const today = new Date();
  const yearAgo = new Date(today.setYear(today.getFullYear() - 1));
  const mongoQuery = { visible: true };
  if (validateQuery(requestQuery) === false) return mongoQuery;
  const {
    ageMin,
    ageMax,
    requiredAccount,
    gender,
    region,
    city
  } = requestQuery;
  if (ageMin || ageMax) mongoQuery.age = {};
  if (ageMin) mongoQuery.age['$gte'] = ageMin;
  if (ageMax) mongoQuery.age['$lte'] = ageMax;
  if (requiredAccount)
    mongoQuery[requiredAccount.toLowerCase()] = { $exists: true };
  if (gender) mongoQuery.gender = gender;
  if (region) mongoQuery.region = region;
  if (city) mongoQuery.city = city;
  return mongoQuery;
};

const censorSocials = posts => {
  return posts.map(postDoc => {
    const post = postDoc.toObject(); // Convert Mongo Document to plain object
    const socials = {};
    if (post.discord) socials.discord = true;
    if (post.facebook) socials.facebook = true;
    if (post.instagram) socials.instagram = true;
    if (post.kik) socials.kik = true;
    if (post.skype) socials.skype = true;
    if (post.snapchat) socials.snapchat = true;
    if (post.telegram) socials.telegram = true;
    if (post.whatsapp) socials.whatsapp = true;
    return { ...post, ...socials };
  });
};

module.exports = {
  getAge,
  toMongoQuery,
  censorSocials
};

require('dotenv').config();
const { createClient } = require('@sanity/client');
const imageUrlBuilder = require('@sanity/image-url');

const projectId = process.env.SANITY_PROJECT;
const apiToken = process.env.SANITY_TOKEN;
console.log({
  projectId,
  dataset: 'production',
  token: apiToken,
});

const client = createClient({
  projectId,
  dataset: 'production',
  token: apiToken,
});

async function fetchAllEntries() {
  const query = `
    *[ _type == "entry" && !(_id in path("drafts.**")) ] | order(publishedAt desc)
  `;
  const params = {};

  const a = await client.fetch(query, params);
  console.log(a);
  return a;
}

const imageBuilder = imageUrlBuilder(client);

async function imageUrl(image, width) {
  return imageBuilder.image(image).width(width).url();
}

module.exports = {
  fetchAllEntries,
  imageUrl,
};

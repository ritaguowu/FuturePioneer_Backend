const config = require("config");

const mapper = (enroll) => {
  const baseUrl = config.get("assetsBaseUrl");
  const mapImage = (image) => ({
    url: `${baseUrl}${image.fileName}_full.jpg`,
    thumbnailUrl: `${baseUrl}${image.fileName}_thumb.jpg`,
  });

  return {
    ...enroll,
    images: enroll.images.map(mapImage),
  };
};

module.exports = mapper;

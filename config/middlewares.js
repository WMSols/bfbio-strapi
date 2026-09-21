module.exports = [
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:'],
          'media-src': ["'self'", 'data:', 'blob:'],
          // This tells Strapi who is allowed to embed its content
          'frame-ancestors': ['*'],
          upgradeInsecureRequests: null,
        },
      },
      // Setting this to false removes the strict X-Frame-Options header,
      // allowing the 'frame-ancestors' rule above to take over.
      frameguard: false,
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
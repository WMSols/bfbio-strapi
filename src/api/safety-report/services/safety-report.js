'use strict';

/**
 * safety-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::safety-report.safety-report');

'use strict';

module.exports = {
  register() {},

  /**
   * @param {any} context
   */
  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe(async (/** @type {any} */ event) => {
      const { action, model } = event;

      const trackedActions = ['afterCreate', 'afterUpdate', 'afterDelete'];
      const updateModelUid = 'api::website-update-date.website-update-date';

      const excludedModels = [
        'api::job-application.job-application',
        'api::contact-message.contact-message',
        'api::safety-report.safety-report',
        updateModelUid 
      ];

      if (
        trackedActions.includes(action) && 
        model.uid.startsWith('api::') && 
        !excludedModels.includes(model.uid)
      ) {
        
        console.log(`[Lifecycle Hook Fired] Action: ${action}, Model: ${model.uid}`);

        try {
          const existingEntry = await strapi.entityService.findMany(updateModelUid);

          if (existingEntry) {
            await strapi.entityService.update(updateModelUid, existingEntry.id, {
              data: {
                lastUpdated: new Date(),
                publishedAt: new Date(),
              },
            });
          } else {
            await strapi.entityService.create(updateModelUid, {
              data: {
                lastUpdated: new Date(),
                publishedAt: new Date(),
              },
            });
          }
          
          strapi.log.info(`[Site Date Tracker] Updated successfully by ${model.uid}`);
          
        } catch (error) {
          strapi.log.error('Failed to update Website Date Tracker:', error);
        }
      }
    });
  },
};
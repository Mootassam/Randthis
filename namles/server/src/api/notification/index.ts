export default (app) => {

  app.put(
    `/tenant/:tenantId/notification/:id`,
    require("./notificationUpdate").default
  );



  app.get(
    `/tenant/:tenantId/notification/autocomplete`,
    require("./notificationAutocomplete").default
  );
  app.get(
    `/tenant/:tenantId/notification`,
    require("./notificationList").default
  );



    app.get(
    `/tenant/:tenantId/countUnreadByUser`,
    require("./notificationUnread").default
  );
  app.post(
    `/tenant/:tenantId/makeAsRead`,
    require("./notificationStatus").default
  );


  
  app.get(
    `/tenant/:tenantId/notification/:id`,
    require("./notificationFind").default
  );
};

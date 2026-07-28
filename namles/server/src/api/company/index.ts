export default (app) => {
    app.post(`/tenant/:tenantId/company`, require("./CompanyCreate").default);
    app.put(
      `/tenant/:tenantId/company/:id`,
      require("./CompanyCreate").default
    );
    app.get(`/tenant/:tenantId/company`, require("./CompanyList").default);
    app.get(`/tenant/:tenantId/company/:id`, require("./CompanyFind").default);

    // Public endpoint, doesn't require authentication or a tenant, so the
    // Terms and Conditions can be viewed before signing up / logging in.
    app.get(`/company/public/tc`, require("./CompanyPublicFind").default);
  };
  
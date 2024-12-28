export const EPIC_OAUTH_BASE =
  "https://fhir.epic.com/interconnect-fhir-oauth/oauth2";

export const EPIC_ENDPOINTS = {
  OAUTH: {
    AUTHORIZE: (query) => {
      // const params = new URLSearchParams(query)
      // console.log(`🟠 this is the query ${EPIC_OAUTH_BASE}/authorize?${query}`);
      return `${EPIC_OAUTH_BASE}/authorize?response_type=${query.response_type}&redirect_uri=${query.redirect_uri}&client_id=${query.client_id}&state=${query.state}&scope=${query.scope}
      `;
    },
    TOKEN: `${EPIC_OAUTH_BASE}/token`,
  },
};

export const EPIC = {
  OAUTH_ACTIONS: {
    AUTHORIZE: "authorize",
    REDIRECT: "redirect",
  },
};

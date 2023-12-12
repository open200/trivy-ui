import Keycloak from "keycloak-js";

async function checkRequiredKeycloakRole(keycloak: Keycloak): Promise<boolean> {
  const runtimeConfig = useRuntimeConfig();

  if (keycloak.hasResourceRole(runtimeConfig.public.keycloakRequiredRole)) {
    return true
  }

  console.log(`The user does not have the role ${runtimeConfig.public.keycloakRequiredGroup}!`);

  return false
}

export default defineNuxtPlugin({
  name: 'keycloak-plugin',
  parallel: false,
  async setup (app) {
    const runtimeConfig = useRuntimeConfig();

    const keycloak = new Keycloak({
      url: runtimeConfig.public.keycloakUrl,
      realm: runtimeConfig.public.keycloakRealm,
      clientId: runtimeConfig.public.keycloakClientId,
    });

    const userIsLoggedIn = await keycloak.init({
      onLoad: "login-required",
      checkLoginIframe: false,
    });

    app.$keycloak = keycloak;

    if (userIsLoggedIn && await checkRequiredKeycloakRole(keycloak)) {
      await keycloak.updateToken(2000);

      app.$userIsAuthenticated = true;
      return
    }

    app.$userIsAuthenticated = false;
  }
});

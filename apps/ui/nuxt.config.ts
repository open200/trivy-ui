import { defineNuxtConfig } from 'nuxt/config';
import { join } from 'path';
import { workspaceRoot } from '@nx/devkit';

/**
 * read the compilerOptions.paths option from a tsconfig and return as aliases for Nuxt
 **/
function getMonorepoTsConfigPaths(tsConfigPath: string) {
  const tsPaths = require(tsConfigPath)?.compilerOptions?.paths as Record<
    string,
    string[]
  >;

  const alias: Record<string, string> = {};
  if (tsPaths) {
    for (const p in tsPaths) {
      // '@org/something/*': ['libs/something/src/*'] => '@org/something': '{pathToWorkspaceRoot}/libs/something/src'
      alias[p.replace(/\/\*$/, '')] = join(
        workspaceRoot,
        tsPaths[p][0].replace(/\/\*$/, '')
      );
    }
  }

  return alias;
}

export default defineNuxtConfig({
  /**
   * aliases set here will be added to the auto generate tsconfig by Nuxt
   * https://nuxt.com/docs/guide/directory-structure/tsconfig
   **/
  alias: getMonorepoTsConfigPaths('../../tsconfig.base.json'),
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'Trivy Dashboard',
    }
  },
  runtimeConfig: {
    public: {
      keycloakUrl: process.env.KEYCLOAK_URL,
      keycloakRealm: process.env.KEYCLOAK_REALM,
      keycloakClientId: process.env.KEYCLOAK_CLIENT_ID,
      keycloakRequiredRole: process.env.KEYCLOAK_REQUIRED_ROLE
    }
  }
});

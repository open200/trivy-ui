import { verifyKeycloakToken } from "~/utils/keycloak-utils";

export default defineEventHandler(async (event) => {
    const requestedURL = getRequestURL(event)
    const runtimeConfig = useRuntimeConfig()

    if (requestedURL.pathname.includes('/api/')) {
        const token = getHeader(event, 'authorization')

        if (token === undefined) {
            throw createError({
                statusCode: 401,
                statusMessage: 'Authentication failed!',
            })
        }

        try {
          const decodedToken = await verifyKeycloakToken(token.split(' ')[1])

          const resourceRoles = decodedToken.resource_access[runtimeConfig.public.keycloakClientId]?.roles ?? []

          if (resourceRoles.includes(runtimeConfig.public.keycloakRequiredRole)) {
            return
          }
        } catch (error) {
          console.error(error)
          throw createError({
            statusCode: 401,
            statusMessage: 'Authentication failed!',
          })
        }

        throw createError({
          statusCode: 403,
          statusMessage: `User does not have assigned the role ${runtimeConfig.public.keycloakRequiredRole}!`,
        })
    }
})

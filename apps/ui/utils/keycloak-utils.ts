import jwt from 'jsonwebtoken';
import jwksClient from 'jwks-rsa';

// Function to retrieve Keycloak public key
const getKey = (header, callback) => {
    const runtimeConfig = useRuntimeConfig()
    const client = jwksClient({
        jwksUri: `${runtimeConfig.public.keycloakUrl}/realms/${runtimeConfig.public.keycloakRealm}/protocol/openid-connect/certs`,
    });

    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        callback(null, signingKey);
    });
};

export async function verifyKeycloakToken(token: string)  {
    return new Promise((resolve, reject) => {
      jwt.verify(token, getKey, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        return resolve(decoded);
      })
    })
};

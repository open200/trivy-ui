# Trivy UI
The Trivy UI dashboard retrieves the [Trivy Operator](https://github.com/aquasecurity/trivy-operator) reports from your Kubernetes cluster and displays them.

![trivy dashboard](https://raw.githubusercontent.com/open200/trivy-ui/main/Screenshot_01.png)
![trivy vulnerability report](https://raw.githubusercontent.com/open200/trivy-ui/main/Screenshot_02.png)


## Setup
The application is currently configured to use [Keycloak](https://www.keycloak.org) as authentication provider. This will be optional in the future.
1. Install the dependencies `npm i`
2. Create a configuration file `cp ./apps/ui/.env.example ./apps/ui/.env` and set the options
```
KEYCLOAK_URL=https://YOUR_KEYCLOAK_URL/auth
KEYCLOAK_REALM=YOUR_REALM
KEYCLOAK_CLIENT_ID=YOUR_CLIENT_ID
KEYCLOAK_REQUIRED_ROLE=YOUR_ROLE (see below)
```
Assign a role to your Keycloak client, e.g. `admin`, which must be assigned to the users who should have access to the dashboard.

Roles can be assigned to users by defining a Keycloak group and configuring the role mapping to point to your client.
3. Create a `kube-config.yml` file to authenticate to your cluster locally:
https://www.redhat.com/sysadmin/kubeconfig
4. Start the server `nx run ui:dev`

## Deployment

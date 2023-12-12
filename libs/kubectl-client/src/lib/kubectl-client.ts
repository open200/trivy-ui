import * as k8s from '@kubernetes/client-node'

const kc = new k8s.KubeConfig();

if (process.env['NODE_ENV'] === 'production') {
  const clusterConfig = {
    name: process.env['CLUSTER_NAME'] || 'inCluster',
    caFile: process.env['CLUSTER_SERVICEACCOUNT_CA_PATH'] || '/var/run/secrets/kubernetes.io/serviceaccount/ca.crt',
    server: `${process.env['CLUSTER_SCHEME']}://${process.env['KUBERNETES_SERVICE_HOST']}:${process.env['KUBERNETES_SERVICE_PORT']}`,
    skipTLSVerify: false,
  }

  const userConfig = {
    name: process.env['CLUSTER_USERNAME'] || 'inClusterUser',
    authProvider: {
      name: 'tokenFile',
      config: {
        tokenFile: process.env['CLUSTER_TOKEN_PATH'] || '/var/run/secrets/kubernetes.io/serviceaccount/token',
      },
    },
  }

  console.info("Cluster config: ", clusterConfig)
  console.info("User config: ", userConfig)

  kc.loadFromClusterAndUser( clusterConfig, userConfig)
} else {
    kc.loadFromFile('../../kube-config.yml');
}

const k8sApi = kc.makeApiClient(k8s.CustomObjectsApi);

export async function kubectlClient() {
  const resp = await k8sApi.listClusterCustomObject('aquasecurity.github.io', 'v1alpha1', 'vulnerabilityreports')

  return resp.body
}

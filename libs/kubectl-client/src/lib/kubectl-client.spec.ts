import { kubectlClient } from './kubectl-client';

describe('kubectlClient', () => {
  it('should work', () => {
    expect(kubectlClient()).toEqual('kubectl-client');
  });
});

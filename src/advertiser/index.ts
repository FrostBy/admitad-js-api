import { NotImplementedError } from '../core/errors';
import { AdmitadConfig } from '../core/types';

/**
 * Admitad Advertiser client
 *
 * @throws {NotImplementedError} Advertiser API is not yet implemented
 */
export class Advertiser {
  constructor(_config: AdmitadConfig) {
    throw new NotImplementedError('Advertiser');
  }
}

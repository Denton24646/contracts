import * as _ from 'lodash';
import {ZeroEx} from '0x.js';
import { Order } from './order';
import { OrderParams, DefaultOrderParams, OptionalOrderParams } from './types';
import { constants } from './constants';
import * as BigNumber from 'bignumber.js';

const MAX_DIGITS_IN_UNSIGNED_256_INT = 78;

export class OrderFactory {
  private defaultOrderParams: DefaultOrderParams;
  constructor(defaultOrderParams: DefaultOrderParams) {
    this.defaultOrderParams = defaultOrderParams;
  }
  public async newSignedOrderAsync(customOrderParams: OptionalOrderParams = {}) {
    const randomExpiration = new BigNumber(Math.floor((Date.now() + (Math.random() * 100000000000)) / 1000));
    const orderParams: OrderParams = _.assign({}, {
      expiration: randomExpiration,
      salt: ZeroEx.generatePseudoRandomSalt(),
      taker: ZeroEx.NULL_ADDRESS,
    }, this.defaultOrderParams, customOrderParams);
    const order = new Order(orderParams);
    await order.signAsync();
    return order;
  }
}

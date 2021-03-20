import get from 'lodash/get';

export class CardModel {
  constructor(data = {}) {
    this.avatar_url =
      get(data, 'owner.avatar_url') || get(data, 'avatar_url', '');
    this.login = get(data, 'owner.login') || get(data, 'login', '');
    this.owner = get(data, 'owner');
  }
}

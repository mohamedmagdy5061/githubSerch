import get from 'lodash/get';

export class UserModel {
  constructor(data = {}) {
    this.avatar_url = get(data, 'avatar_url', '');
    this.name= get(data, 'name', '');
    this.login= get(data, 'owner.login', '');
    this.followers= get(data, 'followers', '');
    this.following= get(data, 'following', '');
    this.public_gists= get(data, 'public_gists', '');
    this.public_repos= get(data, 'public_repos', '');
    this.company= get(data, 'company', 'NA');
    this.location= get(data, 'location', 'NA');
    this.email= get(data, 'email', 'NA');
    this.bio= get(data, 'bio', '');
    this.html_url= get(data, 'html_url', '');
  }
}

import get from 'lodash/get';

export class RepoModel {
  constructor(data = {}) {
    this.avatar_url = get(data, 'owner.avatar_url', '');
    this.name= get(data, 'name', '');
    this.login= get(data, 'owner.login', '');
    this.watchers= get(data, 'watchers', '');
    this.stargazers_count= get(data, 'stargazers_count', '');
    this.subscribers_count= get(data, 'subscribers_count', '');
    this.public_gists= get(data, 'public_gists', '');
    this.company= get(data, 'company', 'NA');
    this.language= get(data, 'language', 'NA');
    this.email= get(data, 'email', 'NA');
    this.description= get(data, 'description', '');
    this.html_url= get(data, 'html_url', '');
  }
}

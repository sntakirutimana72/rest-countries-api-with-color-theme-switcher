export default class {
  static fields = [
    'flags',
    'name',
    'population',
    'region',
    'capital',
    // 'topLevelDomain',
    // 'currencies',
    // 'languages',
    // 'borderCountries',
  ]

  static getCountries() {
    return new Promise((resolve, reject) => {
      fetch(`https://restcountries.com/v3.1/all?fields=${this.fields.join(',')}`)
        .then(resp => resp.json())
        .then(resolve)
        .catch(() => { reject() });
    });
  }
}

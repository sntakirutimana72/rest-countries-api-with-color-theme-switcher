export default class {
  static fields = [
    'flags',
    'name',
    'population',
    'region',
    'capital',
  ];
  static otherFields = [
    ...this.fields,
    'currencies',
    'tld',
    'subregion',
    'languages',
    'borders',
  ];

  static getCountries() {
    return new Promise((resolve, reject) => {
      fetch(`https://restcountries.com/v3.1/all?fields=${this.fields.join(',')}`)
        .then(resp => resp.json())
        .then(resolve)
        .catch(() => { reject() });
    });
  }

  static getDetails(name) {
    return new Promise((resolve, reject) => {
      fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true&fields=${this.otherFields.join(',')}`)
        .then(resp => resp.json())
        .then(resolve)
        .catch(() => { reject() });
    });
  }
}

import { isEmpty } from '../helpers/utils.js';

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

  /**
   *
   * @param { string[] } codes
   */
  static async getCountriesByCode(codes) {
    let listOf;

    try {
      const response = await fetch(`https://restcountries.com/v3.1/alpha?codes=${codes.join(',')}&fields=name`);
      listOf = await response.json();
    } catch {
      listOf = []
    }
    return listOf.map(({ name: { common } }) => common);
  }

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
        .then(async ([details,]) => {
          const { borders } = details;

          if (!isEmpty(borders)) {
            details.borders = await this.getCountriesByCode(borders);
          }
          resolve(details);
        })
        .catch(() => { reject() });
    });
  }
}

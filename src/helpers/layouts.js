import { $class, $create, $html } from './selectors.js';
import { toTitle } from './utils.js';

export const createCountryLayout = (item) => {
  const {
    flags: { png },
    name: { official, common },
    population, region, capital,
  } = item;
  const element = $create('li');

  $html(
    element,
    `
      <a href="./src/views/details.html?name=${common}">
        <div class="shadow">
          <img src="${png}" alt="${official}" />
          <h3>${common}</h3>
          <p>
            <span><b>Population</b>: ${population}</span>
            <span><b>Region</b>: ${region}</span>
            <span><b>Capital</b>: ${capital[0]}</span>
          </p>
        </div>
      </a>
    `
  );
  return element;
};

export const createDetailsLayout = (item) => {
  const {
    flags: { png },
    name: { common, nativeName },
    population, subregion, region, capital, tld, currencies, languages, borders,
  } = item;
  const currency = Object.values(currencies).map(({ name }) => name).join(', ');
  const natives = Object.values(nativeName);
  const native = natives[natives.length - 1]['common'];
  const lang = Object.values(languages);
  const neighbors = borders.map(i => `<li class="shadow">${toTitle(i)}</li>`).join('');
  const element = $create('div');

  lang.sort();
  $class(element, 'details');
  $html(
    element,
    `
      <a href="../../index.html" class="flex items-center shadow">
        <span class="material-symbols-outlined">west</span>
        <span>Back</span>
      </a>
      <div class="flex wrap details-wrapper">
        <img src="${png}" alt="${common}" />
        <section class="flex flex-col">
          <h2>${common}</h2>
          <div class="flex flex-col info">
            <ul class="flex flex-col details-para">
              <li><span>Native Name</span>: <span>${native}</span></li>
              <li><span>Population</span>: <span>${population}</span></li>
              <li><span>Region</span>: <span>${region}</span></li>
              <li><span>Sub Region</span>: <span>${subregion}</span></li>
              <li><span>Capital</span>: <span>${capital}</span></li>
            </ul>
            <ul class="flex flex-col details-para">
              <li><span>Top Level Domain</span>: <span>${tld.join(', ')}</span></li>
              <li><span>Currencies</span>: <span>${currency}</span></li>
              <li><span>Languages</span>: <span>${lang.join(', ')}</span></li>
            </ul>
          </div>
          <div class="flex wrap details-borders">
            <label>Border Countries:</label>
            <ul class="flex wrap">${neighbors}</ul>
          </div>
        </section>
      </div>
    `
  );
  return element;
};

import { $create, $html } from './selectors.js';

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
      <a>
        <div>
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

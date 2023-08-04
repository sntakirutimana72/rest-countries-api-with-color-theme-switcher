import { ThemeController, FiltersController, ApisController } from '../controllers/index.js';
import { $select, $selectAll, $text, $attrib, $class } from '../helpers/selectors.js';
import { createCountryLayout } from '../helpers/layouts.js';

const selectList = $select('.select-options');
const selectTrigger = $select('.select-trigger');

function handleOptionChange() {
  const value = $attrib(this, 'data-value');
  const text = $text(this);

  $attrib(selectTrigger, 'data-value', value);
  $text(selectTrigger.children[0], text);
}

const toggleDropdown = (force) => {
  $class(selectList, 'hidden', force);
};

const bindSelect = () => {
  $selectAll('.select-option').forEach(option => {
    option.addEventListener('click', handleOptionChange);
  });
  selectTrigger.addEventListener('click', () => { toggleDropdown(false) });
  document.addEventListener('click', ({ target }) => {
    if (!(target === selectTrigger || target.parentElement === selectTrigger)) {
      toggleDropdown(true);
      return true;
    }
  });
};

const populateData = () => {
  ApisController
    .getCountries()
    .then(
      (list) => {
        const listView = $select('.country-list');
        list.forEach(item => { listView.append(createCountryLayout(item)) })
      },
      () => { },
    );
};

const configure = () => {
  ThemeController.initiate();
  FiltersController.initiate();
  bindSelect();
  populateData()
};

export default configure;

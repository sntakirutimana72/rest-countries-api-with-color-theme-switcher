import { ThemeController, FiltersController, ApisController } from '../controllers/index.js';
import { $select, $class, $html } from '../helpers/selectors.js';
import { createCountryLayout } from '../helpers/layouts.js';

/**
 *
 * @param { string } target
 * @param { boolean } force
 */
const flag = (target, force) => {
  Array
    .from(document.body.children)
    .slice(1)
    .forEach(sibling => {
      const enforce = sibling.classList.contains(target) ? false : !force;
      $class(sibling, 'hidden', enforce);
    });
};

const onPopulate = () => {
  ApisController
    .getCountries()
    .then(list => {
      const listView = $select('.country-list');
      list.forEach(item => { listView.append(createCountryLayout(item)) });
      flag('main');
    })
    .catch(() => { flag('refresh') });
};

const onRefresh = () => {
  flag('status');
  $html($select('.country-list'), '');
  onPopulate();
};

const onBind = () => {
  $select('.refresh').addEventListener('click', onRefresh);
};

const configure = () => {
  ThemeController.initiate();
  FiltersController.initiate();
  onBind();
  onPopulate();
};

export default configure;

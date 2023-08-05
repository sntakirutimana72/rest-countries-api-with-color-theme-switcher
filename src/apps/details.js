import { ApisController, ThemeController } from '../controllers/index.js'
import { createDetailsLayout } from '../helpers/layouts.js';
import { $select, $class, $html } from '../helpers/selectors.js';

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
  const params = (new URL(window.location)).searchParams;
  const name = params.get('name');

  if (!name) return flag('refresh');

  ApisController
    .getDetails(name)
    .then(details => {
      $select('main').append(createDetailsLayout(details));
      flag('main');
    })
    .catch(() => { flag('refresh') });
};

const onRefresh = () => {
  flag('status');
  $html($select('main'), '');
  onPopulate();
};

const onBind = () => {
  $select('.refresh').addEventListener('click', onRefresh);
};

const configure = () => {
  ThemeController.initiate();
  onBind();
  onPopulate();
};

document.addEventListener('DOMContentLoaded', configure);

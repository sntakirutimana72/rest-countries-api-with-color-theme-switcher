import { ApisController, ThemeController } from '../controllers/index.js'
import { createDetailsLayout } from '../helpers/layouts.js';
import { $select, $class } from '../helpers/selectors.js';

const toggleStatus = (force) => {
  $class($select('.status'), 'hidden', force);
};

const populateData = () => {
  const params = (new URL(window.location)).searchParams;
  const name = params.get('name');

  ApisController
  .getDetails(name)
  .then(
    ([details,]) => {
      $select('main').append(createDetailsLayout(details));
      toggleStatus(true);
    },
    () => {
      toggleStatus(true);
    },
  );
};

const configure = () => {
  ThemeController.initiate();
  populateData();
};

document.addEventListener('DOMContentLoaded', configure);

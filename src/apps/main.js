import { ThemeController, FiltersController } from '../controllers/index.js';

const configure = () => {
  ThemeController.initiate();
  FiltersController.initiate();
};

export default configure;

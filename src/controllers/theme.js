import { $select, $class, $text } from '../helpers/selectors.js';
import { toTitle } from '../helpers/utils.js';
import { ThemeStore } from '../stores/index.js';

export default class {
  static switcher = $select('#theme-switcher')

  static initiate() {
    if (ThemeStore.isDarkMode()) {
      this.flag('dark');
    }

    this.switcher.addEventListener('click', this.changeTheme);

    if ('matchMedia' in window) {
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', this.changeThemeBySystemPreference);
    }
  }

  static unbinPrefersColor() {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', this.changeThemeBySystemPreference);
  }

  /**
   *
   * @param { string } theme
   */
  static flag(theme) {
    $class(document.body, 'dark');
    Array
      .from(this.switcher.children)
      .slice(0, 2)
      .forEach((icon) => {
        $class(icon, 'hidden');
      });
    $text(this.switcher.children[2], `${toTitle(theme)} Mode`);
  }

  static changeThemeBySystemPreference = () => {
    const theme = ThemeStore.fetch();

    if (theme) {
      this.unbinPrefersColor();
    } else {
      this.flag(theme || 'light');
    }
  }

  static changeTheme = () => {
    const theme = ThemeStore.changeMode();
    this.flag(theme);
  }
}

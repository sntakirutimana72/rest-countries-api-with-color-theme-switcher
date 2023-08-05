import { $class, $select, $attrib, $text } from '../helpers/selectors.js';

export default class {
  static dropdown = $select('.select-options');
  static trigger = $select('.select-trigger');
  static search = $select('#by-country');
  static list = $select('.country-list');

  static initiate() {
    this.search.addEventListener('input', this.findBy);
    this.trigger.addEventListener('click', () => this.toggle(false));
    Array
      .from(this.dropdown.children)
      .forEach(option => {
        option.addEventListener('click', this.changeOption);
      });
    document.addEventListener('click', ({ target }) => {
      if (!(target === this.trigger || target.parentElement === this.trigger)) {
        this.toggle(true);
        return true;
      }
    });
  }

  /**
   *
   * @param { string } key
   * @param { string } region
   */
  static applyFilter(key, region) {
    const children = Array.from(this.list.children);

    if (!(key || region)) {
      children.forEach(child => { $class(child, 'hidden', false) });
    } else if (!key && region) {
      children.forEach(child => {
        const force = $attrib(child, 'data-region') === region;
        $class(child, 'hidden', !force);
      });
    } else if (key && !region) {
      children.forEach(child => {
        const value = $attrib(child, 'data-filter');
        const force = value?.includes(key);
        $class(child, 'hidden', !force);
      });
    } else {
      children.forEach(child => {
        const filter = $attrib(child, 'data-filter');
        const reg = $attrib(child, 'data-region');
        const force = filter?.includes(key) && reg === region;
        $class(child, 'hidden', !force);
      });
    }
  }

  static findBy = ({ target }) => {
    const { value } = target;
    const region = $attrib(this.trigger, 'data-value');

    this.applyFilter(value.toLowerCase(), region);
  }

  static toggle(force) {
    $class(this.dropdown, 'hidden', force);
  }

  static changeOption = ({ target }) => {
    const value = $attrib(target, 'data-value')?.toLowerCase();
    const text = $text(target);
    const key = this.search.value.toLowerCase();

    $attrib(this.trigger, 'data-value', value);
    $text(this.trigger.children[0], text);
    this.applyFilter(key, value);
  }
}

import { AttrType } from './AttrType';


/**
 * An Attribute is set using element.setAttribute(key, value)
 * and removed using element.removeAttribute(key).
 *
 * This is the default method for applying values to a DOM node.
 */
export interface AttributeType {
  type: AttrType.ATTRIBUTE;
  name: string;
  value: string|boolean;
}


export function attribute(name: string, value: string|boolean): AttributeType {
  return {
    type: AttrType.ATTRIBUTE,
    name: name,
    value: value
  };
}


export function id(value: string): AttributeType {
  return attribute('id', value);
}


export function disabled(value: string): AttributeType {
  return attribute('disabled', value);
}


export function tabindex(value: string): AttributeType {
  return attribute('tabindex', value);
}


export function name(value: string): AttributeType {
  return attribute('name', value);
}


export function role(value: string): AttributeType {
  return attribute('role', value);
}


export function title(value: string): AttributeType {
  return attribute('title', value);
}


export function href(value: string): AttributeType {
  return attribute('href', value);
}


export function target(value: string): AttributeType {
  return attribute('target', value);
}


export function src(value: string): AttributeType {
  return attribute('src', value);
}


// FORM

export function value(value: string): AttributeType {
  return attribute('value', value);
}


export function checked(value: 'true'|'false'): AttributeType {
  return attribute('checked', value);
}


export function selected(value: 'true'|'false'): AttributeType {
  return attribute('selected', value);
}


// Uses 'htmlFor' because 'for' is a reserved word.
export function htmlFor(value: string): AttributeType {
  return attribute('for', value);
}


export function placeholder(value: string): AttributeType {
  return attribute('placeholder', value);
}


export function type(value: string): AttributeType {
  return attribute('type', value);
}


export function maxlength(value: string): AttributeType {
  return attribute('maxlength', value);
}


export function novalidate(value: string): AttributeType {
  return attribute('novalidate', value);
}


export function multiple(value: string): AttributeType {
  return attribute('multiple', value);
}


export function required(value: string): AttributeType {
  return attribute('required', value);
}


// ARIA

export function ariaAutocomplete(value: string): AttributeType {
  return attribute('aria-autocomplete', value);
}


export function ariaChecked(value: string): AttributeType {
  return attribute('aria-checked', value);
}


export function ariaControls(value: string): AttributeType {
  return attribute('aria-controls', value);
}


export function ariaDescribedBy(value: string): AttributeType {
  return attribute('aria-describedby', value);
}


export function ariaHasPopup(value: string): AttributeType {
  return attribute('aria-haspopup', value);
}


export function ariaHidden(value: string): AttributeType {
  return attribute('aria-hidden', value);
}


export function ariaInvalid(value: string): AttributeType {
  return attribute('aria-invalid', value);
}


export function ariaLabel(value: string): AttributeType {
  return attribute('aria-label', value);
}


export function ariaLevel(value: string): AttributeType {
  return attribute('aria-level', value);
}


export function ariaLive(value: string): AttributeType {
  return attribute('aria-live', value);
}


export function ariaMultiline(value: string): AttributeType {
  return attribute('aria-multiline', value);
}


export function ariaMultiselectable(value: string): AttributeType {
  return attribute('aria-multiselectable', value);
}


export function ariaOrientation(value: string): AttributeType {
  return attribute('aria-orientation', value);
}


export function ariaPressed(value: string): AttributeType {
  return attribute('aria-pressed', value);
}


export function ariaReadOnly(value: string): AttributeType {
  return attribute('aria-readonly', value);
}


export function ariaRequired(value: string): AttributeType {
  return attribute('aria-required', value);
}


export function ariaSelected(value: string): AttributeType {
  return attribute('aria-selected', value);
}


export function ariaValueMax(value: string): AttributeType {
  return attribute('aria-valuemax', value);
}


export function ariaValueMin(value: string): AttributeType {
  return attribute('aria-valuemin', value);
}


export function ariaValueNow(value: string): AttributeType {
  return attribute('aria-valuenow', value);
}


export function ariaValueText(value: string): AttributeType {
  return attribute('aria-valuetext', value);
}
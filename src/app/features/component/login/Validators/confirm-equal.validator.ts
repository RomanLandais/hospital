import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function confirmEqualValidators(
  field1: string,
  field2: string
): ValidatorFn {
  return (control: AbstractControl<any, any>): ValidationErrors | null => {
    const control1 = control.get(field1);
    const control2 = control.get(field2);

    if (!control1 || !control2) {
      return null;
    }

    if (control1.value !== control2.value) {
      control2.setErrors({ confirmEqual: true });
      return { confirmEqual: true };
    } else {
      control2.setErrors(null);
      return null;
    }
  };
}

import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  /**
   * Creates an Equal Matcher Validator Function to validate equality
   * between two form control values
   *
   * inspired by: https://toddmotto.com/reactive-formgroup-validation-angular-2
   *
   * @static
   * @param {string} firstCtrlName
   * @param {string} secondCtrlName
   * @param {string} [validationName='nomatch']
   * @returns Validator Function
   * @memberof CustomValidators
   */
  static equalMatcher(
    firstCtrlName: string,
    secondCtrlName: string,
    validationName = 'nomatch'
  ) {
    return (ctrl: AbstractControl): { [key: string]: boolean } => {
      const firstCtrl = ctrl.get(firstCtrlName);
      const secondCtrl = ctrl.get(secondCtrlName);

      if (!firstCtrl || !secondCtrl) {
        return null;
      }

      return firstCtrl.value === secondCtrl.value
        ? null
        : { [validationName]: true };
    };
  }

  static usernameAvailability(
    username: string,
    currentUsernames: Array<string>,
    validationName: string = 'match'
  ): ValidatorFn {
    return (ctrl: AbstractControl): { [key: string]: any } => {
      const mockData = ['andrelas', 'yannbf', 'khaled'];

      const result = mockData.find(item => {
        return item === username;
      });

      return result ? { [validationName]: true } : null;
    };
  }
}

import { Directive } from '@angular/core';
import { NG_ASYNC_VALIDATORS, AbstractControl } from '@angular/forms';

@Directive({
  selector: 'input[async-city]',
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: AsyncCityValidatorDirective,
      multi: true,
    },
  ],
})
export class AsyncCityValidatorDirective {
  validate(ctrl: AbstractControl): Promise<any> {
    return new Promise((resolve: Function) => {
      setTimeout(() => {
        if (ctrl.value == 'São Paulo' || ctrl.value == 'Rio de Janeiro') {
          resolve({});
          return;
        }

        resolve({ 'async-city': false });
      }, 100);
    });
  }
}

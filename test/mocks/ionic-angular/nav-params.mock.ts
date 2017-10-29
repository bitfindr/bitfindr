import { Optional } from '@angular/core';

export class NavParamsMock {
  get = jest.fn(_ => this.getReturn);

  constructor(@Optional() private getReturn?: any) {}
}

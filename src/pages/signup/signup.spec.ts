import { ComponentFixture, async } from '@angular/core/testing';
import { TestUtils } from './../../test';
import { SignupPage } from './signup';

let fixture: ComponentFixture<SignupPage> = null;
let instance: SignupPage = null;

describe('Pages: SignupPage', () => {

  beforeEach(async(() => {
    TestUtils.beforeEachCompiler([SignupPage])
      .then(compiled => {
        fixture = compiled.fixture;
        instance = compiled.instance;
      });
  }));

  it('should create page component', async(() => {
    expect(instance).toBeTruthy();
  }));
});

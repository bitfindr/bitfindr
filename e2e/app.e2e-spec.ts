import { browser, element, by } from 'protractor';

describe('MyApp', () => {

  beforeEach(() => {
    browser.get('');
  });

  it('should have a title', () => {
    browser.getTitle().then(title => expect(title).toEqual('Bitfindr'));
    done();
  });

});

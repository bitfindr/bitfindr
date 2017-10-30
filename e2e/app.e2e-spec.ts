import { browser, element, by } from 'protractor';

describe('MyApp', () => {

  beforeEach(done => {
    browser.ignoreSynchronization = true;
    browser.get('')
      .then(done);
  });

  it('should have a title', done => {
    browser.getTitle()
      .then(title => expect(title).toEqual('Bitfindr'))
      .then(done);
  });

});

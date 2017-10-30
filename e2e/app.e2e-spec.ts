import { browser, element, by } from 'protractor';

describe('MyApp', () => {

  let username, password, loginButton;

  beforeEach(done => {
    browser.ignoreSynchronization = true;
    browser.get('')
      .then(done);
    username = element(by.css('input[type=email]'));
    password = element(by.css('input[type=password]'));
    loginButton = element(by.id('login-button'));
  });

  it('should have Bitfindr title', done => {
    browser.getTitle()
      .then(title => expect(title).toEqual('Bitfindr'))
      .then(done);
  });

  it('should validate the credentials for a successful login and display HomePage view', () => {
    username.sendKeys('daenerys@targarien.com');
    password.sendKeys('asdasd');

    loginButton.click().then(function() {
      // Wait for the authentication to finish
      browser.driver.sleep(2000).then( done => {
        element.all(by.css('.toolbar-title'))
          .last()
          .getText()
          .then(text => expect(text).toEqual('Home'));
      });
    });
  });
});

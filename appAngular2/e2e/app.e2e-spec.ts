import { AppAngular2Page } from './app.po';

describe('app-angular2 App', () => {
  let page: AppAngular2Page;

  beforeEach(() => {
    page = new AppAngular2Page();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to app!!'))
      .then(done, done.fail);
  });
});

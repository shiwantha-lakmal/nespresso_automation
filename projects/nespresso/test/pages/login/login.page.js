import allureReporter from '@wdio/allure-reporter';
import Page from '../page';
import { utcTimestamp } from '../../../../../support/helpers/utils';

class LoginPage extends Page {
  get passwordFld() {
    return $('//android.widget.EditText[2]');
  }

  get usernameFld() {
    return $('//android.widget.EditText[1]');
  }
  get errorMessageFld() {
    return $('//android.view.View[@content-desc="Authorisation: error message field\n' + 'Wrong username or password"]');
  }

  get signInBtn() {
    return $('~Sign In');
  }


  async login(username, password) {
    await allureReporter.startStep(utcTimestamp() + `Login ${username}`);
    await this.usernameFld.click();
    await this.usernameFld.setValue(username);
    await this.passwordFld.click();
    await this.passwordFld.setValue(password);
    await this.checkAndHideKeyboardIfVisible();
    await this.signInBtn.click();
    await allureReporter.endStep('passed');
  }

}

export default new LoginPage();

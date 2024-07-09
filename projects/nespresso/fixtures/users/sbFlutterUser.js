import allureReporter from '@wdio/allure-reporter';
import BasicUser from './basicUser';

export default class NpFlutterUser extends BasicUser {
  constructor() {
    super();
    this.username = 'N/A';
    this.password = 'N/A@123';
    this.incorrectUsername = 'wrongcr%^^&edentials';
    this.incorrectPassword = 'wrongp^&assword';
    this.exceedCharUsername = 'N/A@gmail.com';
    this.exceedCharPassword = 'N/A';
    this.identicalUsername = 'identicalUserName';
    this.identicalPassword = 'identicalUserName';
    this.unsupportedCharUsername = 'N/A';
    this.unsupportedCharPassword = 'N/A';
    this.disabledUsername = 'N/A';
    this.disabledPassword = 'N/A@123';
    allureReporter.addStep(`Using user ${this.username} with password ${this.password}`);
  }
}

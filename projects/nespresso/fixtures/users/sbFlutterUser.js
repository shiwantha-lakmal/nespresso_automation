import allureReporter from '@wdio/allure-reporter';
import BasicUser from './basicUser';

export default class NpFlutterUser extends BasicUser {
  constructor() {
    super();
    this.username = 'N/A';
    this.password = 'N/A@123';
    this.incorrectUsername = 'wrongcr%^^&edentials';
    this.incorrectPassword = 'wrongp^&assword';
    allureReporter.addStep(`Using user ${this.username} with password ${this.password}`);
  }
}

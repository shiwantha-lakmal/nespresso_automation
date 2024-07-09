class DateUtil {
  async getAppTime(appTime) {
    return new Date(`1970-01-01T${appTime}:00`);
  }

  async getAppDate(appDate, currentTime) {
    return new Date(`${appDate} ${currentTime.getFullYear()}`);
  }

  async getTheHoursDifference(timeString, dateString, currentTime) {
    let appTime = await this.getAppTime(timeString);
    let appDate = await this.getAppDate(dateString, currentTime);
    let appDateTime = await new Date(appDate);
    appDateTime.setHours(appTime.getHours());
    appDateTime.setMinutes(appTime.getMinutes());
    let timeDifference = appDateTime.getTime() - currentTime.getTime();
    let hoursDifference = timeDifference / (1000 * 60 * 60);
    return hoursDifference;
  }
}

export default new DateUtil();

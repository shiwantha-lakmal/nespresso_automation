
# Nespresso tests
* JS naming conventions [link](./docs/js-naming-conventions.md)


### Projects covered with tests(used in configuration):
* Nespresso

### Best practices used
* device wise capability separation (device farm compatible)
* browser+platform wise configuration (incase required to launch mobile browser - web verification)
* maintain constance keywords
* Utility classes
* reporting configurations
* support page-object model
* test suite execution and selected test execution option

### System requirements
* Install Java: [link](https://www.oracle.com/java/technologies/downloads/#jdk19-mac). If you get this error ('error @wdio/selenium-standalone-service error selenium exited before it could start with code 1')
* Node v12+ (will be installed automatically via Volta.sh)
* allure reports configuration

### Installation
* `npm install`

### Usage
* `npm run test -- --platform=LOCAL_ANDROID --project=nespresso --testEnv=staging` All tests within nespresso project
* `npm run test -- --platform=LOCAL_ANDROID --project=nespresso --testEnv=staging --suite login ` Run specific tests, which are grouped to suites.

---

#### Project structure:
* `support` - folder for shared util/helper files, available globally. You can import it from any subdirectory like this: `import ElementUtil from 'support/element-util';`
* `support/browserCommands` - helper file with globally available methods within *browser* scope
* `support/elementCommands` - helper file with globally available methods within *element* scope
* `projects` - different websites/brands that has e2e tests
* `reporters` - contains custom reporters
* `projects/<project_name>/test/specs` - main folder where e2e tests/assertions are written
* `projects/<project_name>/test/pages` - main folder where all abstraction for UI element interaction is written.
* `projects/<project_name>/config` - main folder where all project configuration related files resides
* `projects/<project_name>/api` - main folder where API functions for querying BackEnd Services/BackOffice 
* `projects/<project_name>/fixtures` - main folder where test data resides 
* `projects/<project_name>/constants` - main folder with constants that are reused across the project 
* `env.example` - list of some ENVironment variables that can are used mostly in CI env. Not mandatory in local env.

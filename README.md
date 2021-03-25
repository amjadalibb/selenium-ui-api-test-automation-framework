## Test Automation framework for UI and API

- This is BDD test automation framework for both UI and API
- Below is the tech stack for both UI and API framework:
	- UI Framework
		 - Node.js
		 - Cucumber-js
		 - Cucumber-html-reporter
		 - Chai
		 - Selenium-webdriver
	- API Framework
		 - Node.js
		 - Cucumber-js
		 - Cucumber-html-reporter
		 - Chai
		 - Axios

### UI Framework
- Info: 
	- BDD testing framework
	- Website: http://automationpractice.com/index.php
	- Add 2 items to the cart and place an order

- Pre-requisite:
	 - Windows: Must enable execution of scripts, run below powershell command:
	 	- `Set-ExecutionPolicy -ExecutionPolicy Unrestricted`

- Environment Variables:
	- There is `.env` file inside `\ui-automation` directory which contains all environment variables
	- BASE_URL: This is the base url of website (http://automationpractice.com/index.php)
	- VIEWPORT: Chrome driver can run on specified viewport (e.g. 1024x768).
		- **Removing this variable will run on full screen**
	- EMAIL: Email address to login website
	- PASSWORD: Password to login website
	- HEADLESS: Runs on headless if value is set `true`, otherwise `false` for normal mode

- How To Run:
	 - Open command prompt or powershell and Go to directory `\ui-automation`
	 - Install modules `npm install`
	 - Run command `npm run test`


### API Framework
- Info: 
	- BDD testing framework
	- Service: http://openweathermap.org/forecast16
	- Assert that weather temperature is greater than 10 degrees C in Sydney on Thursdays
    - Assert that response is valid JSON and contains Sydney

- Environment Variables:
	- APPKEY: Must create account on website and get API key after login

- How To Run
	 - Open command prompt or powershell and Go to directory `\api-automation`
	 - Install modules `npm install`
	 - Run command `npm run test`

### Report
- Report is generated and launched after execution
- Report is located under `\test\report`

### Contributor
- Amjad Ali (amjadali_bb@hotmail.com)

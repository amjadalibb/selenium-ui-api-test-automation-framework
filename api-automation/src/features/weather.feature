Feature: API Automation Challenge
	Scenario: A happy holidaymaker
		Given I like to holiday in 'Sydney'
		And I only like to holiday on 'Thursdays'
		When I look up the weather forecast
		Then I receive the weather forecast
		And The temperature is warmer than 10 degrees
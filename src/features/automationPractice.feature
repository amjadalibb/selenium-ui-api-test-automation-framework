Feature: Automation Practice
  Scenario: Add two items in cart and place order
    Given I have opened website
    When I login account
    And I add two items in cart
    And I proceed to checkout
    Then I validate order
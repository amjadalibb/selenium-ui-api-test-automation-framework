Feature: Automation Practice
  Scenario: I want to be able to add 2 items to the cart and place an order
    Given I have opened website
    When I login account
    And I navigate to section 'Dresses'
    And I add 'Printed Dress' to cart
    And I continue shopping
    And I navigate to section 'Women'
    And I add 'Blouse' to cart
    And I proceed to checkout
    Then I validate order
Feature: Carrito de compras

  Background:
    Given el usuario está autenticado con usuario "standard_user" y contraseña "secret_sauce"

  Scenario Outline: El usuario agrega un producto al carrito desde la página de productos - Producto <productName>
    When el usuario limpia el carrito
    And el usuario agrega el producto <productName> desde la página de productos
    Then el contador del carrito debe ser 1

    Examples:
      | productName                         |
      | "Sauce Labs Fleece Jacket"          |
      | "Sauce Labs Onesie"                 |
      | "Test.allTheThings() T-Shirt (Red)" |

  Scenario Outline: El usuario ve el producto agregado en la página del carrito - Producto <productName>
    When el usuario limpia el carrito
    And el usuario agrega el producto <productName> desde la página de productos
    And el usuario abre la página del carrito
    Then el usuario debe ver el producto <productName> en la lista del carrito

    Examples:
      | productName               |
      | "Sauce Labs Backpack"     |
      | "Sauce Labs Bike Light"   |
      | "Sauce Labs Bolt T-Shirt" |

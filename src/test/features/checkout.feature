Feature: Checkout - completar compra

  Background:
    Given el usuario está autenticado con usuario "standard_user" y contraseña "secret_sauce"
    And el usuario limpia el carrito
    And el usuario agrega el producto "Sauce Labs Backpack" desde la página de productos

  Scenario: El usuario puede completar el proceso de compra hasta la confirmación
    When el usuario abre el carrito
    And el usuario inicia el checkout
    And el usuario completa el formulario de envío con nombre "Juan" apellido "Perez" y código postal "12345"
    And el usuario continua al resumen de pedido
    Then debe ver el producto "Sauce Labs Backpack" en el resumen del checkout
    When el usuario finaliza la compra
    Then debería ver el mensaje de confirmación "Thank you for your order!"
    And debería ver el texto de despacho "Your order has been dispatched, and will arrive just as fast as the pony can get there!"

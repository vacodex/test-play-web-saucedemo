Feature: Autenticación de usuario

  Background:
    Given el usuario está en la página de inicio de sesión

  Scenario: Inicio de sesión exitoso con credenciales válidas
    When el usuario ingresa un nombre de usuario válido "standard_user"
    And el usuario ingresa una contraseña válida "secret_sauce"
    And el usuario hace clic en el botón de inicio de sesión
    Then el usuario debería ser redirigido a la página de productos
    And el usuario debería ver el título de la página de productos "Products"

  Scenario: Inicio de sesión fallido con credenciales inválidas
    When el usuario ingresa un nombre de usuario inválido "usuarioInvalido"
    And el usuario ingresa una contraseña inválida "contraseñaIncorrecta"
    And el usuario hace clic en el botón de inicio de sesión
    Then el usuario debería permanecer en la página de inicio de sesión
    And el usuario debería ver un mensaje de alerta "Epic sadface: Username and password do not match any user in this service"

  Scenario: Inicio de sesión fallido por usuario bloqueado
    When el usuario ingresa un nombre de usuario bloqueado "locked_out_user"
    And el usuario ingresa una contraseña válida "secret_sauce"
    And el usuario hace clic en el botón de inicio de sesión
    Then el usuario debería permanecer en la página de inicio de sesión
    And el usuario debería ver un mensaje de alerta "Epic sadface: Sorry, this user has been locked out."

export default `
<div class="container">
  <form class="loginForm">
    <div>
      <p class="form__header">Login</p>
      {{> loginInput}}
      {{> passwordInput}}
    </div>
    <div class="formBottom">
      {{> signInButton}}
      <p class="login__registrationText"><a id="navToRegistration">Registration</a></p>
    </div>
  </form>  
</div>
`;

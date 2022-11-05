export default `
<div class="container">
  <form class="loginForm" name="loginForm">
    <div>
      <p class="form__header">Login</p>
      {{> loginInput}}
      {{> passwordInput}}
    </div>
    <div class="formBottom">
      {{> signInButton}}
      {{> linkToRegistration}}
    </div>
  </form>  
</div>
`;

export default `
<div class="container">
  <form class="registrationForm">
    <div>
      <p class="form__header">Registration</p>
      {{> emailInput }}
      {{> loginInput }}
      {{> nameInput }}
      {{> surnameInput }}
      {{> phoneInput }}
      {{> passwordInput }}
      {{> passwordSecondInput }}
    </div>
    <div class="formBottom">
      {{> completeRegistration}}
      {{> linkToLogin}}
    </div>
  </form>  
</div>
`;

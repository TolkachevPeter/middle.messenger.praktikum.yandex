export default `
<div class="profileContainer">
  <div class="profileContainer__navBack">
    {{> toChat}}
  </div>
  <div class="profileContainer__main">
    <div class="profileImage" style="background-image: url('{{avatarUrl}}')"></div>
    <div class="profileName">{{displayName}}</div>
    <div class="profileInputFields">
    <form name="userForm" class="profileForm" onsubmit="return false">
      {{> emailInput}}
      {{> loginInput}}
      {{> nameInput}}
      {{> surnameInput}}
      {{> displayName}}
      {{> phoneInput}}
      </form>
    </div>
    <div class="profileConfigs">
      {{> changeUserInfo}}
      {{> changePassword}}
      {{> logout}}
    </div>
  </div>
</div>
`;

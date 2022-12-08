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
      {{> changeAvatar}}
      {{> logout}}
    </div>
    <form id="avatarForm" name="avatarForm" enctype="multipart/form-data" hidden>
    <input id="avatarInput" type="file" name="avatar" accept="image/*">
    <input id="avatarFormSubmit" type="submit">
    </form> 
  </div>
</div>
`;

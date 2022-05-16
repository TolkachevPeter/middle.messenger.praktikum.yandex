export default `
<div class="profileContainer">
  <div class="profileContainer__navBack">
    <button id="navToChats" class="roundButton">{{buttonText}}</button>
  </div>
  <div class="profileContainer__main">
    <div class="profileImage"></div>
    <div class="profileName">Ivan</div>
    <div class="profileInputFields">
      {{> emailInputFieldProfile}}
      {{> loginInputFieldProfile}}
      {{> nameInputFieldProfile}}
      {{> surnameInputFieldProfile}}
      {{> visibleNameInputFieldProfile}}
      {{> phoneInputFieldProfile}}
    </div>
    <div class="profileConfigs">
      <div>
        <span class="profileConfigs__changeUserSettings">Change user settings</span>
      </div>
      <div>
        <span class="profileConfigs__changePassword">Change password</span>
      </div>
      <div>
        <span class="profileConfigs__logout">Logout</span>
      </div>
    </div>
  </div>
</div>
`;

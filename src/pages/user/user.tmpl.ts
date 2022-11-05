export default `
<div class="profileContainer">
  <div class="profileContainer__navBack">
    {{> toChat}}
  </div>
  <div class="profileContainer__main">
    <div class="profileImage"></div>
    <div class="profileName">{{displayName}}</div>
    <div class="profileInputFields">
    <form name="profileForm" class="profileForm" onsubmit="return false">
      {{> emailInput}}
      {{> loginInput}}
      {{> nameInput}}
      {{> surnameInput}}
      {{> displayName}}
      {{> phoneInput}}
      </form>
    </div>
    <div class="profileConfigs">

      {{> logout}}
    </div>
  </div>
</div>
`;

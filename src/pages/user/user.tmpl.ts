export default `
<div class="profileContainer">
  <div class="profileContainer__navBack">
    {{> toChat}}
  </div>
  <div class="profileContainer__main">
    <div class="profileImage"></div>
    <div class="profileName">Ivan</div>
    <div class="profileInputFields">
      {{> emailInput}}
      {{> loginInput}}
      {{> nameInput}}
      {{> surnameInput}}
      {{> displayName}}
      {{> phoneInput}}
    </div>
    <div class="profileConfigs">

      {{> logout}}
    </div>
  </div>
</div>
`;

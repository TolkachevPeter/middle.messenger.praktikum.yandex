export default `
  <div class="chatlist">
    {{> linkToProfile }}
<div class="searchField">
  <input placeholder="Search..." id="searchField" type="text" value="" name="searchField">
</div>
    <div class="chatlist__chats">
      {{> chatContacts }}
    </div>
  </div>
`;

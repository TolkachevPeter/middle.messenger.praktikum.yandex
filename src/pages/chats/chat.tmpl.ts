export default `
  <div class="chatPageContainer">
    {{> chatList }}
    {{#if isChatSelected}}
      {{> messages}}
    {{else}}
      <div class="chatWindowNoMessages">
        <span class="chatwindow_no-selected-chat">Choose a chat to send a message</span>
      </div>
    {{/if}}
  </div>
`;

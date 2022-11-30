export default `
  <div class="chatContact {{#if isSelected}} chatContact-selected{{/if}}">
    <div class="chatContact__photo" style="background-image: url('{{avatarUrlChatPhoto}}')"></div>
    <div class="chatContact__middleSection">
      <p class="chatContact__name">{{firstName}}</p>
      <p class="chatContact__lastMessage">{{content}}</p>
    </div>
    <div class="chatContact__spacer"></div>
    <p class="chatContact__lastMessageTime" >{{time}}</p>
  </div>
`;


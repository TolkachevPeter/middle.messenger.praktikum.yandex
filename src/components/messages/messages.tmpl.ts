// export default `
// 	<div class="chatwindow">
// 		<div class="chatwindow__header">
// 			<div class="chatwindow__header_profileimage_small"></div>
// 			<div class="chatwindow__header_settings"></div>
// 		</div>
// 		<div class="message">
// 			<span class="message__date">${new Date().getDate()}</span>
// 			<div class="message__reader-msg-container">
// 				<p class="message__reader-msg">Message
// 				</p>
// 				<p class="message__time">${new Date(new Date().getTime())}</p>
// 			</div>
// 			<div class="message__author-msg-container">
// 				<div class="message__spacer"></div>
// 				<div class="message__author-msg-container-content">
// 					<p class="message__author-msg">Cool!</p>
// 					<p class="message__time">12:00</span>
// 				</div>
// 			</div>
// 		</div>
// 		<form name="messageForm" id="messageForm" class="form-message" onsubmit="return false">
// 			<div class="form-message__attachment"></div>
// 			<div class="form-message__inputfield">
// 				{{> messageInput}}
// 			</div>
// 			<div class="form-message__submit-msg">
// 				{{> submitMessageButton }}
// 			</div>
// 		</form>
// 	</div>
// `;


export default `
  <div class="chatwindow">
    <div class="chatwindow__header">
      <div class="chatwindow__header_profileimage_small"></div>
      <div class="chatwindow__header_settings"></div>
    </div>
    <div class="conversation">
      <span class="conversation__date">19 June</span>
      <div class="conversation__reader-msg-container">
        <p class="conversation__reader-msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p class="conversation__time">11:56</p>
      </div>
      <div class="conversation__author-msg-container">
        <div class="conversation__spacer"></div>
        <div class="conversation__author-msg-container-content">
          <p class="conversation__author-msg">Cool!</p>
          <p class="conversation__time">12:00</span>
        </div>
      </div>
      <span class="conversation__date">19 June</span>
      <div class="conversation__reader-msg-container">
        <p class="conversation__reader-msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p class="conversation__time">11:56</p>
      </div>
      <div class="conversation__author-msg-container">
        <div class="conversation__spacer"></div>
        <div class="conversation__author-msg-container-content">
          <p class="conversation__author-msg">Cool!</p>
          <p class="conversation__time">12:00</span>
        </div>
      </div>
      <span class="conversation__date">19 June</span>
      <div class="conversation__reader-msg-container">
        <p class="conversation__reader-msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p class="conversation__time">11:56</p>
      </div>
      <div class="conversation__author-msg-container">
        <div class="conversation__spacer"></div>
        <div class="conversation__author-msg-container-content">
          <p class="conversation__author-msg">Cool!</p>
          <p class="conversation__time">12:00</span>
        </div>
      </div>
      <span class="conversation__date">19 June</span>
      <div class="conversation__reader-msg-container">
        <p class="conversation__reader-msg">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
        eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
        sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <p class="conversation__time">11:56</p>
      </div>
      <div class="conversation__author-msg-container">
        <div class="conversation__spacer"></div>
        <div class="conversation__author-msg-container-content">
          <p class="conversation__author-msg">Cool!</p>
          <p class="conversation__time">12:00</span>
        </div>
      </div>
    </div>
    <form name="conversationForm" id="conversationForm" class="form-conversation" onsubmit="return false">
      <div class="form-conversation__attachment"></div>
      <div class="form-conversation__inputfield">
        {{> messageInput}}
      </div>
      <div class="form-conversation__submit-msg">
        {{> submitMessageButton }}
      </div>
    </form>
</div>
`;

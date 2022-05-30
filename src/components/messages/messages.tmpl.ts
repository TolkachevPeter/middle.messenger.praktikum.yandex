export default `
	<div class="chatwindow">
		<div class="chatwindow__header">
			<div class="chatwindow__header_profileimage_small"></div>
			<div class="chatwindow__header_settings"></div>
		</div>
		<div class="message">
			<span class="message__date">${new Date().getDate()}</span>
			<div class="message__reader-msg-container">
				<p class="message__reader-msg">Message
				</p>
				<p class="message__time">${new Date(new Date().getTime())}</p>
			</div>
			<div class="message__author-msg-container">
				<div class="message__spacer"></div>
				<div class="message__author-msg-container-content">
					<p class="message__author-msg">Cool!</p>
					<p class="message__time">12:00</span>
				</div>
			</div>
		</div>
		<form name="messageForm" id="messageForm" class="form-message" onsubmit="return false">
			<div class="form-message__attachment"></div>
			<div class="form-message__inputfield">
				{{> messageInput}}
			</div>
			<div class="form-message__submit-msg">
				{{> submitMessageButton }}
			</div>
		</form>
	</div>
`;

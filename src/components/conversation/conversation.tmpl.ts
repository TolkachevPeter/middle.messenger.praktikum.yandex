export default `
	<div class="chatwindow">
		<div class="chatwindow__header">
			<div class="chatwindow__header_profileimage_small"></div>
			<div>
			{{>searchPerson}}
			{{>removePerson}}
			</div>
		</div>
		<div class="message">
            {{>messages}}
		</div>
		<form name="messageForm" id="messageForm" class="form-message" onsubmit="return false">
			<div class="form-message__attachment"></div>
			<div class="form-message__input">
				{{> messageInput}}
			</div>
			<div class="form-message__submit-msg">
				{{> submitMessageButton }}
			</div>
		</form>
	</div>
`;


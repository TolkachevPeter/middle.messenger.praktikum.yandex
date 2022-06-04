export default `
    <div
      class="{{#if mediumMarginHorizontally}}mediumMarginLeft mediumMarginRight {{/if}}
      {{#if vbox}}input_style_VBox{{else}}input_style_HBox{{/if}}
      {{#if style_justifyContentSpaceBetween}}style_justifyContentSpaceBetween{{/if}}">
      {{#if isLabelEnabled}}
        <label for="{{inputId}}" class="{{labelStyle}}">{{inputText}}</label>
      {{/if}}
      <input
        placeholder="{{inputPlaceholder}}"
        type="{{inputType}}"
        value="{{inputValue}}"
        name="{{inputText}}"
        class="input {{inputStyle}}"
        {{#if readOnly}}readonly{{/if}}>
    </div>
    {{#unless isValid}}
      <span class="input__error-msg mediumMarginLeft mediumMarginRight">{{validationMessage}}</span>
    {{/unless}}
`;

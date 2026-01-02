# Debug Chatbot Button

## Status
- [ ] Investigate why the chat button is unclickable
- [ ] Fix root cause (Z-index, JS error, or overlay)
- [ ] Verify fix

## Context
User reports "inte ens går att klicka på knappen till chatten" (cannot even click the button to the chat). This likely refers to the floating toggle button.
The chat was recently refactored to use `useChat` from `@ai-sdk/react`.

## Analysis
- Previous error was `input.trim` on undefined. Fixed with optional chaining.
- Current state: User says button is unclickable.

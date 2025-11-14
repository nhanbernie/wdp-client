# Input Theme Styling

## Override Input Component để theo Theme

Input component mặc định có hardcoded colors (purple, blue). Để theo theme:

### 1. Helper Functions

```typescript
const getInputStyles = (hasError: boolean) => ({
  backgroundColor: colors.cardBackgroundSecondary,
  color: colors.text,
  borderColor: hasError ? colors.error : `${colors.border}30`,
  borderWidth: '1px',
  borderStyle: 'solid',
})

const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
  e.currentTarget.style.borderColor = colors.accent
  e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accent}20`
}

const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>, hasError: boolean) => {
  e.currentTarget.style.borderColor = hasError ? colors.error : `${colors.border}30`
  e.currentTarget.style.boxShadow = 'none'
}
```

### 2. Input Usage

```tsx
<Input
  className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
  style={getInputStyles(!!errors.fieldName)}
  onFocus={handleInputFocus}
  onBlur={(e) => handleInputBlur(e, !!errors.fieldName)}
/>
```

### 3. Placeholder Styling

```tsx
<style>
  {`
    .address-form-input::placeholder {
      color: ${colors.textSecondary} !important;
    }
  `}
</style>
```

### Notes

- `!border-0`: Remove default border from Input component
- `focus:!ring-0`: Remove default ring on focus
- Border opacity: `30%` để nhẹ nhàng, không đen thui
- Focus state: Dùng `colors.accent` với shadow nhẹ
- Error state: Dùng `colors.error` cho border

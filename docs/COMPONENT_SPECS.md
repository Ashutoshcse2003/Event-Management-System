# 🧩 Component Specifications

## Detailed Component Library Reference

---

## Table of Contents

1. [Button Components](#button-components)
2. [Input Components](#input-components)
3. [Card Components](#card-components)
4. [Navigation Components](#navigation-components)
5. [Modal & Dialog Components](#modal--dialog-components)
6. [Table Components](#table-components)
7. [Form Components](#form-components)
8. [Feedback Components](#feedback-components)
9. [Data Display Components](#data-display-components)
10. [Layout Components](#layout-components)

---

## 🔘 Button Components

### Primary Button

**Purpose:** Main call-to-action, high emphasis actions

**Visual Specs:**

```
Background: Linear gradient (primary-500 to secondary-500)
Text: White, Poppins Semibold 14px
Height: 44px
Padding: 12px 24px (horizontal padding adjusts with content)
Border Radius: 8px
Shadow: shadow-md
Icon Size: 20px (if present)
Icon Gap: 8px from text
```

**Props:**

```javascript
{
  children: string | ReactNode,      // Button text or content
  onClick: () => void,                // Click handler
  disabled: boolean,                  // Disable button
  loading: boolean,                   // Show loading spinner
  leftIcon: ReactNode,                // Icon on left
  rightIcon: ReactNode,               // Icon on right
  fullWidth: boolean,                 // 100% width
  size: 'sm' | 'md' | 'lg',          // Size variants
  type: 'button' | 'submit' | 'reset' // HTML button type
}
```

**States:**

```css
/* Default */
.btn-primary {
  background: var(--gradient-primary);
  transform: scale(1);
  box-shadow: var(--shadow-md);
}

/* Hover */
.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: var(--shadow-lg);
  transition: all 0.2s ease-out;
}

/* Active (click) */
.btn-primary:active {
  transform: scale(0.98);
  box-shadow: var(--shadow-sm);
}

/* Disabled */
.btn-primary:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: scale(1);
}

/* Loading */
.btn-primary.loading {
  pointer-events: none;
  opacity: 0.8;
}
```

**Usage Example:**

```jsx
<Button onClick={handleSubmit} loading={isSubmitting} leftIcon={<CheckIcon />}>
  Save Changes
</Button>
```

---

### Secondary Button

**Purpose:** Secondary actions, less emphasis

**Visual Specs:**

```
Background: White
Border: 2px solid primary-500
Text: Primary-600, Poppins Semibold 14px
Height: 44px
Padding: 12px 24px
Border Radius: 8px
```

**States:**

```css
/* Hover */
.btn-secondary:hover {
  background: var(--primary-50);
}

/* Active */
.btn-secondary:active {
  background: var(--primary-100);
}
```

---

### Ghost Button

**Purpose:** Tertiary actions, low emphasis

**Visual Specs:**

```
Background: Transparent
Text: Primary-600, Poppins Semibold 14px
Height: 40px
Padding: 10px 20px
Border Radius: 8px
```

**States:**

```css
/* Hover */
.btn-ghost:hover {
  background: var(--neutral-100);
}

/* Active */
.btn-ghost:active {
  background: var(--neutral-200);
}
```

---

### Danger Button

**Purpose:** Destructive actions (delete, cancel)

**Visual Specs:**

```
Background: Linear gradient (error to error-dark)
Text: White
Other specs same as primary button
```

---

### Icon Button

**Purpose:** Single icon actions (close, menu, etc.)

**Visual Specs:**

```
Size: 40x40px
Background: Transparent or neutral-100
Border Radius: 8px
Icon: 20px, primary-600 or neutral-700
```

**Props:**

```javascript
{
  icon: ReactNode,                   // Icon component
  onClick: () => void,
  disabled: boolean,
  ariaLabel: string,                 // Accessibility label (required)
  variant: 'default' | 'ghost' | 'danger',
  size: 'sm' | 'md' | 'lg'
}
```

**Usage Example:**

```jsx
<IconButton
  icon={<TrashIcon />}
  onClick={handleDelete}
  ariaLabel="Delete item"
  variant="danger"
/>
```

---

## 📝 Input Components

### Text Input

**Purpose:** Single-line text entry

**Visual Specs:**

```
Height: 44px
Padding: 12px 16px
Background: White
Border: 1px solid neutral-300
Border Radius: 8px
Font: Inter Regular 14px
Text Color: neutral-700
Placeholder Color: neutral-400
```

**Props:**

```javascript
{
  value: string,
  onChange: (e) => void,
  placeholder: string,
  label: string,                     // Input label above
  helperText: string,                // Helper text below
  error: string,                     // Error message (shows in red)
  disabled: boolean,
  required: boolean,
  leftIcon: ReactNode,               // Icon on left inside input
  rightIcon: ReactNode,              // Icon on right inside input
  type: 'text' | 'email' | 'password' | 'number',
  maxLength: number,
  pattern: string,                   // HTML pattern attribute
  autoComplete: string
}
```

**States:**

```css
/* Focus */
.input-text:focus {
  outline: none;
  border-color: var(--primary-500);
  box-shadow: 0 0 0 3px rgba(31, 94, 255, 0.1);
}

/* Error */
.input-text.error {
  border-color: var(--error);
  background: var(--error-light);
}

/* Disabled */
.input-text:disabled {
  background: var(--neutral-100);
  cursor: not-allowed;
  color: var(--neutral-400);
}
```

**Layout with Label:**

```jsx
<div className="input-group">
  {label && (
    <label className="input-label">
      {label} {required && <span className="required">*</span>}
    </label>
  )}
  <input className="input-text" {...props} />
  {helperText && <span className="helper-text">{helperText}</span>}
  {error && <span className="error-text">{error}</span>}
</div>
```

**With Icon Example:**

```jsx
<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  leftIcon={<MailIcon />}
  required
/>
```

---

### Textarea

**Purpose:** Multi-line text entry

**Visual Specs:**

```
Min Height: 100px
Padding: 12px 16px
Resize: Vertical only
Other specs same as text input
```

**Props:** Same as text input plus:

```javascript
{
  rows: number,                      // Initial rows
  maxRows: number,                   // Maximum rows before scroll
  resize: 'none' | 'vertical' | 'both'
}
```

---

### Select Dropdown

**Purpose:** Choose one option from a list

**Visual Specs:**

```
Height: 44px
Padding: 12px 16px
Background: White
Border: 1px solid neutral-300
Border Radius: 8px
Chevron Icon: Right side, 16px
```

**Props:**

```javascript
{
  value: string,
  onChange: (e) => void,
  options: Array<{ value: string, label: string }>,
  placeholder: string,
  label: string,
  error: string,
  disabled: boolean,
  required: boolean
}
```

**Dropdown Menu Specs:**

```
Background: White
Border: 1px solid neutral-200
Border Radius: 8px
Shadow: shadow-lg
Max Height: 300px (scrollable)
Item Height: 40px
Item Padding: 12px 16px
Item Hover: Background neutral-100
```

**Usage Example:**

```jsx
<Select
  label="Category"
  options={[
    { value: "catering", label: "Catering" },
    { value: "florist", label: "Florist" },
    { value: "decoration", label: "Decoration" },
  ]}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  required
/>
```

---

### Checkbox

**Purpose:** Binary choice (yes/no, on/off)

**Visual Specs:**

```
Size: 20x20px
Border: 2px solid neutral-400
Border Radius: 4px
Background: White
Checkmark: White, 12px (when checked)
Checked Background: Primary gradient
```

**Props:**

```javascript
{
  checked: boolean,
  onChange: (e) => void,
  label: string,
  disabled: boolean,
  indeterminate: boolean             // For tri-state checkbox
}
```

**Animation:**

```css
/* Check animation */
@keyframes checkIn {
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.checkbox-mark {
  animation: checkIn 0.2s ease;
}
```

**Usage Example:**

```jsx
<Checkbox
  checked={agreedToTerms}
  onChange={(e) => setAgreedToTerms(e.target.checked)}
  label="I agree to the terms and conditions"
/>
```

---

### Radio Button

**Purpose:** Choose one option from multiple (mutually exclusive)

**Visual Specs:**

```
Size: 20x20px
Border: 2px solid neutral-400
Border Radius: Full (circular)
Background: White
Inner Dot: 10px, primary-500 (when selected)
```

**Props:**

```javascript
{
  name: string,                      // Radio group name
  value: string,
  checked: boolean,
  onChange: (e) => void,
  label: string,
  disabled: boolean
}
```

**Radio Group Component:**

```jsx
<RadioGroup
  name="paymentMethod"
  value={paymentMethod}
  onChange={setPaymentMethod}
  options={[
    { value: "cash", label: "Cash on Delivery" },
    { value: "upi", label: "UPI / Online Payment" },
  ]}
/>
```

---

### Toggle Switch

**Purpose:** On/off control (alternative to checkbox)

**Visual Specs:**

```
Width: 48px
Height: 24px
Background: neutral-300 (off), primary-500 (on)
Border Radius: Full (pill shape)
Knob: 20px circle, white, shadow-sm
Knob Position: Left (off), Right (on)
```

**Props:**

```javascript
{
  checked: boolean,
  onChange: (e) => void,
  label: string,
  disabled: boolean
}
```

**Animation:**

```css
/* Toggle animation */
.toggle-knob {
  transition: transform 0.3s ease;
}

.toggle-switch.checked .toggle-knob {
  transform: translateX(24px);
}

.toggle-switch {
  transition: background-color 0.3s ease;
}
```

---

### File Upload

**Purpose:** Upload files (images, documents)

**Visual Specs:**

```
Dropzone:
  Border: 2px dashed neutral-300
  Border Radius: 12px
  Padding: 32px
  Background: neutral-50
  Min Height: 200px

Hover State:
  Border Color: primary-500
  Background: primary-50

Active (dragging):
  Border Color: primary-600
  Background: primary-100
```

**Props:**

```javascript
{
  accept: string,                    // e.g., 'image/*'
  maxSize: number,                   // in bytes (5MB = 5 * 1024 * 1024)
  multiple: boolean,
  onFilesChange: (files) => void,
  label: string,
  helperText: string,
  error: string
}
```

**Drag-and-Drop Zones:**

```jsx
<FileUpload
  accept="image/*"
  maxSize={5242880} // 5MB
  onFilesChange={handleFiles}
  label="Product Image"
  helperText="Drop image here or click to browse (Max 5MB)"
/>
```

**Preview Component:**

```jsx
// Show uploaded files with preview
<div className="file-preview">
  <img src={preview} alt="Preview" />
  <button onClick={removeFile}>Remove</button>
</div>
```

---

## 🎴 Card Components

### Basic Card

**Purpose:** Content container with elevation

**Visual Specs:**

```
Background: White
Border: 1px solid neutral-200
Border Radius: 12px
Padding: 24px
Shadow: shadow-sm
```

**Props:**

```javascript
{
  children: ReactNode,
  hoverable: boolean,                // Enable hover effect
  onClick: () => void,               // Make card clickable
  padding: 'sm' | 'md' | 'lg',
  shadow: 'none' | 'sm' | 'md' | 'lg'
}
```

**Hover Effect (if hoverable):**

```css
.card-hoverable:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
  transition: all 0.3s ease-out;
  cursor: pointer;
}
```

**Card Structure:**

```jsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardActions>
      <IconButton icon={<MoreIcon />} />
    </CardActions>
  </CardHeader>

  <CardBody>Card content here</CardBody>

  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

---

### Product Card

**Purpose:** Display product information

**Visual Specs:**

```
Width: 280px (or responsive)
Height: Auto
Border Radius: 12px
Shadow: shadow-sm
Overflow: Hidden
Background: White

Image Section:
  Height: 240px
  Object Fit: Cover

Content Section:
  Padding: 16px

Price:
  Font: Poppins Bold 20px
  Color: Primary-600
```

**Props:**

```javascript
{
  product: {
    id: string,
    name: string,
    price: number,
    image: string,
    vendor: string,
    category: string
  },
  onAddToCart: (productId) => void,
  onProductClick: (productId) => void
}
```

**Layout:**

```jsx
<ProductCard>
  <ProductImage src={image} alt={name} onClick={onProductClick} />

  <ProductContent>
    <ProductCategory>{category}</ProductCategory>
    <ProductName onClick={onProductClick}>{name}</ProductName>
    <ProductVendor>{vendor}</ProductVendor>
    <ProductPrice>₹{price}</ProductPrice>

    <Button fullWidth onClick={() => onAddToCart(id)} leftIcon={<CartIcon />}>
      Add to Cart
    </Button>
  </ProductContent>
</ProductCard>
```

**Hover Effects:**

```css
/* Image zoom on hover */
.product-image {
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

/* Card lift on hover */
.product-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}
```

---

### Stat Card (Dashboard)

**Purpose:** Display key metrics

**Visual Specs:**

```
Background: Primary or secondary gradient
Border Radius: 16px
Padding: 24px
Min Height: 140px
Color: White
```

**Props:**

```javascript
{
  label: string,
  value: string | number,
  icon: ReactNode,
  trend: string,                     // e.g., '+5.2%'
  trendUp: boolean,                  // Trend direction
  gradient: 'primary' | 'secondary' | 'success' | 'warning'
}
```

**Layout:**

```jsx
<StatCard>
  <StatIcon>{icon}</StatIcon>
  <StatLabel>{label}</StatLabel>
  <StatValue>{value}</StatValue>
  {trend && (
    <StatTrend up={trendUp}>
      {trendUp ? <ArrowUpIcon /> : <ArrowDownIcon />}
      {trend}
    </StatTrend>
  )}
</StatCard>
```

**Count Animation:**

```javascript
// Animate number from 0 to value
useEffect(() => {
  let start = 0;
  const end = parseInt(value);
  const duration = 1000;
  const increment = end / (duration / 16);

  const timer = setInterval(() => {
    start += increment;
    if (start >= end) {
      setDisplayValue(end);
      clearInterval(timer);
    } else {
      setDisplayValue(Math.floor(start));
    }
  }, 16);

  return () => clearInterval(timer);
}, [value]);
```

---

## 🧭 Navigation Components

### Top Navbar

**Purpose:** Main navigation bar (fixed at top)

**Visual Specs:**

```
Height: 72px
Background: White
Border Bottom: 1px solid neutral-200
Padding: 0 32px
Shadow: shadow-sm
Position: Fixed (sticky)
Z-index: 100
```

**Structure:**

```jsx
<Navbar>
  <NavbarLeft>
    <Logo />
    <NavLinks>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/vendors">Vendors</NavLink>
      <NavLink to="/about">About</NavLink>
    </NavLinks>
  </NavbarLeft>

  <NavbarRight>
    <SearchBar />
    <CartButton count={3} />
    <NotificationButton count={2} />
    <UserMenu />
  </NavbarRight>
</Navbar>
```

**Mobile Responsive:**

```
< 768px:
  - Show hamburger menu icon
  - Hide nav links
  - Clicking hamburger opens full-screen sidebar with links
```

---

### Sidebar Navigation

**Purpose:** Side navigation panel (dashboards)

**Visual Specs:**

```
Width: 280px
Background: White
Border Right: 1px solid neutral-200
Height: 100vh
Position: Fixed
Padding: 24px 0
```

**Nav Item Specs:**

```
Height: 44px
Padding: 12px 16px
Border Radius: 8px
Margin: 4px 16px
Icon: 20px, left aligned
Text: Inter Medium 14px
Gap: 12px (icon to text)
```

**Active State:**

```css
.nav-item-active {
  background: var(--primary-50);
  color: var(--primary-600);
  border-left: 3px solid var(--primary-500);
  font-weight: 600;
}
```

**Hover State:**

```css
.nav-item:hover {
  background: var(--neutral-100);
  transition: background 0.2s ease;
}
```

**Structure:**

```jsx
<Sidebar>
  <SidebarHeader>
    <Logo />
    <UserProfile />
  </SidebarHeader>

  <SidebarContent>
    <NavSection title="Main">
      <NavItem icon={<DashboardIcon />} to="/dashboard" active>
        Dashboard
      </NavItem>
      <NavItem icon={<ProductIcon />} to="/products">
        Products
      </NavItem>
    </NavSection>

    <NavSection title="Settings">
      <NavItem icon={<SettingsIcon />} to="/settings">
        Settings
      </NavItem>
    </NavSection>
  </SidebarContent>

  <SidebarFooter>
    <NavItem icon={<LogoutIcon />} onClick={handleLogout}>
      Logout
    </NavItem>
  </SidebarFooter>
</Sidebar>
```

---

### Breadcrumbs

**Purpose:** Show current page location in hierarchy

**Visual Specs:**

```
Font: Inter Regular 14px
Color: neutral-600
Separator: Chevron right icon (neutral-400)
Gap: 8px between items
Active Item: neutral-900, Bold
```

**Props:**

```javascript
{
  items: Array<{ label: string, path: string }>
}
```

**Usage:**

```jsx
<Breadcrumbs
  items={[
    { label: "Home", path: "/" },
    { label: "Vendors", path: "/vendors" },
    { label: "Vendor Name", path: "/vendors/123" },
  ]}
/>
```

---

## 🪟 Modal & Dialog Components

### Modal

**Purpose:** Display content in overlay

**Visual Specs:**

```
Backdrop:
  Background: rgba(0, 0, 0, 0.5)
  Backdrop Blur: 4px

Modal Container:
  Background: White
  Border Radius: 16px
  Shadow: shadow-2xl
  Max Width: 600px (configurable)
  Padding: 32px
  Position: Centered (viewport)
```

**Props:**

```javascript
{
  isOpen: boolean,
  onClose: () => void,
  title: string,
  children: ReactNode,
  footer: ReactNode,
  size: 'sm' | 'md' | 'lg' | 'xl',
  closeOnBackdropClick: boolean,
  showCloseButton: boolean
}
```

**Structure:**

```jsx
<Modal isOpen={isOpen} onClose={onClose} title="Modal Title">
  <ModalBody>Content here</ModalBody>

  <ModalFooter>
    <Button variant="ghost" onClick={onClose}>
      Cancel
    </Button>
    <Button onClick={handleSave}>Save</Button>
  </ModalFooter>
</Modal>
```

**Animations:**

```css
/* Backdrop */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal-backdrop {
  animation: fadeIn 0.2s ease;
}

/* Modal Container */
@keyframes modalIn {
  from {
    opacity: 0;
    transform: scale(0.9) translateY(20px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.modal-container {
  animation: modalIn 0.3s ease-out;
}
```

---

### Confirmation Dialog

**Purpose:** Confirm critical actions

**Visual Specs:**

```
Similar to modal but:
  Max Width: 400px
  Icon at top (warning/info/success)
  Centered text
  Two buttons: Cancel + Confirm
```

**Props:**

```javascript
{
  isOpen: boolean,
  onClose: () => void,
  onConfirm: () => void,
  title: string,
  message: string,
  confirmText: string,              // Default: 'Confirm'
  cancelText: string,               // Default: 'Cancel'
  variant: 'danger' | 'warning' | 'info',
  icon: ReactNode
}
```

**Usage:**

```jsx
<ConfirmDialog
  isOpen={showDelete}
  onClose={() => setShowDelete(false)}
  onConfirm={handleDelete}
  title="Delete Product"
  message="Are you sure you want to delete this product? This action cannot be undone."
  confirmText="Yes, Delete"
  variant="danger"
  icon={<TrashIcon />}
/>
```

---

## 📊 Table Components

### Data Table

**Purpose:** Display tabular data with actions

**Visual Specs:**

```
Table:
  Background: White
  Border: 1px solid neutral-200
  Border Radius: 12px
  Overflow: Hidden

Header:
  Background: neutral-50
  Height: 48px
  Font: Inter Semibold 14px
  Color: neutral-700
  Border Bottom: 2px solid neutral-300

Row:
  Height: 56px
  Font: Inter Regular 14px
  Color: neutral-600
  Border Bottom: 1px solid neutral-200
  Padding: 16px

Row Hover:
  Background: neutral-50
```

**Props:**

```javascript
{
  columns: Array<{
    key: string,
    label: string,
    sortable: boolean,
    render: (value, row) => ReactNode
  }>,
  data: Array<Object>,
  onRowClick: (row) => void,
  selectable: boolean,
  selectedRows: Array<string>,
  onSelectionChange: (selected) => void,
  loading: boolean,
  emptyMessage: string
}
```

**Usage:**

```jsx
<DataTable
  columns={[
    { key: "name", label: "Name", sortable: true },
    { key: "email", label: "Email", sortable: true },
    { key: "role", label: "Role", render: (value) => <Badge>{value}</Badge> },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <ActionMenu>
          <MenuItem onClick={() => editUser(row.id)}>Edit</MenuItem>
          <MenuItem onClick={() => deleteUser(row.id)}>Delete</MenuItem>
        </ActionMenu>
      ),
    },
  ]}
  data={users}
  selectable
  selectedRows={selectedUsers}
  onSelectionChange={setSelectedUsers}
/>
```

**Pagination:**

```jsx
<TablePagination
  currentPage={page}
  totalPages={totalPages}
  onPageChange={setPage}
  pageSize={pageSize}
  onPageSizeChange={setPageSize}
  totalItems={totalItems}
/>
```

---

## 📋 Form Components

### Form Container

**Purpose:** Wrapper for forms with consistent styling

**Visual Specs:**

```
Max Width: 600px
Background: White
Border Radius: 12px
Padding: 32px
Shadow: shadow-md
```

**Structure:**

```jsx
<Form onSubmit={handleSubmit}>
  <FormTitle>Form Title</FormTitle>

  <FormSection>
    <Input label="Name" {...register("name")} />
    <Input label="Email" {...register("email")} />
  </FormSection>

  <FormSection title="Additional Info">
    <Textarea label="Description" {...register("description")} />
  </FormSection>

  <FormActions>
    <Button variant="ghost" type="button" onClick={onCancel}>
      Cancel
    </Button>
    <Button type="submit" loading={isSubmitting}>
      Submit
    </Button>
  </FormActions>
</Form>
```

---

## 🔔 Feedback Components

### Toast Notification

**Purpose:** Show temporary messages

**Visual Specs:**

```
Width: 360px
Background: White
Border Radius: 12px
Shadow: shadow-xl
Border Left: 4px (color based on type)
Padding: 16px
Position: Top right, fixed
Z-index: 9999
```

**Types:**

```
Success: Green left border, green icon
Error: Red left border, red icon
Warning: Amber left border, warning icon
Info: Blue left border, info icon
```

**Props:**

```javascript
{
  type: 'success' | 'error' | 'warning' | 'info',
  title: string,
  message: string,
  duration: number,                  // Auto-dismiss time (ms)
  onClose: () => void,
  action: { label: string, onClick: () => void }  // Optional action button
}
```

**Usage (via context):**

```javascript
const { showToast } = useToast();

showToast({
  type: "success",
  title: "Product Added",
  message: "Product has been added successfully",
  duration: 3000,
});
```

**Animation:**

```css
/* Slide in from right */
@keyframes slideInRight {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast {
  animation: slideInRight 0.3s ease-out;
}
```

**Auto-dismiss Progress Bar:**

```css
.toast-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: var(--primary-500);
  animation: progressShrink var(--duration) linear;
}

@keyframes progressShrink {
  from {
    width: 100%;
  }
  to {
    width: 0%;
  }
}
```

---

### Alert Banner

**Purpose:** Display persistent messages

**Visual Specs:**

```
Full Width (or contained)
Height: 48px
Background: Color-coded light variant
Border: 1px solid color variant
Border Radius: 8px
Padding: 12px 16px
```

**Usage:**

```jsx
<Alert type="warning">
  <AlertIcon />
  <AlertMessage>Your session will expire in 5 minutes</AlertMessage>
  <AlertAction>
    <Button variant="ghost" size="sm">
      Extend Session
    </Button>
  </AlertAction>
  <AlertClose onClick={onClose} />
</Alert>
```

---

### Loading Spinner

**Purpose:** Indicate loading state

**Sizes:**

```
Small: 20px
Medium: 40px
Large: 64px
```

**Animation:**

```css
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  border: 3px solid var(--primary-200);
  border-top-color: var(--primary-600);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
```

**Usage:**

```jsx
<Loader size="md" /> {/* Centered, standalone */}
<Loader size="sm" inline /> {/* Inline with text */}
```

---

### Skeleton Loader

**Purpose:** Show content placeholder while loading

**Visual Specs:**

```
Background: neutral-200
Border Radius: Matches content
Animation: Shimmer effect
```

**Types:**

```jsx
<SkeletonText lines={3} />          {/* Paragraph placeholder */}
<SkeletonCircle size={40} />        {/* Avatar placeholder */}
<SkeletonRectangle width="100%" height={200} />  {/* Image placeholder */}
```

---

## 📦 Data Display Components

### Badge

**Purpose:** Display status, count, or label

**Visual Specs:**

```
Height: 24px
Padding: 4px 12px
Border Radius: Full (pill)
Font: Inter Semibold 12px
```

**Variants:**

```
Primary: Primary-100 bg, primary-700 text
Success: Success-light bg, success-dark text
Warning: Warning-light bg, warning-dark text
Error: Error-light bg, error-dark text
Neutral: Neutral-100 bg, neutral-700 text
```

**Props:**

```javascript
{
  variant: 'primary' | 'success' | 'warning' | 'error' | 'neutral',
  dot: boolean,                      // Show dot before text
  children: ReactNode
}
```

**Usage:**

```jsx
<Badge variant="success">Active</Badge>
<Badge variant="error" dot>Out of Stock</Badge>
```

---

### Avatar

**Purpose:** Display user profile picture or initials

**Visual Specs:**

```
Size: 32px (sm), 40px (md), 48px (lg), 64px (xl)
Border Radius: Full (circular)
Background: Primary gradient (if no image)
Text: White, Poppins Bold
```

**Props:**

```javascript
{
  src: string,                       // Image URL
  alt: string,
  name: string,                      // For initials fallback
  size: 'sm' | 'md' | 'lg' | 'xl',
  status: 'online' | 'offline' | 'busy'  // Status indicator
}
```

**Status Indicator:**

```
Small dot (12px) at bottom-right
Online: Green
Offline: Gray
Busy: Red
```

**Usage:**

```jsx
<Avatar src={user.avatar} name={user.name} size="md" status="online" />
```

---

### Tooltip

**Purpose:** Show additional info on hover

**Visual Specs:**

```
Background: neutral-900
Color: White
Font: Inter Regular 12px
Padding: 6px 12px
Border Radius: 6px
Shadow: shadow-lg
Max Width: 200px
```

**Props:**

```javascript
{
  content: string | ReactNode,
  children: ReactNode,
  placement: 'top' | 'right' | 'bottom' | 'left',
  delay: number                      // Hover delay (ms)
}
```

**Usage:**

```jsx
<Tooltip content="This will delete the item permanently" placement="top">
  <IconButton icon={<TrashIcon />} />
</Tooltip>
```

---

## 📐 Layout Components

### Container

**Purpose:** Centered content wrapper

**Visual Specs:**

```
Max Width: 1280px (configurable)
Margin: 0 auto
Padding: 0 16px (mobile), 0 32px (desktop)
```

**Usage:**

```jsx
<Container>
  <h1>Page Content</h1>
</Container>

<Container maxWidth="lg">  {/* 1024px */}
  <h1>Narrower Content</h1>
</Container>
```

---

### Grid

**Purpose:** Responsive grid layout

**Props:**

```javascript
{
  columns: number | { xs, sm, md, lg, xl },
  gap: number,
  children: ReactNode
}
```

**Usage:**

```jsx
<Grid columns={{ xs: 1, md: 2, lg: 3 }} gap={6}>
  <Card>Card 1</Card>
  <Card>Card 2</Card>
  <Card>Card 3</Card>
</Grid>
```

---

### Stack

**Purpose:** Vertical or horizontal spacing

**Props:**

```javascript
{
  direction: 'vertical' | 'horizontal',
  spacing: number,
  align: 'start' | 'center' | 'end',
  children: ReactNode
}
```

**Usage:**

```jsx
<Stack direction="vertical" spacing={4}>
  <Input label="Name" />
  <Input label="Email" />
  <Button>Submit</Button>
</Stack>
```

---

## 🎯 Component Usage Best Practices

### 1. Consistency

- Use design system components everywhere
- Avoid creating one-off styles
- Follow naming conventions

### 2. Accessibility

- Always provide `ariaLabel` for icon buttons
- Associate labels with inputs
- Ensure keyboard navigation works
- Test with screen readers

### 3. Performance

- Lazy load heavy components
- Memoize expensive renders with `React.memo`
- Use `useMemo` and `useCallback` for optimizations

### 4. Responsiveness

- Test all breakpoints (mobile, tablet, desktop)
- Use responsive props (e.g., `columns={{ xs: 1, md: 2 }}`)
- Touch-friendly hit areas on mobile (min 44px)

### 5. Error Handling

- Show clear error messages
- Validate inputs on blur and submit
- Provide recovery actions

---

## 📚 Component Testing Checklist

For each component, test:

- [ ] Renders correctly with default props
- [ ] All variants and sizes work
- [ ] All interactive states (hover, active, focus, disabled)
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Responsive on all breakpoints
- [ ] Loading and error states
- [ ] Animations are smooth
- [ ] No console errors or warnings

---

**This completes the Component Specifications document.**

**Next Steps:**

1. Implement components following these specs
2. Create Storybook for component showcase
3. Write unit tests for each component
4. Document any custom hooks used

---

_Component library version 1.0 | Updated: Nov 13, 2025_

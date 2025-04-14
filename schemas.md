## Users

```plaintext
Table: users
- id: UUID (Primary Key)
- email: String (Unique, Required)
- password_hash: String (Required)
- first_name: String (Required)
- last_name: String (Required)
- phone_number: String
- is_admin: Boolean (Default: false)
- is_vendor: Boolean (Default: false)
- created_at: Timestamp
- updated_at: Timestamp
- last_login: Timestamp
- email_verified: Boolean (Default: false)
- email_verification_token: String
- reset_password_token: String
- reset_password_expires: Timestamp
```


## User Addresses

```plaintext
Table: addresses
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- address_type: Enum ['billing', 'shipping']
- is_default: Boolean
- street_address: String (Required)
- apartment: String
- city: String (Required)
- state: String (Required)
- postal_code: String (Required)
- country: String (Required)
- created_at: Timestamp
- updated_at: Timestamp
```

## Categories

```plaintext
Table: categories
- id: UUID (Primary Key)
- name: String (Required)
- slug: String (Unique, Required)
- description: Text
- parent_id: UUID (Foreign Key -> categories.id, Self-reference for subcategories)
- image_url: String
- is_active: Boolean (Default: true)
- created_at: Timestamp
- updated_at: Timestamp
```

## Vendors

```plaintext
Table: vendors
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- business_name: String (Required)
- slug: String (Unique, Required)
- description: Text
- logo_url: String
- banner_url: String
- contact_email: String
- contact_phone: String
- website: String
- social_media: JSON
- is_verified: Boolean (Default: false)
- commission_rate: Decimal
- rating: Decimal
- review_count: Integer
- created_at: Timestamp
- updated_at: Timestamp
```


## Products

```plaintext
Table: products
- id: UUID (Primary Key)
- vendor_id: UUID (Foreign Key -> vendors.id)
- name: String (Required)
- slug: String (Unique, Required)
- description: Text
- short_description: Text
- price: Decimal (Required)
- compare_at_price: Decimal
- cost_price: Decimal
- sku: String (Unique)
- barcode: String
- quantity: Integer (Default: 0)
- is_active: Boolean (Default: true)
- is_featured: Boolean (Default: false)
- is_taxable: Boolean (Default: true)
- tax_rate: Decimal
- weight: Decimal
- weight_unit: Enum ['kg', 'g', 'lb', 'oz']
- dimensions: JSON { length, width, height, unit }
- created_at: Timestamp
- updated_at: Timestamp
```


## Product Categories

```plaintext
Table: product_categories
- id: UUID (Primary Key)
- product_id: UUID (Foreign Key -> products.id)
- category_id: UUID (Foreign Key -> categories.id)
```


## Product Images

```plaintext
Table: product_images
- id: UUID (Primary Key)
- product_id: UUID (Foreign Key -> products.id)
- image_url: String (Required)
- alt_text: String
- is_primary: Boolean (Default: false)
- sort_order: Integer
- created_at: Timestamp
```


## Product Variants

```plaintext
Table: product_variants
- id: UUID (Primary Key)
- product_id: UUID (Foreign Key -> products.id)
- name: String
- sku: String (Unique)
- price: Decimal
- quantity: Integer
- options: JSON { color, size, material, etc. }
- image_url: String
- created_at: Timestamp
- updated_at: Timestamp
```


## Product Variants

```plaintext
Table: product_variants
- id: UUID (Primary Key)
- product_id: UUID (Foreign Key -> products.id)
- name: String
- sku: String (Unique)
- price: Decimal
- quantity: Integer
- options: JSON { color, size, material, etc. }
- image_url: String
- created_at: Timestamp
- updated_at: Timestamp
```


## Carts

```plaintext
Table: carts
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id, Nullable for guest carts)
- session_id: String (For guest users)
- created_at: Timestamp
- updated_at: Timestamp
- expires_at: Timestamp
```



## Cart Items

```plaintext
Table: cart_items
- id: UUID (Primary Key)
- cart_id: UUID (Foreign Key -> carts.id)
- product_id: UUID (Foreign Key -> products.id)
- variant_id: UUID (Foreign Key -> product_variants.id, Nullable)
- quantity: Integer (Default: 1)
- price_at_addition: Decimal
- created_at: Timestamp
- updated_at: Timestamp
```


## Wishlists

```plaintext
Table: wishlists
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- name: String (Default: 'Default')
- is_public: Boolean (Default: false)
- created_at: Timestamp
- updated_at: Timestamp
```


## Wishlist Items

```plaintext
Table: wishlist_items
- id: UUID (Primary Key)
- wishlist_id: UUID (Foreign Key -> wishlists.id)
- product_id: UUID (Foreign Key -> products.id)
- variant_id: UUID (Foreign Key -> product_variants.id, Nullable)
- added_at: Timestamp
```



## Orders

```plaintext
Table: orders
- id: UUID (Primary Key)
- order_number: String (Unique, Required)
- user_id: UUID (Foreign Key -> users.id, Nullable for guest orders)
- status: Enum ['pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']
- subtotal: Decimal
- tax: Decimal
- shipping: Decimal
- discount: Decimal
- total: Decimal
- shipping_address_id: UUID (Foreign Key -> addresses.id)
- billing_address_id: UUID (Foreign Key -> addresses.id)
- payment_method: String
- payment_status: Enum ['pending', 'paid', 'failed', 'refunded']
- shipping_method: String
- tracking_number: String
- notes: Text
- created_at: Timestamp
- updated_at: Timestamp
- completed_at: Timestamp
```

## Order Items

```plaintext
Table: order_items
- id: UUID (Primary Key)
- order_id: UUID (Foreign Key -> orders.id)
- product_id: UUID (Foreign Key -> products.id)
- variant_id: UUID (Foreign Key -> product_variants.id, Nullable)
- vendor_id: UUID (Foreign Key -> vendors.id)
- quantity: Integer
- price: Decimal
- tax: Decimal
- discount: Decimal
- total: Decimal
- sku: String
- name: String
- options: JSON
- created_at: Timestamp
```

## Coupons

```plaintext
Table: coupons
- id: UUID (Primary Key)
- code: String (Unique, Required)
- description: String
- discount_type: Enum ['percentage', 'fixed_amount', 'free_shipping']
- discount_value: Decimal
- minimum_order_amount: Decimal
- maximum_discount: Decimal
- is_active: Boolean (Default: true)
- usage_limit: Integer
- usage_count: Integer (Default: 0)
- start_date: Timestamp
- end_date: Timestamp
- created_at: Timestamp
- updated_at: Timestamp
```

## Payment Methods

```plaintext
Table: payment_methods
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- payment_type: Enum ['credit_card', 'paypal', 'bank_transfer']
- provider: String
- account_number: String (Encrypted, last 4 digits visible)
- expiry_date: String (Encrypted)
- is_default: Boolean (Default: false)
- billing_address_id: UUID (Foreign Key -> addresses.id)
- created_at: Timestamp
- updated_at: Timestamp
```

## User Notifications

```plaintext
Table: user_notifications
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- type: Enum ['order_update', 'promotion', 'account', 'system']
- title: String
- message: Text
- is_read: Boolean (Default: false)
- action_url: String
- created_at: Timestamp
```

## User Notification Preferences

```plaintext
Table: notification_preferences
- id: UUID (Primary Key)
- user_id: UUID (Foreign Key -> users.id)
- order_updates: Boolean (Default: true)
- promotions: Boolean (Default: true)
- new_arrivals: Boolean (Default: false)
- blog_posts: Boolean (Default: false)
- account_alerts: Boolean (Default: true)
- email_notifications: Boolean (Default: true)
- push_notifications: Boolean (Default: false)
- created_at: Timestamp
- updated_at: Timestamp
```
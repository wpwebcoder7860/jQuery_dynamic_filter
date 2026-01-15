# formFilter

A lightweight **JavaScript form validation helper** built on top of
**jQuery Validate**.

It allows you to:

-   Skip required validation for specific fields
-   Add **custom pattern rules**
-   Add **minimum/maximum length validation**
-   Add **custom messages** (single or multiple)
-   Support **multiple fields at once**
-   Fully configurable, easy to maintain and scale

------------------------------------------------------------------------

## 📌 Table of Contents

1.  Installation
2.  Basic Usage
3.  Methods
4.  Complete Example Workflow
5.  Notes
6.  Contribution

------------------------------------------------------------------------

## ⚙️ Installation

Include jQuery and jQuery Validate first:

``` html
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdn.jsdelivr.net/jquery.validation/1.19.5/jquery.validate.min.js"></script>
<script type="module" src="path/to/formFilter.js"></script>
```

------------------------------------------------------------------------

## 🚀 Basic Usage

``` js
import { formFilter } from './formFilter.js';

const filter = new formFilter();
```

------------------------------------------------------------------------

# 🛠 Methods

## ✅ is_required(obj)

Mark fields as **optional** (skip required validation).

Example:

``` js
filter.is_required({
    name: { required: false },
});
```

------------------------------------------------------------------------

## ✅ addPattern(obj)

Add **custom regex pattern validation** for fields.

Example:

``` js
filter.addPattern({
    name: { pattern: /^[a-zA-Z]+$/, message: "Only letters allowed" },
});
```

------------------------------------------------------------------------

## ✅ addMinLength(obj)

``` js
filter.addMinLength({
    name: { minLength: 3 }
});
```

------------------------------------------------------------------------

## ✅ addMaxLength(obj)

``` js
filter.addMaxLength({
    name: { maxLength: 10 }
});
```

------------------------------------------------------------------------

## ✅ addMessage(obj)

``` js
filter.addMessage({
    name: {
        messages: {
            required: "name is required",
            minlength: "name must be at least 3 characters",
            maxlength: "name cannot exceed 10 characters",
        }
    }
});
```

------------------------------------------------------------------------

## ✅ init(formId, items)

``` js
filter.init("#FormId", {
    email: true,
});
```

------------------------------------------------------------------------

## ✅ destroy(formId)

``` js
filter.destroy("#FormId");
```

------------------------------------------------------------------------

# 🔁 Complete Example Workflow

``` js
const filter = new formFilter();

filter.is_required({
    name: { required: false },
});

filter.addPattern({
    name: { pattern: /^[a-zA-Z]+$/, message: "Only letters allowed" }
});

filter.addMinLength({ name: { minLength: 3 } });
filter.addMaxLength({ name: { maxLength: 10 } });

filter.addMessage({
    menu_name: {
        messages: {
            required: "name is required",
            minlength: "name must be at least 3 characters",
            maxlength: "name cannot exceed 10 characters",
        }
    }
});

filter.init("#addMenuForm", {
    email: true,
});
```

------------------------------------------------------------------------

## 📝 Notes

-   Works with jQuery Validate plugin
-   Supports dynamic field configuration before initialization
-   Default messages apply if custom messages are not provided

------------------------------------------------------------------------

## 🤝 Contribution

Contributions are welcome! Please fork the repository and submit a pull
request.

------------------------------------------------------------------------

## 📜 License

MIT License

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
    menu_position: { required: false },
    menu_url: { required: false }
});
```

------------------------------------------------------------------------

## ✅ addPattern(obj)

Add **custom regex pattern validation** for fields.

Example:

``` js
filter.addPattern({
    menu_name: { pattern: /^[a-zA-Z]+$/, message: "Only letters allowed" },
    menu_url: { pattern: /^https?:\/\/.+$/, message: "Enter valid URL" }
});
```

------------------------------------------------------------------------

## ✅ addMinLength(obj)

``` js
filter.addMinLength({
    menu_name: { minLength: 3 }
});
```

------------------------------------------------------------------------

## ✅ addMaxLength(obj)

``` js
filter.addMaxLength({
    menu_name: { maxLength: 10 }
});
```

------------------------------------------------------------------------

## ✅ addMessage(obj)

``` js
filter.addMessage({
    menu_name: {
        messages: {
            required: "Menu Name is required",
            minlength: "Menu Name must be at least 3 characters",
            maxlength: "Menu Name cannot exceed 10 characters",
            menu_name_pattern: "Only letters allowed"
        }
    }
});
```

------------------------------------------------------------------------

## ✅ init(formId, items)

``` js
filter.init("#addMenuForm", {
    menu_name: true,
    menu_position: true,
    menu_url: true
});
```

------------------------------------------------------------------------

## ✅ destroy(formId)

``` js
filter.destroy("#addMenuForm");
```

------------------------------------------------------------------------

# 🔁 Complete Example Workflow

``` js
const filter = new formFilter();

filter.is_required({
    menu_position: { required: false },
    menu_url: { required: false }
});

filter.addPattern({
    menu_name: { pattern: /^[a-zA-Z]+$/, message: "Only letters allowed" }
});

filter.addMinLength({ menu_name: { minLength: 3 } });
filter.addMaxLength({ menu_name: { maxLength: 10 } });

filter.addMessage({
    menu_name: {
        messages: {
            required: "Menu Name is required",
            minlength: "Menu Name must be at least 3 characters",
            maxlength: "Menu Name cannot exceed 10 characters",
            menu_name_pattern: "Only letters allowed"
        }
    }
});

filter.init("#addMenuForm", {
    menu_name: true,
    menu_position: true,
    menu_url: true
});
```

------------------------------------------------------------------------

## 📝 Notes

-   Works with jQuery Validate plugin\
-   Supports dynamic field configuration before initialization\
-   Default messages apply if custom messages are not provided

------------------------------------------------------------------------

## 🤝 Contribution

Contributions are welcome! Please fork the repository and submit a pull
request.

------------------------------------------------------------------------

## 📜 License

MIT License

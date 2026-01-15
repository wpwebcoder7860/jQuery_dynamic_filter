"use strict";
export class formFilter {
    constructor() {
        this.fields = [];
        this.overrides = {};
    }

    /**
     * Mark fields as optional (skip required validation).
     * Supports single or multiple fields.
     * @param {Object} obj - Example:
     */
    is_required(obj) {
        for (const fieldName in obj) {
            this.overrides[fieldName] = this.overrides[fieldName] || {};
            if (obj[fieldName].required === false) this.overrides[fieldName].skip = true;
        }
    }

    /**
     * Add a pattern validation rule for one or more fields.
     * @param {Object} obj - Example:
     */
    addPattern(obj) {
        for (const fieldName in obj) {
            this.overrides[fieldName] = this.overrides[fieldName] || {};
            this.overrides[fieldName].pattern = obj[fieldName].pattern;
            this.overrides[fieldName].patternMessage = obj[fieldName].message;
        }
    }

    /**
     * Add minimum length validation for one or more fields.
     * @param {Object} obj - Example:
     */
    addMinLength(obj) {
        for (const fieldName in obj) {
            this.overrides[fieldName] = this.overrides[fieldName] || {};
            this.overrides[fieldName].minLength = obj[fieldName].minLength;
        }
    }

    /**
     * Add maximum length validation for one or more fields.
     * @param {Object} obj - Example:
     */
    addMaxLength(obj) {
        for (const fieldName in obj) {
            this.overrides[fieldName] = this.overrides[fieldName] || {};
            this.overrides[fieldName].maxLength = obj[fieldName].maxLength;
        }
    }
    /**
     * Add custom messages for one or more fields.
     * Supports multiple rules at once.
     * @param {Object} obj - Example:
     */
    addMessage(obj) {
        for (const fieldName in obj) {
            const fieldOverride = obj[fieldName];
            if (!fieldOverride.messages) continue;

            this.overrides[fieldName] = this.overrides[fieldName] || {};
            this.overrides[fieldName].messages = this.overrides[fieldName].messages || {};

            Object.assign(this.overrides[fieldName].messages, fieldOverride.messages);
        }
    }

    /**
     * Initialize form validation with optional overrides.
     * Applies all skip, pattern, min/max length, and custom messages.
     * @param {string} formId - The form selector, e.g., "#formId"
     * @param {Object} items - The fields to validate.
     */
    init(formId, items) {
        this.fields = Object.keys(items);
        const rules = {};
        const messages = {};

        $.each(this.fields, (i, fieldName) => {
            rules[fieldName] = {};
            messages[fieldName] = {};

            const override = this.overrides[fieldName] || {};

            // Skip validation
            if (override.skip) {
                rules[fieldName].required = false;
            } else {
                rules[fieldName].required = true;
                messages[fieldName].required = "This field is required.";
            }

            // Pattern
            if (override.pattern) {
                const methodName = fieldName + "_pattern";
                $.validator.addMethod(
                    methodName,
                    function (value, element) {
                        return this.optional(element) || override.pattern.test(value);
                    },
                    override.patternMessage || "Invalid format"
                );
                rules[fieldName][methodName] = true;
                messages[fieldName][methodName] = override.patternMessage || "Invalid format";
            }

            // Min length
            if (override.minLength) {
                rules[fieldName].minlength = override.minLength;
                messages[fieldName].minlength = 
                (override.messages && override.messages.minlength) || 
                `Please enter at least ${override.minLength} characters.`;
            }

            // Max length
            if (override.maxLength) {
                rules[fieldName].maxlength = override.maxLength;
                messages[fieldName].maxlength =
                    (override.messages && override.messages.maxlength) ||
                    `Please enter no more than ${override.maxLength} characters.`;
            }

            // Additional custom messages
            if (override.messages) {
                for (const rule in override.messages) {
                    messages[fieldName][rule] = override.messages[rule];
                }
            }
        });

        return $(formId).validate({
            rules,
            messages,
            errorElement: "div",
            errorClass: "invalid-feedback small fw-normal fs-6",
            highlight: function (element) {
                $(element).addClass("is-invalid");
            },
            unhighlight: function (element) {
                $(element).removeClass("is-invalid");
            },
            errorPlacement: function (error, element) {
                error.addClass("invalid-feedback-error");
                if (element.parent(".input-group").length || element.is(":checkbox") || element.is(":radio")) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
        });
    }

    /**
     * Destroy the form validator instance.
     * @param {string} formId - The form selector, e.g., "#addMenuForm"
     */
    destroy(formId) {
        const $form = $(formId);
        if ($form.length && $form.data("validator")) {
            $form.removeData("validator");
            $form.removeData("unobtrusiveValidation");
            $form.validate().destroy();
        }
    }
}

"use client";
// Import Components and libraries
import { useState, type FormEvent } from "react";
import Link from "next/link";

// Import styles
import "./ui/form.scss";


export type OneSupportedHtmlInputType = "text" | "email" | "password";

// Description of a single input field inside the form.
export type OneFormInputFieldDescription = {
  fieldInputName: string;
  fieldVisibleLabel: string;
  fieldHtmlInputType: OneSupportedHtmlInputType;
  optionalPlaceholderText?: string;
  optionalBrowserAutoCompleteHint?: string;
};


export type FormReusableComponentProps = {
  formMainTitleText: string;
  listOfInputFieldsToRender: OneFormInputFieldDescription[];
  submitButtonLabelText: string;
  optionalFooterLinkConfig?: { linkLabelText: string; linkDestinationUrl: string };
  optionalAsyncSubmitHandler?: (
    valuesEnteredByUser: Record<string, string>,
  ) => void | Promise<void>;
};


export default function Form({
  formMainTitleText,
  listOfInputFieldsToRender,
  submitButtonLabelText,
  optionalFooterLinkConfig,
  optionalAsyncSubmitHandler,
}: FormReusableComponentProps) {
  // We keep one piece of state for every input field, all stored together in a single object.
  const [valuesTypedByUser, setValuesTypedByUser] = useState<Record<string, string>>(
    function buildInitialEmptyValuesDictionary() {
      const initialEmptyValuesDictionary: Record<string, string> = {};
      for (const oneFormInputField of listOfInputFieldsToRender) {
        initialEmptyValuesDictionary[oneFormInputField.fieldInputName] = "";
      }
      return initialEmptyValuesDictionary;
    },
  );

  // True while the optional async submit handler is running (we use this to disable the form).
  const [isFormCurrentlySubmitting, setIsFormCurrentlySubmitting] = useState(false);

  // Update the stored value for one specific input field.
  function updateValueForOneInputField(targetFieldInputName: string, newTypedValue: string) {
    setValuesTypedByUser(function (previousValuesEnteredByUser) {
      return { ...previousValuesEnteredByUser, [targetFieldInputName]: newTypedValue };
    });
  }

  // Called when the user submits the form (Enter key or click on the submit button).
  async function handleFormSubmissionEvent(submitEventFromTheBrowser: FormEvent<HTMLFormElement>) {
    submitEventFromTheBrowser.preventDefault();
    if (!optionalAsyncSubmitHandler) return;

    setIsFormCurrentlySubmitting(true);
    try {
      await optionalAsyncSubmitHandler(valuesTypedByUser);
    } finally {
      setIsFormCurrentlySubmitting(false);
    }
  }

  return (
    <form className="form" onSubmit={handleFormSubmissionEvent}>
      <h2 className="form__title">{formMainTitleText}</h2>

      <div className="form__fields">
        {listOfInputFieldsToRender.map(function (oneFormInputField) {
          return (
            <div key={oneFormInputField.fieldInputName} className="form__group">
              <label htmlFor={oneFormInputField.fieldInputName} className="form__label">
                {oneFormInputField.fieldVisibleLabel}
              </label>
              <input
                id={oneFormInputField.fieldInputName}
                name={oneFormInputField.fieldInputName}
                type={oneFormInputField.fieldHtmlInputType}
                placeholder={oneFormInputField.optionalPlaceholderText}
                value={valuesTypedByUser[oneFormInputField.fieldInputName]}
                onChange={function (inputChangeEvent) {
                  updateValueForOneInputField(
                    oneFormInputField.fieldInputName,
                    inputChangeEvent.target.value,
                  );
                }}
                className="form__input"
                autoComplete={oneFormInputField.optionalBrowserAutoCompleteHint}
                disabled={isFormCurrentlySubmitting}
              />
            </div>
          );
        })}
      </div>

      {optionalFooterLinkConfig && (
        <div className="form__footer">
          <Link href={optionalFooterLinkConfig.linkDestinationUrl} className="form__link">
            {optionalFooterLinkConfig.linkLabelText}
          </Link>
        </div>
      )}

      <button type="submit" className="form__submit" disabled={isFormCurrentlySubmitting}>
        {submitButtonLabelText}
      </button>
    </form>
  );
}

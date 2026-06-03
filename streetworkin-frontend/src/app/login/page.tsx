// Import Components and libraries
import type { Metadata } from "next";
import Form, { type OneFormInputFieldDescription } from "@/components/form";

// Import styles
import "./page.scss";

// Metadata used by Next.js for the SEO of this page.
export const metadata: Metadata = {
  title: "Connexion — StreetWork'in",
  description: "Connecte-toi à ton compte StreetWork'in.",
};


// Description of the two input fields shown on the login form (email + password).
const LIST_OF_LOGIN_FORM_INPUT_FIELDS: OneFormInputFieldDescription[] = [
  {
    fieldInputName: "email",
    fieldVisibleLabel: "Email",
    fieldHtmlInputType: "email",
    optionalPlaceholderText: "ton@email.com",
    optionalBrowserAutoCompleteHint: "email",
  },
  {
    fieldInputName: "password",
    fieldVisibleLabel: "Mot de passe",
    fieldHtmlInputType: "password",
    optionalPlaceholderText: "Ton mot de passe",
    optionalBrowserAutoCompleteHint: "current-password",
  },
];


export default function LoginPage() {
  return (
    <main className="login">
      <Form
        formMainTitleText="Connexion"
        listOfInputFieldsToRender={LIST_OF_LOGIN_FORM_INPUT_FIELDS}
        submitButtonLabelText="Se connecter"
      />
    </main>
  );
}

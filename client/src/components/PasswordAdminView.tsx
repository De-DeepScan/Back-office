interface PasswordAdminViewProps {
  passwordEntered: string;
  isPasswordCorrect: boolean;
}

export function PasswordAdminView({
  passwordEntered,
  isPasswordCorrect,
}: PasswordAdminViewProps) {
  const PASSWORD_LENGTH = 5;

  // Logique de couleur de bordure
  const getBorderClass = (): string => {
    if (isPasswordCorrect) return "correct";
    if (passwordEntered.length === PASSWORD_LENGTH && !isPasswordCorrect) {
      return "incorrect";
    }
    return "default"; // Cyan (en cours de saisie)
  };

  // Nettoyer passwordEntered : gérer tous les cas de valeurs vides/invalides
  const cleanPassword =
    passwordEntered &&
    passwordEntered.trim() !== "" &&
    !passwordEntered.includes("(vide") &&
    passwordEntered !== "undefined" &&
    passwordEntered !== "null"
      ? passwordEntered
      : "";

  return (
    <div className="password-admin-view">
      <div className={`password-boxes ${getBorderClass()}`}>
        {Array.from({ length: PASSWORD_LENGTH }).map((_, index) => (
          <div key={index} className="password-box">
            <span className="password-char">{cleanPassword[index] || "_"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

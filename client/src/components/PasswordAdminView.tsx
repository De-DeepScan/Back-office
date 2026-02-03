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

  // Nettoyer passwordEntered si c'est "(vide" ou undefined
  const cleanPassword =
    !passwordEntered || passwordEntered === "(vide" ? "" : passwordEntered;

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

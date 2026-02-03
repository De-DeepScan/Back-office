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

  return (
    <div className="password-admin-view">
      <div className="password-admin-label">
        🔒 Vue Admin - Mot de passe en cours (read-only)
      </div>
      <div className={`password-boxes ${getBorderClass()}`}>
        {Array.from({ length: PASSWORD_LENGTH }).map((_, index) => (
          <div key={index} className="password-box">
            {passwordEntered[index] || "_"}
          </div>
        ))}
      </div>
    </div>
  );
}

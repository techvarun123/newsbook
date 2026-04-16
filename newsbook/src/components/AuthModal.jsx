import { useEffect } from "react";

function AuthModal({ isOpen, title, submitLabel, fields, onClose, onSubmit }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    onSubmit(values);
    event.currentTarget.reset();
  };

  return (
    <div className="modal is-open" role="dialog" aria-modal="true" aria-label={title} onClick={onClose}>
      <div className="modal-content" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close modal">
          x
        </button>
        <h2>{title}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <label key={field.name}>
              {field.label}
              <input
                type={field.type}
                name={field.name}
                required={field.required ?? true}
                minLength={field.minLength}
                placeholder={field.placeholder}
              />
            </label>
          ))}

          <button type="submit" className="btn btn-primary">
            {submitLabel}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AuthModal;
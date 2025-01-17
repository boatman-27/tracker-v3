import { Link } from "react-router-dom";

function Button({ children, disabled, to, type, onClick }) {
  const base =
    "inline-block text-sm rounded-full font-semibold uppercase tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-offset-2 disabled:cursor-not-allowed";

  const styles = {
    primary: `${base} bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-4 py-2 md:px-6 md:py-4`,
    small: `${base} bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-4 py-2 md:px-5 md:py-2.5 text-xs`,
    round: `${base} bg-yellow-400 text-stone-800 hover:bg-yellow-300 focus:bg-yellow-300 px-2.5 py-1 md:px-3.5 md:py-2 text-sm`,
    accept: `${base} bg-green-400 text-stone-800 hover:bg-green-600 focus:bg-green-600 focus:ring-green-300 px-4 py-2 md:px-6 md:py-3 text-sm`,
    reject: `${base} bg-red-400 text-stone-800 hover:bg-red-600 focus:bg-red-600 focus:ring-red-300 px-4 py-2 md:px-6 md:py-3 text-sm`,
    secondary:
      "inline-block text-sm rounded-full border-2 border-stone-300 font-semibold uppercase tracking-wide text-stone-400 transition-colors duration-300 hover:bg-stone-300 hover:text-stone-800 focus:bg-stone-300 focus:text-stone-800 focus:outline-none focus:ring focus:ring-stone-200 focus:ring-offset-2 disabled:cursor-not-allowed px-4 py-2.5 md:px-6 md:py-3.5",
  };

  if (onClick) {
    return (
      <button disabled={disabled} className={styles[type]} onClick={onClick}>
        {children}
      </button>
    );
  }

  if (to)
    return (
      <Link to={to} className={styles[type]}>
        {children}
      </Link>
    );

  return (
    <button disabled={disabled} className={styles[type]}>
      {children}
    </button>
  );
}

export default Button;

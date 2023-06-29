type NavigationProps = {
  isvertical?: boolean;
  className?: string;
  link?: boolean;
};

export function Navigation({
  isvertical = false,
  className,
  link = false,
}: NavigationProps) {
  const classes = isvertical
    ? "flex flex-col space-y-6"
    : "flex items-center space-x-4";

  return (
    <ul className={`lowercase text-neutral-400 ${classes} ${className}`}>
      <li className="transition-all hover:dark:text-neutral-100">
        <a href="/">Inicio</a>
      </li>
      <li className="transition-all hover:dark:text-neutral-100">
        <a href="/bio">Bio</a>
      </li>
      <li className="transition-all hover:dark:text-neutral-100">
        <a href="/libros">Libros</a>
      </li>
      <li className="transition-all hover:dark:text-neutral-100">
        <a href="/media">Media</a>
      </li>
      <li className="transition-all hover:dark:text-neutral-100">
        <a href="/contacto">Contacto</a>
      </li>
    </ul>
  );
}

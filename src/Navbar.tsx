import { Link } from "react-router-dom";

interface NavbarProps {
  headings: { id: string; text: string }[];
  activeHeading: string;
  onChange: (id: string) => void;
}

function Navbar({ headings, activeHeading, onChange }: NavbarProps) {
  return (
    <nav className="mt-2 top-0 left-0">
      <ol className="flex justify-center">
        {headings.map((el) => (
          <Link
            to={el.id}
            key={el.id}
            className={`select-none mx-1 px-4 py-0.5 rounded-3xl cursor-default hover:bg-emerald-400 hover:text-gray-50 ${
              activeHeading == el.id
                ? "bg-emerald-400 text-gray-50"
                : "bg-white"
            }  transition-none`}
            onClick={() => onChange(el.id)}
          >
            {el.text}
          </Link>
        ))}
      </ol>
    </nav>
  );
}

export default Navbar;

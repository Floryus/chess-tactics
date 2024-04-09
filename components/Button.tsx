interface ButtonProps {
  text: string;
  action: () => void;
  width?: number;
}

const Button = ({ text, action, width }: ButtonProps) => {
  const widthClass = width ? `px-${width}` : "px-28";

  return (
    <div className={` mx-auto  border border-gray-300 py-4  ${widthClass} `}>
      <button
        className="text-xl items-center flex justify-center"
        onClick={action}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;

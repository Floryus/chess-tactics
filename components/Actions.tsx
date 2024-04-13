interface ActionsProps {
  text: string;
  emoji: string;
  onClick: () => void;
}

export default function Actions({ text, emoji, onClick }: ActionsProps) {
  return (
    <div className={` mx-auto   py-2 px-2 `}>
      <button
        className="text-xl items-center flex justify-center  "
        onClick={onClick}
      >
        <span className="emoji">{emoji}</span>
        <p className="hover:underline">{text}</p>
      </button>
    </div>
  );
}

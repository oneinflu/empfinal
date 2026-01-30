import { cx } from "@/utils/cx";

interface LevelFilterProps {
    selectedLevel: "Beginner" | "Intermediate" | "Advanced";
    onSelect: (level: "Beginner" | "Intermediate" | "Advanced") => void;
}

export const LevelFilter = ({ selectedLevel, onSelect }: LevelFilterProps) => {
    const levels: ("Beginner" | "Intermediate" | "Advanced")[] = ["Beginner", "Intermediate", "Advanced"];

    return (
        <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-gray-100 rounded-full border border-gray-200">
                {levels.map((level) => (
                    <button
                        key={level}
                        onClick={() => onSelect(level)}
                        className={cx(
                            "px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200",
                            selectedLevel === level
                                ? "bg-white text-gray-900 shadow-sm ring-1 ring-gray-200"
                                : "text-gray-500 hover:text-gray-900 hover:bg-gray-200/50"
                        )}
                    >
                        {level}
                        {level === "Beginner" && (
                            <span className="ml-2 px-1.5 py-0.5 text-[10px] font-bold bg-green-100 text-green-700 rounded-full">
                                FREE
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

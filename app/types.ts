export interface Tactic {
  id: string;
  title: string;
  questionFen: string;
  answerFen: string;
  difficulty_level: "easy" | "intermediate" | "hard";
  tag: string;
  created_by: string;
  created_at: string;
}

export interface Tactic {
  id: string;
  title: string;
  questionFen: string;
  answerFen: string;
  difficulty_level: "Easy" | "Intermediate" | "Hard";
  tag: string;
  created_by: string;
  created_at: string;
}

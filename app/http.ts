import { Tactic } from "./types";

export async function loadTactic(tacticId: string): Promise<Tactic> {
  console.log("load tactic ", tacticId);
  let answer: Tactic = {
    id: "abc",
    title: "Schwerer Springer",
    questionFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    answerFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    difficulty_level: "hard",
    tag: "Damen-Gambit",
    created_by: "user_id_abc",
    created_at: "2024-03-15",
  };
  // TODO: type the response

  return answer;
}

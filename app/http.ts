import { Tactic } from "./types";

export async function loadTactic(userId: string): Promise<Tactic[]> {
  console.log("load tactic for user: ", userId);

  let answer: Tactic[] = [{
    id: "abc",
    title: "Schwerer Springer",
    questionFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    answerFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    difficulty_level: "Hard",
    tag: "Damen-Gambit",
    created_by: "user_id_abc",
    created_at: "2024-03-15",
  },
{
  id: "abcd",
    title: "Schwerer Springerohafsd",
    questionFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    answerFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    difficulty_level: "Hard",
    tag: "Damen-Gambit",
    created_by: "user_id_abc",
    created_at: "2024-03-15",
}];

  //const data = await fetch("");
  return answer;
}

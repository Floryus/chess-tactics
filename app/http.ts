import { Tactic } from "./types";

export const api = "http://3.79.232.56:8080";

export async function loadTactic(tacticId: string): Promise<Tactic> {
  console.log("load tactic ", tacticId);
  // API CALL
  const request: RequestInfo = new Request(api + "/load/" + tacticId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const respone = await fetch(request);
  const json = await respone.json();
  console.log("Response", json);

  let answer: Tactic = {
    id: json.id,
    title: json.title,
    questionFen: json.questionFen,
    answerFen: json.answerFen,
    difficulty_level: json.difficulty_level,
    tag: json.tag,
    created_by: json.created_by,
    created_at: json.created_at,
  };

  return answer;
}

export async function loadNextTactic(userId: string): Promise<String> {
  // API CALL
  console.log("Load next tactic for user", userId);
  const request: RequestInfo = new Request(api + "/loadNextTactic/" + userId, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const response = await fetch(request);
  const json = await response.json();
  console.log("Response", json);

  return json;
}

export async function listTactics(userId: string): Promise<Tactic[]> {
  return [
    {
      id: "abc",
      title: "Schwerer Springer",
      questionFen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      answerFen: "rnbqkbnr/pppppppp/8/8/P7/8/1PPPPPPP/RNBQKBNR b KQkq - 0 1",
      difficulty_level: "Hard",
      tag: "Queens-Gambit",
      created_by: "user_id_abc",
      created_at: "2024-03-15",
    },
    {
      id: "def",
      title: "The Castled Fortress",
      questionFen:
        "rnbqkbnr/pp1ppppp/8/2p5/8/5N2/PPPPPPPP/RNBQKB1R b KQkq - 0 1",
      answerFen: "rnbqkbnr/pp1ppppp/8/2p5/8/5N2/PPPPPPPP/RNBQK2R w KQkq - 0 2",
      difficulty_level: "Intermediate",
      tag: "King's Indian Defense",
      created_by: "user_id_def",
      created_at: "2024-04-10",
    },
    {
      id: "ghi",
      title: "The Poisoned Pawn",
      questionFen:
        "rnbqkbnr/pppp1ppp/8/4p3/3P4/8/PPP1PPPP/RNBQKBNR w KQkq - 0 1",
      answerFen:
        "rnbqkbnr/pppp1ppp/8/4p3/3P4/2N5/PPP1PPPP/R1BQKBNR b KQkq - 0 1",
      difficulty_level: "Hard",
      tag: "Sicilian Defense",
      created_by: "user_id_ghi",
      created_at: "2024-04-20",
    },
    {
      id: "jkl",
      title: "The Decoyed Queen",
      questionFen:
        "rnbqkb1r/pppppppp/5n2/8/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 1",
      answerFen:
        "rnbqkb1r/pppppppp/5n2/8/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 0 1",
      difficulty_level: "Intermediate",
      tag: "Scandinavian Defense",
      created_by: "user_id_jkl",
      created_at: "2024-04-25",
    },
  ];
}

export async function saveTactic(tactic: Tactic) {
  // API CALL
  console.log("Save tactic to db", tactic);
  const json = JSON.stringify(tactic);
  const request: RequestInfo = new Request(api + "/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: json,
  });

  const response = await fetch(request);
  console.log("Response", response);
}

export async function solveTactic(
  userId: string,
  time: number,
  tries: number,
  solved: boolean,
  tacticsId: number
) {
  // API CALL
  console.log("Solve tactic", time, tries, solved, tacticsId, userId);
  const body = await JSON.stringify({ time, tries, solved, tacticsId, userId });
  console.log("Body", body);

  const request: RequestInfo = new Request(api + "/updateCard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: body,
  });

  const response = await fetch(request);
  const json = await response.json();
  console.log("Response", json);
}

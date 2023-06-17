import Submission from '../models/submission_model';

// new answer submission
// new answer submission
export async function submit(roomId: string, player: any, questionNumber: number, response: any, correct: any) {
  const existingSubmission = await Submission.findOne({ roomId, player, questionNumber });
  if (existingSubmission) {
    throw new Error('This player has already submitted a repsonse to this question');
  }

  const newSubmission = new Submission({
    roomId,
    player,
    response,
    questionNumber,
    correct,
  });
  await newSubmission.save();

  return newSubmission;
}

export async function countSubmissions(roomId: string, questionNumber: number) {
  // see if all players have submitted and update the game state as necessary / has to be after submission is saved
  const numSubmissions = await Submission.countDocuments({ roomId, questionNumber });

  return numSubmissions;
}

// computes scores for all players in a room
export async function getScores(roomId: string, currentQuestionNumber: number, players: string[]) {
  const submissions = await Submission.find({ roomId });

  // const scores = {};

  // scores map string to number
  const scores = new Map<string, number>();
  players.forEach((player) => {
    // @ts-ignore
    scores[player] = 0;
  });

  submissions.forEach((submission) => {
    // don't count unfinished rounds
    if (submission.questionNumber < currentQuestionNumber && submission.correct) {
      // @ts-ignore
      scores[submission.player] += 1;
    }
  });

  // sort the scores by descending order
  const sorted = Object.entries(scores).sort((a, b) => { return b[1] - a[1]; });

  return sorted;
}

import { Body } from "./server";

export function getPrompt({
  question,
  response,
  type,
  hasImage,
}: {
  question: Body["question"];
  response: Body["response"];
  type: Body["type"];
  hasImage: boolean;
}) {
  const formmatedType = type?.split("_")?.join(" ")?.toUpperCase();

  const prompt = `You are an IELTS examiner. Use the official IELTS Writing Band Descriptors to assess the following writing task.

Below are the full band descriptors for Writing ${formmatedType}.

${bandDescriptors[type]}

Here is the task:
${question}
${hasImage ? `Attached to the request is the task image.` : ""}

Here is the candidate's response:
${response}

Please assess the writing based on the four criteria:
1. ${type === "task_2" ? "Task Response" : "Task Achievement"}
2. Coherence and Cohesion
3. Lexical Resource
4. Grammatical Range and Accuracy

For each criterion, give:
- A band score (1–9)
- A short explanation for why you chose that score

Finally, provide the **overall band score** and a **brief summary of what could be improved ( use the original sentences and then suggest improvements)**.

Notes:
- Be generous with each band score, but the final score is an average of them all rounded up with 0.5 intervals ( always check for this to be correct ).
- In the Formatting of the response avoid using markdowns, * or any other formatting. Just use plain tex with Break lines.
- Always try to seem like a human.
`;

  return prompt;
}

const bandDescriptors: Record<Body["type"], string> = {
  task_2: `
  --- Task Response ---
Band 9: Fully addresses all parts of the task. Presents a fully developed position with relevant, fully extended, and well-supported ideas.
Band 8: Covers all parts of the task. Presents a well-developed response with relevant and extended ideas.
Band 7: Addresses all parts of the task. Presents a clear position throughout the response.
Band 6: Addresses all parts of the task although some parts may be more fully covered than others.
Band 5: Addresses the task only partially. The format may be inappropriate in places. Presents a limited position.
Band 4: Responds to the task only in a minimal way OR the answer is tangential. Presents a position but it is unclear or repetitive.
Band 3: Does not adequately address any part of the task. The response may be wholly unrelated to the task.
Band 2: Barely responds to the task. May consist of only a few words or memorized phrases.
Band 1: No communication possible. Contains only isolated words.

--- Coherence and Cohesion ---
Band 9: Uses cohesion in such a way that it attracts no attention. Sequences information and ideas logically.
Band 8: Manages all aspects of cohesion well. Paragraphing is used sufficiently and appropriately.
Band 7: Logically organizes information and ideas. There is clear progression throughout.
Band 6: Arranges information and ideas coherently, with a clear overall progression.
Band 5: Presents information with some organization but there may be a lack of overall progression.
Band 4: Presents information and ideas but lacks overall progression. May use basic cohesion inaccurately or repetitively.
Band 3: Does not organize ideas logically. May use very little cohesive devices.
Band 2: Has very little control of organizational features.
Band 1: Fails to communicate any message.


--- Lexical Resource ---
Band 9: Uses a wide range of vocabulary naturally and accurately with rare errors.
Band 8: Uses a wide range of vocabulary fluently and flexibly. Occasional inaccuracies or inappropriate word choices.
Band 7: Uses a sufficient range of vocabulary to allow flexibility and precision. Some errors in word choice or collocation.
Band 6: Uses an adequate range of vocabulary for the task. Some errors in word choice, spelling, and/or word formation.
Band 5: Limited range of vocabulary. Frequent errors in word choice, spelling, and/or word formation.
Band 4: Uses only basic vocabulary which may be used repetitively or inaccurately.
Band 3: Uses very limited vocabulary to express simple ideas, with frequent errors.
Band 2: Uses extremely limited vocabulary; essentially no control of word formation.
Band 1: Can only produce isolated words.

--- Grammatical Range and Accuracy ---
Band 9: Uses a wide range of structures accurately and flexibly. Rare errors only as ‘slips’.
Band 8: Uses a wide range of structures. The majority of sentences are error-free.
Band 7: Uses a variety of complex structures. Frequent error-free sentences.
Band 6: Uses a mix of simple and complex sentence forms. Some errors are noticeable.
Band 5: Limited range of sentence structures. Frequent grammatical errors may cause some difficulty for the reader.
Band 4: Uses only a very limited range of structures; frequent grammatical errors.
Band 3: Attempts sentence forms but errors dominate and distort meaning.
Band 2: Cannot use sentence forms except in memorized phrases.
Band 1: Cannot use sentence forms at all.

`,
  task_1_academic: `
--- Task Achievement ---
Band 9: Fully satisfies all the requirements of the task. Clearly presents a fully developed response.
Band 8: Covers all requirements of the task sufficiently. Clearly presents, highlights, and illustrates key features/bullet points.
Band 7: Covers the requirements of the task. Presents a clear overview of main trends, differences, or stages.
Band 6: Addresses the requirements of the task. Presents an overview with information appropriately selected.
Band 5: Generally addresses the task; may have inaccuracies or irrelevant detail. May not clearly present key features.
Band 4: Attempts to address the task but does not cover all key features. Information may be inaccurate or irrelevant.
Band 3: Fails to address the task appropriately. Little or no data presented or described.
Band 2: Barely attempts the task. Response may be disconnected or unclear.
Band 1: No communication possible.

--- Coherence and Cohesion ---
Band 9: Uses cohesion in such a way that it attracts no attention. Sequences information and ideas logically.
Band 8: Manages all aspects of cohesion well. Paragraphing is used sufficiently and appropriately.
Band 7: Logically organizes information and ideas. There is clear progression throughout.
Band 6: Arranges information and ideas coherently, with a clear overall progression.
Band 5: Presents information with some organization but there may be a lack of overall progression.
Band 4: Presents information and ideas but lacks overall progression. May use basic cohesion inaccurately or repetitively.
Band 3: Does not organize ideas logically. May use very little cohesive devices.
Band 2: Has very little control of organizational features.
Band 1: Fails to communicate any message.

--- Lexical Resource ---
Band 9: Uses a wide range of vocabulary naturally and accurately with rare errors.
Band 8: Uses a wide range of vocabulary fluently and flexibly. Occasional inaccuracies or inappropriate word choices.
Band 7: Uses a sufficient range of vocabulary to allow flexibility and precision. Some errors in word choice or collocation.
Band 6: Uses an adequate range of vocabulary for the task. Some errors in word choice, spelling, and/or word formation.
Band 5: Limited range of vocabulary. Frequent errors in word choice, spelling, and/or word formation.
Band 4: Uses only basic vocabulary which may be used repetitively or inaccurately.
Band 3: Uses very limited vocabulary to express simple ideas, with frequent errors.
Band 2: Uses extremely limited vocabulary; essentially no control of word formation.
Band 1: Can only produce isolated words.

--- Grammatical Range and Accuracy ---
Band 9: Uses a wide range of structures accurately and flexibly. Rare errors only as ‘slips’.
Band 8: Uses a wide range of structures. The majority of sentences are error-free.
Band 7: Uses a variety of complex structures. Frequent error-free sentences.
Band 6: Uses a mix of simple and complex sentence forms. Some errors are noticeable.
Band 5: Limited range of sentence structures. Frequent grammatical errors may cause some difficulty for the reader.
Band 4: Uses only a very limited range of structures; frequent grammatical errors.
Band 3: Attempts sentence forms but errors dominate and distort meaning.
Band 2: Cannot use sentence forms except in memorized phrases.
Band 1: Cannot use sentence forms at all.


`,
  task_1_general: `
--- Task Achievement ---
Band 9: Fully satisfies all the requirements of the task. Clearly presents a fully developed response. Tone is entirely appropriate.
Band 8: Covers all requirements of the task sufficiently. Clearly presents a purpose. Tone is appropriate.
Band 7: Covers the requirements of the task. Presents a clear purpose. Tone is consistent and appropriate.
Band 6: Addresses the requirements of the task. Presents a purpose that is generally clear; tone is generally appropriate.
Band 5: Generally addresses the task. Purpose may be unclear; tone may be inappropriate or inconsistent.
Band 4: Attempts the task but purpose may be unclear. Tone may be inappropriate or inconsistent.
Band 3: Fails to convey purpose. Letter may be badly structured or undeveloped.
Band 2: Barely attempts the task. Minimal communication.
Band 1: No communication possible.

--- Coherence and Cohesion ---
Band 9: Uses cohesion in such a way that it attracts no attention. Sequences information and ideas logically.
Band 8: Manages all aspects of cohesion well. Paragraphing is used sufficiently and appropriately.
Band 7: Logically organizes information and ideas. There is clear progression throughout.
Band 6: Arranges information and ideas coherently, with a clear overall progression.
Band 5: Presents information with some organization but there may be a lack of overall progression.
Band 4: Presents information and ideas but lacks overall progression. May use basic cohesion inaccurately or repetitively.
Band 3: Does not organize ideas logically. May use very little cohesive devices.
Band 2: Has very little control of organizational features.
Band 1: Fails to communicate any message.

--- Lexical Resource ---
Band 9: Uses a wide range of vocabulary naturally and accurately with rare errors.
Band 8: Uses a wide range of vocabulary fluently and flexibly. Occasional inaccuracies or inappropriate word choices.
Band 7: Uses a sufficient range of vocabulary to allow flexibility and precision. Some errors in word choice or collocation.
Band 6: Uses an adequate range of vocabulary for the task. Some errors in word choice, spelling, and/or word formation.
Band 5: Limited range of vocabulary. Frequent errors in word choice, spelling, and/or word formation.
Band 4: Uses only basic vocabulary which may be used repetitively or inaccurately.
Band 3: Uses very limited vocabulary to express simple ideas, with frequent errors.
Band 2: Uses extremely limited vocabulary; essentially no control of word formation.
Band 1: Can only produce isolated words.

--- Grammatical Range and Accuracy ---
Band 9: Uses a wide range of structures accurately and flexibly. Rare errors only as ‘slips’.
Band 8: Uses a wide range of structures. The majority of sentences are error-free.
Band 7: Uses a variety of complex structures. Frequent error-free sentences.
Band 6: Uses a mix of simple and complex sentence forms. Some errors are noticeable.
Band 5: Limited range of sentence structures. Frequent grammatical errors may cause some difficulty for the reader.
Band 4: Uses only a very limited range of structures; frequent grammatical errors.
Band 3: Attempts sentence forms but errors dominate and distort meaning.
Band 2: Cannot use sentence forms except in memorized phrases.
Band 1: Cannot use sentence forms at all.

`,
};

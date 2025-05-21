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
  const taskSpecificCriteria = {
    task_2: `Task Response (25%):
   Band 9: Fully addresses all parts of the task; presents a fully developed position with relevant, fully extended and well supported ideas
   Band 8: Sufficiently addresses all parts of the task; presents a well-developed response with relevant, extended and supported ideas
   Band 7: Addresses all parts of the task; presents a clear position throughout; presents, extends and supports main ideas
   Band 6: Addresses all parts of the task although some parts may be more fully covered than others; presents a relevant position; presents and adequately develops main ideas
   Band 5: Generally addresses the task; the format may be inappropriate in places; expresses a position but the development is not always clear
   Band 4: May not respond to all parts of the task; may not express a clear position; may present few ideas, which may be largely irrelevant/repetitive`,

    task_1_general: `Task Achievement (25%):
   Band 9: Fully satisfies all the requirements of the task; clearly presents a fully developed response
   Band 8: Covers all requirements of the task sufficiently; presents, highlights and illustrates key features/bullet points clearly and appropriately
   Band 7: Covers the requirements of the task; presents a clear overview of main trends, differences or stages; clearly presents and highlights key features/bullet points
   Band 6: Addresses the requirements of the task; presents an overview with information appropriately selected; presents and adequately highlights key features/bullet points
   Band 5: Generally addresses the task; the format may be inappropriate in places; recounts detail mechanically with no clear overview
   Band 4: Attempts to address the task but does not cover all key features/bullet points; the format may be inappropriate`,

    task_1_academic: `Task Achievement (25%):
   Band 9: Fully satisfies all the requirements of the task; clearly presents a fully developed response
   Band 8: Covers all requirements of the task sufficiently; presents, highlights and illustrates key features/bullet points clearly and appropriately
   Band 7: Covers the requirements of the task; presents a clear overview of main trends, differences or stages; clearly presents and highlights key features/bullet points
   Band 6: Addresses the requirements of the task; presents an overview with information appropriately selected; presents and adequately highlights key features/bullet points
   Band 5: Generally addresses the task; the format may be inappropriate in places; recounts detail mechanically with no clear overview
   Band 4: Attempts to address the task but does not cover all key features/bullet points; the format may be inappropriate`,
  };

  const taskType =
    type === "task_2"
      ? "Task 2 (Essay)"
      : type === "task_1_general"
      ? "Task 1 (General Training Letter)"
      : "Task 1 (Academic Report)";

  return `You are an official IELTS Writing examiner. Analyze the following ${taskType} response and provide detailed feedback according to the official IELTS band descriptors.

Question: ${question}
${!!hasImage ? "Consider the image provided" : ""}
Response: ${response}

Please provide a comprehensive analysis following these IELTS assessment criteria and their official band descriptors:

1. ${taskSpecificCriteria[type]}

2. Coherence and Cohesion (25%):
   Band 9: Uses cohesion in such a way that it attracts no attention; skilfully manages paragraphing
   Band 8: Sequences information and ideas logically; manages all aspects of cohesion well; uses paragraphing sufficiently and appropriately
   Band 7: Logically organizes information and ideas; there is clear progression throughout; uses a range of cohesive devices appropriately
   Band 6: Arranges information and ideas coherently and there is a clear overall progression; uses cohesive devices effectively
   Band 5: Presents information with some organization but there may be a lack of overall progression; makes inadequate, inaccurate or over-use of cohesive devices
   Band 4: Presents information and ideas but these are not arranged coherently and there is no clear progression in the response

3. Lexical Resource (25%):
   Band 9: Uses a wide range of vocabulary with very natural and sophisticated control of lexical features; rare minor errors occur only as 'slips'
   Band 8: Uses a wide range of vocabulary fluently and flexibly; uses less common lexical items with precision; occasional inaccuracies in word choice
   Band 7: Uses a sufficient range of vocabulary to allow some flexibility and precision; uses less common lexical items with some awareness of style
   Band 6: Uses an adequate range of vocabulary for the task; attempts to use less common vocabulary but with some inaccuracy
   Band 5: Uses a limited range of vocabulary, but this is minimally adequate for the task; may make noticeable errors in spelling and/or word formation
   Band 4: Uses only basic vocabulary which may be used repetitively or which may be inappropriate for the task

4. Grammatical Range and Accuracy (25%):
   Band 9: Uses a wide range of structures with full flexibility and accuracy; rare minor errors occur only as 'slips'
   Band 8: Uses a wide range of structures; the majority of sentences are error-free; makes only very occasional errors
   Band 7: Uses a variety of complex structures; produces frequent error-free sentences; has good control of grammar and punctuation
   Band 6: Uses a mix of simple and complex sentence forms; makes some errors in grammar and punctuation but they rarely reduce communication
   Band 5: Uses only a limited range of structures; attempts complex sentences but these tend to be less accurate than simple sentences
   Band 4: Uses only a very limited range of structures with only rare use of subordinate clauses; some structures are accurate but errors predominate

For each criterion:
1. Identify which band descriptor best matches the response
2. Provide specific examples from the text that support this assessment
3. List key strengths that align with the band descriptor
4. Identify areas that need improvement to reach the next band

Finally, provide:
1. Overall band score (average of the four criteria)
2. Detailed explanation of why this overall score was given
3. Three specific, actionable recommendations for improvement
4. A sample improved version of one paragraph showing how to implement these improvements

Keep the feedback constructive and specific, focusing on actionable improvements that will help the writer progress to the next band level.`;
}

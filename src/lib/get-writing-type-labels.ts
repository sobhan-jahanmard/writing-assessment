export const getWritingTypeLabels = (type: string) => {
  switch (type) {
    case "task_2":
      return "Task 2";
    case "task_1_general":
      return "Task 1 (General Training)";
    case "task_1_academic":
      return "Task 1 (Academic)";
  }
};

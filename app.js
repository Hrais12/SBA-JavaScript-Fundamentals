// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
  };
  
  // The provided assignment group.
  const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
      {
        id: 1,
        name: "Declare a Variable",
        due_at: "2023-01-25",
        points_possible: 50
      },
      {
        id: 2,
        name: "Write a Function",
        due_at: "2023-02-27",
        points_possible: 150
      },
      {
        id: 3,
        name: "Code the World",
        due_at: "3156-11-15",
        points_possible: 500
      }
    ]
  };
  
  // The provided learner submission data.
  const LearnerSubmissions = [
    {
      learner_id: 125,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-25",
        score: 47
      }
    },
    {
      learner_id: 125,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-02-12",
        score: 150
      }
    },
    {
      learner_id: 125,
      assignment_id: 3,
      submission: {
        submitted_at: "2023-01-25",
        score: 400
      }
    },
    {
      learner_id: 132,
      assignment_id: 1,
      submission: {
        submitted_at: "2023-01-24",
        score: 39
      }
    },
    {
      learner_id: 132,
      assignment_id: 2,
      submission: {
        submitted_at: "2023-03-07",
        score: 140
      }
    }
  ];



  const getLearnerData = (CourseInfo, AssignmentGroup, LearnerSubmissions) => {

    const learnerData =[];


  }

  const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  console.log(result);

  const processSubmissions=(LearnerSubmissions) => {

    const learnerData = {};

    let submissionIndex = 0;
    while (submissionIndex < LearnerSubmissions.length) {
        const submission = LearnerSubmissions[submissionIndex];
        const learner_id = submission.learner_id;
        const assignment_id = submission.assignment_id;
        const submitted_at = submission.submission.submitted_at;
        const score = submission.submission.score;

        const assignment = AssignmentGroup.assignments.find(assign => assign.id === assignment_id);

        if (!assignment) {
            submissionIndex++; // Skip invalid assignments 
            continue;
        }
        
    
        // Check if submission is late and apply penalty if necessary
        const submissionResult = checkSubmission(submitted_at, assignment.due_at, assignment.points_possible, score);
        let modifiedScore = score; // Initialize modified score

        if (submissionResult === null) {
            submissionIndex++; // Skip processing this submission
            continue;
        }else if (submissionResult && submissionResult.late) {
            modifiedScore = submissionResult.score; // Apply penalty
        }
        // creating an object for each learner if it doesn't already  exist
        if (!learnerData[learner_id]) {   
            learnerData[learner_id] = { id: learner_id, assignments: {} }; //used bracket notation to dynamically create or update a property in the learnerData object
        }
        learnerData[learner_id].assignments[assignment_id] = modifiedScore / assignment.points_possible;
        
        submissionIndex++;
    }
    return learnerData;

  }


  const checkSubmission=(submitted_at, due_at, points_possible, score) =>{
    const dueDate = new Date(due_at);
    const submissionDate = new Date(submitted_at);
    const submissionDeadline = new Date(dueDate);
    submissionDeadline.setDate(submissionDeadline.getDate() - 30);   // submissions that are more than 30 days before the due date will be skipped, while those within 30 days before the due date but before the due date itself will be processed normally.

    switch (true) {
        case submissionDate < submissionDeadline:
            return null;
        case submissionDate > dueDate:
            // If submission is late, deduct 10% of points possible
            const latePenalty = points_possible * 0.1;
            return { late: true, score: score - latePenalty };
        default:
            return { late: false, score: score };
    }
  }

const answer = checkSubmission("2023-03-07", "2023-02-27", 150,140)
console.log(answer);


const calculateAverage=(learnerData) =>{
    for (const learner of Object.values(learnerData)) {
        let totalScore = 0;
        let totalPossible = 0;
        for (const [assignmentId, percentage] of Object.entries(learner.assignments)) {
            const assignment = AssignmentGroup.assignments.find(assign => assign.id == assignmentId);
            if (assignment) {
                totalScore += assignment.points_possible * percentage;
                totalPossible += assignment.points_possible;
            }
        }
        if (totalPossible !== 0) {
            learner.avg = totalScore / totalPossible; // Update the avg property
        } else {
            learner.avg = 0;
        }
    }

}


const validateAssignmentGroup=(CourseInfo, AssignmentGroup)=>{
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw new Error("AssignmentGroup does not belong to the course.");
    }
  }
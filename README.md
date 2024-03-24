
This Learner Data Processor code include a set of functions designed to process learner submissions, calculate averages, and format the results for educational courses.

validateAssignmentGroup(CourseInfo, AssignmentGroup)
This function takes CourseInfo and AssignmentGroup objects as input parameters. It checks whether the course_id of the AssignmentGroup matches the id of the CourseInfo. If they do not match, it throws an error indicating that the assignment group does not belong to the course.

processSubmissions(LearnerSubmissions)
This function processes learner submissions, performs data validation to ensure that all required fields in a learner submission are present and properly formatted. It checks for the existence of learner_id, assignment_id, submitted_at, and score. If any of these fields are missing or if score is not a valid number, it throws an error indicating invalid submission data. Then it calculates any late penalties by calling the other function checkSubmission , and constructs learner data objects. It utilizes a try/catch statement to handle any potential errors that may occur during the processing of learner submissions. It returns an object containing learner data.

checkSubmission(submitted_at, due_at, points_possible, score)
This helper function checks the submission date against the due date, applies penalties for late submissions, and returns an object indicating whether the submission is late and its adjusted score.

calculateAverage(learnerData)
This function calculates the average score for each learner based on their submissions.

getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions)
This function orchestrates the entire process by first validating the input data, then processing the submissions, calculating averages, formatting the results, and returning the formatted learner data.


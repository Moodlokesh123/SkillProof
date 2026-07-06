from .models import CandidateAnswer, AssessmentQuestion


def evaluate_attempt(attempt):

    score = 0
    correct = 0
    wrong = 0

    answers = CandidateAnswer.objects.filter(
        attempt_question__attempt=attempt
    ).select_related(
        "selected_option",
        "attempt_question__question"
    )

    for answer in answers:

        question = answer.attempt_question.question

        assessment_question = AssessmentQuestion.objects.get(
            assessment=attempt.assessment,
            question=question
        )

        if answer.selected_option and answer.selected_option.is_correct:

            score += assessment_question.marks
            correct += 1

        else:

            wrong += 1

    total_marks = attempt.assessment.total_marks

    percentage = (
        (score / total_marks) * 100
        if total_marks > 0 else 0
    )

    attempt.score = score
    attempt.correct_answers = correct
    attempt.wrong_answers = wrong
    attempt.percentage = round(percentage, 2)

    attempt.is_passed = (
        percentage >= attempt.assessment.pass_marks
    )

    attempt.status = "SUBMITTED"

    attempt.save()

    return attempt
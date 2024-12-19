answers_mapping = {
    "Not at all": 0, 
    "Several days": 1, 
    "More than half the days": 2, 
    "Nearly every day": 3
}

def gad7(submission):
    scores = [answers_mapping[x] for x in submission.values()]
    score = sum(scores)
    if score <= 4: return "Minimal Anxiety"
    elif score <= 9: return "Mild Anxiety"
    elif score <= 14: return "Moderate Anxiety"
    else: return "Severe Anxiety"

def phq9(submission):
    scores = [answers_mapping[x] for x in submission.values()]
    if scores[-1] == 1: return "Moderately Severe Depression"
    if scores[-1] >= 2: return "Severe Depression"

    score = sum(scores)
    if score <= 4: return "Minimal Depression"
    elif score <= 9: return "Mild Depression"
    elif score <= 14: return "Moderate Depression"
    elif score <= 19: return "Moderately Severe Depression"
    else: return "Severe Depression"
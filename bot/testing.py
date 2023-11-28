import pandas as pd
from text_classifier import predict_text 

# Function to run individual test cases
def run_test(text, expected_category, testcase_number):
    response = predict_text(text).strip()
    if response == expected_category:
        print(f"Testcase {testcase_number} Passed")
    else:
        print(f"Testcase {testcase_number} Failed")

# Test case 1
run_test("Can you provide some facts to me about MathWorks?", "Facts", 1)

# Test case 2
run_test("Can you tell me something about MathWorks?", "Facts", 2)

# Test case 3
run_test("What is MathWorks?", "Facts", 3)

# Test case 4
run_test("Tell me something about the company.", "Facts", 4)

# Test case 5
run_test("What are some facts about the company.", "Facts", 5)

# Test case 6
run_test("What is my track?", "Track", 6)

# Test case 7
run_test("Can you tell me what my track is?", "Track", 7)

# Test case 8
run_test("Please tell me my track.", "Track", 8)

# Test case 9
run_test("What is my interview status?", "Status", 9)

# Test case 10
run_test("What is my status?", "Status", 10)

# Test case 11
run_test("Can you tell me my interview status?", "Status", 11)

# Test case 12
run_test("Provide me some details about the interview status", "Status", 12)

# Test case 13
run_test("Give me the status of my interview.", "Status", 13)

# Test case 14
run_test("What is the schedule of my interview?", "Schedule", 14)

# Test case 15
run_test("Can you tell me the timing of the interview?", "Schedule", 15)

# Test case 16
run_test("At what time is my interview going to be", "Schedule", 16)

# Test case 17
run_test("When is my interview scheduled?", "Schedule", 17)

# Test case 18
run_test("What Is the timing of the interview", "Schedule", 18)

# Test case 19
run_test("What is details of the interview", "Schedule", 19)

# Test case 20
run_test("Can you give me my interviewer details?", "Interviewer", 20)

# Test case 21
run_test("Please tell me about the interviewer", "Interviewer", 21)

# Test case 22
run_test("Who is the interviewer?", "Interviewer", 22)

# Test case 23
run_test("Who is my interviewer?", "Interviewer", 23)

# Test case 24
run_test("Who is going to take my interview?", "Interviewer", 24)

# Test case 25
run_test("Give me some details about my interviewer.", "Interviewer", 25)

# Test case 26
run_test("Can you help me with the commands?", "Help", 26)

# Test case 27
run_test("What are the commands?", "Help", 27)

# Test case 28
run_test("Can you show me the commands?", "Help", 28)

# Test case 29
run_test("Please help me with the bot.", "Help", 29)

print("Tests Finished")
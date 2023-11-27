import vertexai
from vertexai.language_models import TextGenerationModel


def predict_text(text_to_search):
# text_to_search = "can you help me with the commands?"
    vertexai.init(project="sdos-project-404807", location="us-central1")
    parameters = {
    "candidate_count": 1,
    "max_output_tokens": 1024,
    "temperature": 0.2,
    "top_p": 0.8,
    "top_k": 40
    }
    model = TextGenerationModel.from_pretrained("text-bison")
    response = model.predict(
    f"""My model is trained to classify text into six categories: Facts, Track, Status, Schedule, Interviewer, and Help. Each category represents a type of inquiry or request often encountered in a professional or educational setting. \'Facts\' pertains to informational content about a company or subject. \'Track\' relates to pathways or progress in a program or system. \'Status\' is for updates or current states of applications or projects. \'Schedule\' involves timings and arrangements of events or meetings. \'Interviewer\' includes queries about the personnel involved in interviews. Lastly, \'Help\' covers assistance or guidance requests for the commands of the chatbot

input: Would you mind provide some facts to me about MathWorks?
output: Facts

input: Could you please tell me something about MathWorks?
output: Facts

input: What is MathWorks?
output: Facts

input: Tell me about the company
output: Facts

input: What is my interview status?
output: Status

input: Can you tell me our interview status?
output: Status

input: Give me the status of my interview
output: Status

input: What is the schedule of my interview?
output: Status

input: Please help me with the bot.
output: Help

input: Tell me something about the company.

output: Facts

input: give me some facts about the company

output: Facts

input: Can you help me with the commands?

output: Help

input: What are the commands?

output: Help

input: What is the schedule of my interview?

output: Schedule

input: At what time is my meeting going to be

output: Schedule

input: What Is the timing of the interview

output: Schedule

input: Can you tell me about the interviewer?

output: Interviewer

input: Who is my interviewer?

output: Interviewer

input: Who is going to take my interview?

output: Interviewer

input: What is our track?

output: Track

input: Please tell me my track.

output: Track

input: Can you tell me what our track is?

output: Track

input: What is my status?

output: Status

input: When is my interview scheduled?

output: Schedule

input: What are details of the interview

output: Schedule

input: Please tell us my track.

output: Track

input: {text_to_search}

output:
""",
    **parameters
    )
    return response.text
print(predict_text("can you tell me about the company"))
import json
import csv
import requests
import random
import telebot
import pandas as pd

Token = "6170075131:AAFnsHpB4rlkvkD7fiMseSZsHhpg_ut181c"

bot = telebot.TeleBot(Token)
print("Bot initialized")

@bot.message_handler(["start"])
def start(message):
    user_id = str(message.from_user.id)
    user_first_name = str(message.from_user.first_name)
    user_last_name = str(message.from_user.last_name)
    bot.reply_to(message,"Welcome to the MathWorks Interview Process " + user_first_name + " " + user_last_name +
                 " Hi I will be your buddy throughout this interview process.")


@bot.message_handler(["help"])
def help(message):
    bot.reply_to(
        message,
        """
        /start -> get started.
        /help -> this particular message.
        /facts -> get some facts about MathWorks.
        /schedule -> get your interview timings.
        /track -> view your selected track.
        /interviewer -> get you interviewer's details.
        /status -> get your interview status.
        """,
    )


@bot.message_handler(["facts"])
def facts(message):
    fun_facts = [
        "Founded: MathWorks was founded in 1984 by Cleve Moler, Jack Little, and Steve Bangert. The company is headquartered in Natick, Massachusetts, USA.",
        "Flagship Product: MathWorks is best known for its flagship product, MATLAB. MATLAB is a high-level programming language and development environment that is widely used for numerical analysis, data visualization, and algorithm development.",
        "Simulink: In addition to MATLAB, MathWorks also developed Simulink, a graphical programming environment for modeling, simulating, and analyzing dynamic systems. Simulink is widely used for designing and simulating control systems, signal processing algorithms, and more.",
        "Industry Applications: MathWorks software solutions are used in various industries, including aerospace, automotive, communications, finance, medical devices, and robotics. MATLAB and Simulink are employed for research, development, and production purposes in these sectors.",
        "Academic Adoption: MATLAB is widely used in academic institutions for teaching and research purposes. MathWorks offers academic licenses, resources, and support to educators, researchers, and students to facilitate learning and innovation in the field of mathematics and engineering.",
        "Online Community: MathWorks maintains an active online community where users can access technical documentation, examples, and discussion forums to seek help, share knowledge, and collaborate with other MATLAB and Simulink users.",
        "Toolboxes and Add-Ons: MathWorks offers a wide range of toolboxes and add-ons that extend the capabilities of MATLAB and Simulink. These toolboxes cover various domains, such as image processing, control systems, optimization, machine learning, and more.",
        "Continuous Development: MathWorks continues to enhance its software offerings by regularly releasing updates and new versions. These updates introduce new features, performance improvements, and bug fixes to meet the evolving needs of its users.",
        "Commitment to Education: MathWorks is committed to promoting STEM education and offers resources, competitions, and initiatives to encourage students interest in mathematics, engineering, and scientific computing.",
    ]
    random_index = random.randint(0, len(fun_facts) - 1)
    bot.reply_to(message, fun_facts[random_index])

@bot.message_handler(["info"])
def info(message):
    user_id = str(message.from_user.id)
    bot.reply_to(message, user_id)

@bot.message_handler(["track"])
def get_track(message):
    user_id = str(message.from_user.id)
    # create the data object and fill it with response data from API
    api_url = 'http://localhost:3000/api/botUpdate?telegram_id=1433866671'
    response = requests.get(api_url)
    data = response.json()
    data_dict = dict(data)
    for key, value in data_dict.items():
        if str(value) == user_id:
            bot.reply_to(message, "Your selected track for the interview: " + data["track"])  


@bot.message_handler(["status"])
def get_status(message):
    user_id = str(message.from_user.id)
    # create the data object and fill it with response data from API
    api_url = 'http://localhost:3000/api/botUpdate?telegram_id=1433866671'
    response = requests.get(api_url)
    data = response.json() 
    data_dict = dict(data)
    for key, value in data_dict.items():
        if str(value) == user_id:
            bot.reply_to(message, "Your status: " + data["interview_status"]) 


@bot.message_handler(["schedule"])
def get_schedule(message):
    user_id = str(message.from_user.id)
    # create the data object and fill it with response data from API
    api_url = 'http://localhost:3000/api/botUpdate?telegram_id=1433866671'
    response = requests.get(api_url)
    data = response.json() 
    data_dict = dict(data)
    for key, value in data_dict.items():
        if str(value) == user_id:
            bot.reply_to(message, "Start time : "+data["time_start"]+"\nEnd time : " +data["time_end"]) 


@bot.message_handler(["interviewer"])
def get_interviewer_details(message):
    user_id = str(message.from_user.id)
    # create the data object and fill it with response data from API
    api_url = 'http://localhost:3000/api/botUpdate?telegram_id=1433866671'
    response = requests.get(api_url)
    data = response.json()
    data_dict = dict(data)
    for key, value in data_dict.items():
        if str(value) == user_id:
            bot.reply_to(message, "Your Interviewer's name : "+data["interviewer_userName"]+"\nEMail id : " +data["interviewer_email"])          


bot.polling()

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
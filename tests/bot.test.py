import pandas as pd
from  text_classifier import predict_text 
file_path = '../bot/bot-test-cases.csv'

itr = 0
with open('bot-test-cases.csv', mode='r', encoding='utf-8') as file:
    for line in file:
        if(itr == 0):
            itr+=1
            continue
        values = line.strip().split(',')
        response = predict_text(values[0]).strip()
        value = values[1].strip()
        if(response == value):
            print("Tesecase " + str(itr) + " Passed")
        else :
            print("Tesecase " + str(itr) + " Failed")
        itr+=1
print("Tests Finished")
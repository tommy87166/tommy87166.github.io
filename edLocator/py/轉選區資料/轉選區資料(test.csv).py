import csv
import json

def big5_csv_reader(utf8_data, dialect=csv.excel, **kwargs):
    csv_reader = csv.reader(utf8_data, dialect=dialect, **kwargs)
    for row in csv_reader:
        yield [cell.decode('big5') for cell in row]

electoralDistricts = json.dumps([row for row in big5_csv_reader(open('test.csv','rb'))])

with open('electoralDistricts.js','wb') as FILE:
    FILE.write("var electoralDistricts = JSON.parse('"+electoralDistricts+"')")

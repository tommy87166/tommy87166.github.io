import csv
import json

def big5_csv_reader(utf8_data, dialect=csv.excel, **kwargs):
    csv_reader = csv.reader(utf8_data, dialect=dialect, **kwargs)
    for row in csv_reader:
        yield [cell.decode('big5','ignore') for cell in row]

legislators = [row for row in big5_csv_reader(open('legislators.csv','rb'))]

sort_by_electoral_district = {}
for row in legislators:
    if sort_by_electoral_district.has_key(row[0]):
        pass
    else:
        sort_by_electoral_district[row[0]] =[]
    sort_by_electoral_district[row[0]].append((row[1],row[2]))


with open('candidate.js','wb') as FILE:
    FILE.write("var candidate = JSON.parse('"+json.dumps(sort_by_electoral_district)+"')")


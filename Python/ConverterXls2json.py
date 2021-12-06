from openpyxl import Workbook
from openpyxl import load_workbook
import openpyxl

def ReadFile(path):
    LetterHeaders={
    "name":'B',
    "DirectStyleURL":'C',
    "NodeStyleURL":'D',
    "DirectLayers":'E',
    "NodeLayers":'F',
    "Lat":'G',
    "Lon":'H',
    "Zoom":'I',
    "NumTransportSystem":'J',
    "NumBusStops":'K',
    "NumRailStations":'L',
    "NumMetroStations":'M',
    "NumBoroughs":'N',
    "AreaSqKm":'O',
    "PopulationMillion":'P',
    "DensityPersonSqKm":'Q'}

    ExitDict={"City": {}}

    wb = load_workbook(path)
    # print(wb.sheetnames)
    WorkSheet=wb.active
    # print(WorkSheet['A1'].value)
    # DATA BEGINS IN LINE 3
    CellCondition=True
    RowCount=3
    while(CellCondition):
        ExcelCoord="A"+str(RowCount)
        # print(ExcelCoord,WorkSheet[ExcelCoord].value)
        if WorkSheet[ExcelCoord].value == None:
            CellCondition=False
        else:
            RowCount+=1

    # print("We have cities in the rows:",list(range(3,RowCount)))
    for Row in range(3,RowCount):
        ExcelCityCoord="A"+str(Row)
        CityEnglishName=WorkSheet[ExcelCityCoord].value
        ExitDict["City"][CityEnglishName]={}
        for key in LetterHeaders.keys():
            letter=LetterHeaders[key]
            ExcelCoord=letter+str(Row)
            ExitDict["City"][CityEnglishName][key]=WorkSheet[ExcelCoord].value
            # print(key,"\t=",WorkSheet[ExcelCoord].value)

    return ExitDict														


if __name__ =="__main__":
    PathToTheFile="DatabaseCitys.xlsx"
    Data=ReadFile(path=PathToTheFile)
    print(Data)



#<Cell 'Data'.A1>indices must be integers or slices, not str


#{
#     "City": {
#         "Montreal": {
#             "name": "Montreal",
#             "AreaSqKm": 365.65,
#             "PopulationMillion": 1.7,
#             "DensityPersonSqKm": 4662.1,
#             "NumBoroughs": 19,
#             "NumTransitSystems": 2,
#             "TransitSystems":[
#                 {
#                     "Type": "Bus",
#                     "NumStops": 11355,
#                     "NumLines": 217,
#                     "AvgDisStops": 318.52
#                 },
#                 {
#                     "Type": "Train",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Metro",
#                     "NumStops": 69,
#                     "NumLines": 4,
#                     "AvgDisStops": 2787
#                 },
#                 {
#                     "Type": "Tram",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Others",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 }
#             ],
#             "DirectStyleURL": "ckqr1dabb3x1i18nwv4qgyeoc",
#             "NodeStyleURL": "ckqqyte800ogu18ljw7yybo7m",
#             "DirectLayers": [
#                 ["montreal-bus_CD","montreal-metro_CD"],
#                 ["montreal-bus_CL","montreal-metro_CL"]
#             ],
#             "NodeLayers": [
#                 "montreal_N_CD",
#                 "montreal_N_CL"
#             ],
#             "Coords": [
#                 -73.71,
#                 45.53
#             ],
#             "Zoom": 10.45
#         },
#         "Vienna": {
#             "name": "Vienna",
#             "AreaSqKm": 414.6,
#             "PopulationMillion": 1.9,
#             "DensityPersonSqKm": 4341,
#             "NumBoroughs": 20,
#             "NumTransitSystems": 3,
#             "TransitSystems":[
#                 {
#                     "Type": "Bus",
#                     "NumStops": 9653,
#                     "NumLines": 451,
#                     "AvgDisStops": 331
#                 },
#                 {
#                     "Type": "Train",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Metro",
#                     "NumStops": 768,
#                     "NumLines": 37,
#                     "AvgDisStops": 655
#                 },
#                 {
#                     "Type": "Tram",
#                     "NumStops": 3360,
#                     "NumLines": 135,
#                     "AvgDisStops": 346
#                 },
#                 {
#                     "Type": "Others",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 }
#             ],
#             "DirectStyleURL": "ckqtuan550oah17ofvsk91mkt",
#             "NodeStyleURL": "ckqtuaktz0c3317mopggbopa1",
#             "DirectLayers": [
#                 ["vienna-bus_CD","vienna-lightrail_CD","vienna-metro_CD"],
#                 ["vienna-bus_CL","vienna-lightrail_CL","vienna-metro_CL"]
#             ],
#             "NodeLayers": [
#                 "vienna_N_CD",
#                 "vienna_N_CL"
#             ],
#             "Coords": [
#                 16.39,
#                 48.20
#             ],
#             "Zoom": 11
#         },
#         "Barcelona": {
#             "name": "Barcelona",
#             "AreaSqKm": 101.35,
#             "PopulationMillion": 1.66,
#             "DensityPersonSqKm": 16420.2,
#             "NumBoroughs": 15,
#             "NumTransitSystems": 4,
#             "TransitSystems":[
#                 {
#                     "Type": "Bus",
#                     "NumStops": 4067,
#                     "NumLines": 277,
#                     "AvgDisStops": 277
#                 },
#                 {
#                     "Type": "Train",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Metro",
#                     "NumStops": 155,
#                     "NumLines": 10,
#                     "AvgDisStops": 2669
#                 },
#                 {
#                     "Type": "Tram",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Others",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 }
#             ],
#             "DirectStyleURL": "ckqtvgc0m18j817mdhbybg80n",
#             "NodeStyleURL": "ckqtvga970j6v17o1nvbue3yz",
#             "DirectLayers": [
#                 ["barcelona-bus_CD","barcelona-metro_CD"],
#                 ["barcelona-bus_CL","barcelona-metro_CL"]
#             ],
#             "NodeLayers": [
#                 "barcelona_N_CD",
#                 "barcelona_N_CL"
#             ],
#             "Coords": [
#                 2.13,
#                 41.38
#             ],
#             "Zoom": 11.81
#         },
#         "Budapest": {
#             "name": "Budapest",
#             "AreaSqKm": 525.2,
#             "PopulationMillion": 1.75,
#             "DensityPersonSqKm": 3388,
#             "NumBoroughs": 33,
#             "NumTransitSystems": 4,
#             "TransitSystems":[
#                 {
#                     "Type": "Bus",
#                     "NumStops": 10745,
#                     "NumLines": 298,
#                     "AvgDisStops": 449
#                 },
#                 {
#                     "Type": "Train",
#                     "NumStops": 170,
#                     "NumLines": 109,
#                     "AvgDisStops": 1056
#                 },
#                 {
#                     "Type": "Metro",
#                     "NumStops": 73,
#                     "NumLines": 5,
#                     "AvgDisStops": 1121
#                 },
#                 {
#                     "Type": "Tram",
#                     "NumStops": 851,
#                     "NumLines": 37,
#                     "AvgDisStops": 417
#                 },
#                 {
#                     "Type": "Others",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 }
#             ],
#             "DirectStyleURL": "ckqttwkz60fv718pxigcal4id",
#             "NodeStyleURL": "ckqr2e1kd3egl17moxoz5t0r6",
#             "DirectLayers": [
#                 ["budapest-bus_CD","budapest-lightrail_CD","budapest-metro_CD","budapest-rail_CD"],
#                 ["budapest-bus_CL","budapest-lightrail_CL","budapest-metro_CL","budapest-rail_CL"]
#             ],
#             "NodeLayers": [
#                 "budapest_N_CD",
#                 "budapest_N_CL"
#             ],
#             "Coords": [
#                 19.12,
#                 47.48
#             ],
#             "Zoom": 10
#         },
#         "Quebec": {
#             "name": "Quebec",
#            "AreaSqKm": 453.38,
#             "PopulationMillion": 0.53,
#             "DensityPersonSqKm": 1173.2,
#             "NumBoroughs": 6,
#             "NumTransitSystems": 1,
#             "TransitSystems":[
#                 {
#                     "Type": "Bus",
#                     "NumStops": 17368,
#                     "NumLines": 318,
#                     "AvgDisStops": 338
#                 },
#                 {
#                     "Type": "Train",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Metro",
#                     "NumStops": 0,
#                     "NumLines":0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Tram",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 },
#                 {
#                     "Type": "Others",
#                     "NumStops": 0,
#                     "NumLines": 0,
#                     "AvgDisStops": 0
#                 }
#             ],

#             "DirectStyleURL": "ckqr0ljp50tnz17k8s2tm4rsh",
#             "NodeStyleURL": "ckpwzbcwp51pt17njpumzg0hq",
#             "DirectLayers": [
#                 ["quebec-bus_CD"],
#                 ["quebec-bus_CL"]
#             ],
#             "FrequencyQueryDirect": [
#                 [
#                     54,
#                     21186,
#                     3268,
#                     2268,
#                     1585
#                 ],
#                 [
#                     14856,
#                     1658,
#                     123,
#                     789,
#                     45
#                 ]
#             ],
#             "NodeLayers": [
#                 "quebec_N_CD",
#                 "quebec_N_CL"
#             ],
#             "FrequencyQueryNode": [
#                 [
#                     54,
#                     21186,
#                     3268,
#                     2268,
#                     1585
#                 ],
#                 [
#                     14856,
#                     1658,
#                     123,
#                     789,
#                     45
#                 ]
#             ],
#             "Coords": [
#                 -71.26,
#                 46.78
#             ],
#             "Zoom": 11.3
#         }
#     }
# }
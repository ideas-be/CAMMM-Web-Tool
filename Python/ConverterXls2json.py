from openpyxl import Workbook
from openpyxl import load_workbook
import openpyxl
import json

def ReadFile(path):
    LetterHeaders={   
        "City":"A",
        "name":"B",
        "DirectStyleURL":"C",
        "NodeStyleURL":"D",
        "DirectLayers":"E",
        "NodeLayers":"F",
        "Coords-Lat":"G",
        "Coords-Lon":"H",
        "Zoom":"I",
        "NumTransitSystems":"J",
        "Bus-NumStops":"K",
        "Bus-NumLines":"L",
        "Bus-AvgDisStops":"M",
        "Train-NumStops":"N",
        "Train-NumLines":"O",
        "Train-AvgDisStops":"P",
        "Metro-NumStops":"Q",
        "Metro-NumLines":"R",
        "Metro-AvgDisStops":"S",
        "Tram-NumStops":"T",
        "Tram-NumLines":"U",
        "Tram-AvgDisStops":"V",
        "Others-NumStops":"W",
        "Others-NumLines":"X",
        "Others-AvgDisStops":"Y",
        "NumBoroughs":"Z",
        "AreaSqKm":"AA",
        "PopulationMillion":"AB",
        "DensityPersonSqKm":"AC",
    }

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
   
    for Row in range(3,RowCount):
        ExcelCityCoord="A"+str(Row)
        CityEnglishName=WorkSheet[ExcelCityCoord].value
        TransitionDictionary={}
        for key in LetterHeaders.keys():
            letter=LetterHeaders[key]
            ExcelCoord=letter+str(Row)
            TransitionDictionary[key]=WorkSheet[ExcelCoord].value
            # print(key,"\t=",WorkSheet[ExcelCoord].value)
        print("DirectLayers",TransitionDictionary["DirectLayers"],type(TransitionDictionary["DirectLayers"]))
        var="\'["+TransitionDictionary["DirectLayers"]+"]\'"
        print(var,type(var))
        listTest=json.loads(var)
        # print("listTest",listTest,type(listTest))
        # ExitDict["City"][CityEnglishName]={
        #     TransitionDictionary["City"]: {
        #         "name": TransitionDictionary["name"],
        #         "AreaSqKm": TransitionDictionary["AreaSqKm"],
        #         "PopulationMillion": TransitionDictionary["PopulationMillion"],
        #         "DensityPersonSqKm": TransitionDictionary["DensityPersonSqKm"],
        #         "NumBoroughs": TransitionDictionary["NumBoroughs"],
        #         "NumTransitSystems": TransitionDictionary["NumTransitSystems"],
        #         "TransitSystems":[
        #             {
        #                 "Type": "Bus",
        #                 "NumStops": TransitionDictionary["Bus-NumStops"],
        #                 "NumLines": TransitionDictionary["Bus-NumLines"],
        #                 "AvgDisStops": TransitionDictionary["Bus-AvgDisStops"]
        #             },
        #             {
        #                 "Type": "Train",
        #                 "NumStops": TransitionDictionary["Train-NumStops"],
        #                 "NumLines": TransitionDictionary["Train-NumLines"],
        #                 "AvgDisStops": TransitionDictionary["Train-AvgDisStops"]
        #             },
        #             {
        #                 "Type": "Metro",
        #                 "NumStops": TransitionDictionary["Metro-NumStops"],
        #                 "NumLines": TransitionDictionary["Metro-NumLines"],
        #                 "AvgDisStops": TransitionDictionary["Metro-AvgDisStops"]
        #             },
        #             {
        #                 "Type": "Tram",
        #                 "NumStops": TransitionDictionary["Tram-NumStops"],
        #                 "NumLines": TransitionDictionary["Tram-NumLines"],
        #                 "AvgDisStops": TransitionDictionary["Tram-AvgDisStops"]
        #             },
        #             {
        #                 "Type": "Others",
        #                 "NumStops": TransitionDictionary["Others-NumStops"],
        #                 "NumLines": TransitionDictionary["Others-NumLines"],
        #                 "AvgDisStops": TransitionDictionary["Others-AvgDisStops"]
        #             }
        #         ],
        #         "DirectStyleURL": TransitionDictionary["DirectStyleURL"],
        #         "NodeStyleURL": TransitionDictionary["NodeStyleURL"],
        #         "DirectLayers": [
        #             json.loads
        #             ["montreal-bus_CD","montreal-metro_CD"],
        #             ["montreal-bus_CL","montreal-metro_CL"]
        #         ],
        #         "NodeLayers": [
        #             "montreal_N_CD",
        #             "montreal_N_CL"
        #         ],
        #         "Coords": [
        #             TransitionDictionary["Coords-Lat"],
        #             TransitionDictionary["Coords-Lon"]
        #         ],
        #         "Zoom": TransitionDictionary["Zoom"]
        #     }
        # }

    return ExitDict														


if __name__ =="__main__":
    PathToTheFile="DatabaseCitys.xlsx"
    Data=ReadFile(path=PathToTheFile)
    print(Data)
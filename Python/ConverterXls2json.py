from openpyxl import Workbook
from openpyxl import load_workbook
import openpyxl

def ReadFile(path):
    wb = load_workbook(path)
    print(wb.sheetnames)

if __name__ =="__main__":
    PathToTheFile="DatabaseCitys.xlsx"
    ReadFile(path=PathToTheFile)

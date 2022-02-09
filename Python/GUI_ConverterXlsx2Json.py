from tkinter import *
from tkinter import ttk
from tkinter.filedialog import askopenfilename
from tkinter import filedialog
from tkinter.filedialog import askdirectory
from tkinter import messagebox

from functools import partial
from tkinter import Tk
from tkinter import filedialog
import os




from ConverterXls2json import ReadFile
from ConverterXls2json import WriteToFile





global PathInput
PathInput=""
global PathExitt
PathExitt="" 


def OpenFileDialogue(EntryElement):
    global PathInput
    # PathInput=PathInput+". Hello. "
    print(EntryElement)
    # print("Test:",PathInput)
    name = askopenfilename(filetypes =(("Excel File", "*.xlsx"),("All Files","*.*")),
                                title = "Choose a file.")
    PathInput=name
    if len(name)>71:
        name=name[-65:]
    EntryElement.insert(0,name)
    print("Path to File!!!!:",PathInput)
    # return (PathInput)


def GetOutputPath(EntryElement):
    global PathExitt
    current_directory = filedialog.askdirectory()
    file_name = "CityMetrics.json"
    PathExitt = os.path.join(current_directory,file_name)

    if len(PathExitt)>71:
        name=PathExitt[-65:]
    else:
        name=PathExitt
    EntryElement.insert(0,name)
    
    print(PathExitt)

def RunFunc():
    global PathInput
    global PathExitt

    print("PathInput",PathInput)
    print("Type of PathInput",type(PathInput))
    print("PathExitt",PathExitt)
    print("Type of PathExitt",type(PathExitt))

    Data=ReadFile(path=PathInput)
    WriteToFile(Data=Data,ExitPath=PathExitt)

def MainWindow(root)-> None:


    root.title("Excel to JSON Converter - CAMMM Atlas Web Application")    # This instruction modifies the title of the window
    FrameMaster =ttk.Frame(root)
    FrameMaster.config(height=220,width=600) 
    FrameMaster.pack()      # This instruction calls the window to existence  
    ######
    ######  Dialog to get the input excel file
    ######
    InputFrame=ttk.LabelFrame(FrameMaster,height = 50, width =500,text ="Path to the Excel File")
    InputFrame.place(x=50 , y=50, anchor=W)

    EntryElement1= ttk.Entry(InputFrame,width=60)    # This command calls for a text box
    EntryElement1.place(x=10, y=10, anchor=W)
    EntryElement1.delete(0, END)                     # This line cleans the entry element
    EntryElement1.insert(0,"")                       # This line cleans the entry element

    button=ttk.Button(InputFrame,text="Select Excel")
    button.config(command=partial(OpenFileDialogue,EntryElement1))
    button.place(x=400, y=10, anchor=W)

    ######
    ###### Dialog to get output doler for CityMetrics.json
    ######
    OutputFrame=ttk.LabelFrame(FrameMaster,height = 50, width =500,text ="Path to Output Folder")
    OutputFrame.place(x=50 , y=100, anchor=W)

    EntryElement2= ttk.Entry(OutputFrame,width=60)    # This command calls for a text box
    EntryElement2.place(x=10, y=10, anchor=W)
    EntryElement2.delete(0, END)                     # This line cleans the entry element
    EntryElement2.insert(0,"")                       # This line cleans the entry element

    button=ttk.Button(OutputFrame,text="Select Folder")
    button.config(command=partial(GetOutputPath, EntryElement2))
    button.place(x=400, y=10, anchor=W)

    

    RUNFrame=ttk.LabelFrame(FrameMaster,height = 50, width =500,text ="Convert Excel to JSON")
    RUNFrame.place(x=50 , y=150, anchor=W)

    button=ttk.Button(RUNFrame,text="CONVERT")
    button.config(command=RunFunc)
    button.place(x=200, y=10, anchor=W)




    root.mainloop()         # This section of code maintains the window open





def GuiConverter()-> None:
    root=Tk()
    MainWindow(root)
    print("Root type:",type(root))


if __name__ == '__main__':
    GuiConverter()

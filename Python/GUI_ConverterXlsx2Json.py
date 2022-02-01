from tkinter import *
from tkinter import ttk
from tkinter.filedialog import askopenfilename
from tkinter import filedialog
from tkinter.filedialog import askdirectory
from tkinter import messagebox

from functools import partial


from ConverterXls2json import ReadFile
from ConverterXls2json import WriteToFile



def MainWindow(root)-> None:
    PathInput="Firdous"
    PathExitt=""
    def OpenFileDialogue(EntryElement):
        PathInput=PathInput+". Hello. "
        print(EntryElement)
        print("Test:",PathInput)

    root.title("Excel to JSON Converter - CAMMM Atlas Web Application")    # This instruction modifies the title of the window
    FrameMaster =ttk.Frame(root)
    FrameMaster.config(height=450,width=600) 
    FrameMaster.pack()      # This instruction calls the window to existence  

    InputFrame=ttk.LabelFrame(FrameMaster,height = 50, width =500,text ="Path to the Excel File")
    InputFrame.place(x=50 , y=50, anchor=W)

    EntryElement= ttk.Entry(InputFrame,width=60)    # This command calls for a text box
    EntryElement.place(x=10, y=10, anchor=W)
    EntryElement.delete(0, END)                     # This line cleans the entry element
    EntryElement.insert(0,"")                       # This line cleans the entry element

    button=ttk.Button(InputFrame,text="Open Excel")
    button.config(command=partial(OpenFileDialogue,EntryElement))
    button.place(x=400, y=10, anchor=W)


    root.mainloop()         # This section of code maintains the window open





def GuiConverter()-> None:
    root=Tk()
    MainWindow(root)
    print("Root type:",type(root))


if __name__ == '__main__':
    GuiConverter()

from tkinter import *
from tkinter import messagebox
from random import *
from threading import*

########################create the page of game
class background():
    def __init__(self,number,master,master2):
        global image,username_sum,userlist,user_com
        image = PhotoImage(file='picture/background.png')
        self.master = master; self.master2 = master2
        self.number = number
        userlist = {}
        username_sum = []
        #detroy the page of menu and create the page of game
        self.master.quit()
        self.master.destroy()
        self.initface = Frame(self.master2)
        self.initface.pack(side = LEFT, padx = 30)
        position = [LEFT,RIGHT,TOP,BOTTOM]
        self.initfaceR = Frame(self.master2)
        self.initfaceR.pack(side = RIGHT,anchor = N)
        #create user instance and the number is chosen by player in the menu
        for i in range(self.number):
            userlist.setdefault('user'+str(i+1),create_user(self.initface,self.initfaceR,i+1,position[i]))
        #if player choose to play game by themselves, then create a computer player  
        if len(userlist) == 1:
            user_com = create_computer(self.initface,self.initfaceR,2,RIGHT)
        #create the image of snake and ladder
        self.canvas = Canvas(self.initface,width = 800,height = 600)
        self.canvas.create_image(400,303,image = image)
        self.canvas.pack() 
        self.input_username()
        messagebox.showinfo("start!", "please, "+ username_sum[0]+" roll your dice")


    ######player can input their name
    def input_username(self):
        self.root2 = Tk()
        self.root2.title("Filling your username")
        self.xls_text = [StringVar(),StringVar(),StringVar(),StringVar()]
        self.xls =[]
        Label(self.root2, text="Please input username:").grid(row = 0,column = 1)
        #create the input page
        for i in range(len(userlist)):
            Label(self.root2, text="User"+str(i+1)+"：").grid(row = i+1,column = 0)
            self.xls.append( Entry(self.root2, textvariable=self.xls_text[i]))
            self.xls[i].grid(row = i+1,column = 1)
        #call the function on_click 
        Button(self.root2, text="ok", command=self.on_click).grid(column = 1)
        self.root2.mainloop()
        #display player's name in the canvas 
        for i in range(len(userlist)):
            userlist['user'+str(i+1)].create_start(self.canvas,i*17+28,580,i)
            userlist['user'+str(i+1)].username['text'] = username_sum[i]
            if len(userlist) == 1:#give a name to computer
                user_com.create_start(self.canvas,45,580,1)
                user_com.username['text'] = 'computer'
        #create button for return the menu
        self.return_menu = Button(self.initfaceR, text = 'return menu', command = lambda: deletein(self.initface,self.master2,self.initfaceR))
        self.return_menu.pack(side = LEFT,pady = 40)

    
    ######get the list of player's name
    def on_click(self):
        for i in range(len(userlist)):
            username_sum.append( self.xls[i].get())
        self.root2.quit()
        self.root2.destroy()


########################create the user instance that created by instance background 
class create_user():
    def __init__(self,root,rootR,number,position):
        self.number= number
        self.root = root
        self.rootR = rootR
        self.position = position
        if self.number > 2: #if the user number is greater than 2
            self.row = 0; self.column = 1 #allocate the position of player's name and dice 
        else:
            self.row = 1; self.column = 0
        self.image = PhotoImage(file= pathP+str(self.number)+'/random.png')
        self.frame = Frame(self.root)
        self.frame.pack(side = self.position)
        self.rolling = Button(self.frame,image = self.image,text = "user",command = self.rolling_dice)# rolling the dice, call the function rooling_dice
        self.rolling.grid(row = self.row, column = self.column)
        self.username = Label(self.frame,text = 'username')
        self.username.grid(row = 0, column = 0)
        self.axis = axis(self.number)
        self.sum = 0
        self.list_orig = [25,34,47,65,87,91,99,3,6,20,36,63,68]
        self.list_final = [5,1,19,52,57,61,69,51,27,70,55,95,98]

    #####Simulate the process of rolling dice  
    def rolling_dice(self):
        self.number_random = randint(0,5)
        self.strNum = str(self.number)
        self.list_dice = [pathP+self.strNum+'/dice1.png',pathP+self.strNum+'/dice2.png',pathP+self.strNum+'/dice3.png',pathP+self.strNum+'/dice4.png', pathP+self.strNum+'/dice5.png',pathP+self.strNum+'/dice6.png',pathP+self.strNum+'/rolling1.png',pathP+self.strNum+'/rolling2.png',pathP+self.strNum+'/rolling3.png']
        image_dice = PhotoImage(file = self.list_dice[6])
        self.image = image_dice
        self.rolling.config(image=image_dice)
        #delay for call the function
        self.rolling.after(100,self.changeImage,7)
        self.rolling.after(200,self.changeImage,8)
        self.rolling.after(300,self.changeImage,self.number_random)
        self.play_game()
    #####change to corresponding image
    def changeImage(self,i):
        image_dice = PhotoImage(file = self.list_dice[i])
        self.image = image_dice
        self.rolling.config(image=image_dice)
    #####desplay the origin aris of plays at first
    def create_start(self,canvas,x,y,i):
        self.user_image= [PhotoImage(file= pathU+'user1.png'),PhotoImage(file= pathU+'user2.png'),PhotoImage(file= pathU+'user3.png'),PhotoImage(file= pathU+'user4.png')]
        self.canvas = canvas
        self.block = self.canvas.create_image(x,y,image = self.user_image[i])
        self.canvas.update()
    #####start to play game    
    def play_game(self):
        self.timer = 1 #counter
        if (self.sum+self.number_random+1) <=  100:  #if it is within 100. if true, move forward
            c = Timer(0.8,self.change_position) #make the player step by step,and delay to call the function change_position
            c.start()
            t = Timer(0.5*(self.number_random+1)+0.8,self.snake_and_ladder) #if player encounter snakes or ladders
            t.start()
            if (self.sum+self.number_random+1) == 100: #if it reaches 100, the TIMER in the front is run later
                i1 = Timer(0.5*(self.number_random+1)+1,self.is_100)  
                i1.start() 
            else:
                if self.number_random == 5:#if the player roll six, they will roll an anthor dice.
                    r = Timer(0.5*(self.number_random+1)+1.3,self.rolling_dice)
                    r.start()
                else: #Prompt the next player to roll dice
                    n = Timer(0.5*(self.number_random+1)+1.3,self.next)
                    n.start()
        else: #don't move when greater than 100, and don't change the sum
            if self.number_random == 5:#if the player roll six, they will roll an anthor dice.
                r = Timer(0.5,self.rolling_dice)
                r.start()
            else:#Prompt the next player to roll dice
                n = Timer(0.5,self.next)
                n.start()
    #####when player reach the position of 100
    def is_100(self):
        if len(userlist) == 1 and self.number == 2:
            msg = messagebox.askyesno( message = "you lose\nare you want to try again")
        else:    
            msg = messagebox.askyesno( message = self.username['text']+" win\nare you want to try again")
        if msg: #return Menu
            deletein(self.root,root,self.rootR)
        else:
            f = messagebox.askyesno( message = "are you want to quit this game")
            if f:#quit the game
                root.quit()
            else:
                return
    #####change the position of player after rolling the dice
    def change_position(self):
        self.sum +=1
        listx = (self.sum-1) % 10
        listy = (self.sum-1) / 10
        self.canvas.delete(self.block)
        self.block = self.canvas.create_image(self.axis.listx[int(listx)],self.axis.listy[int(listy)],image = self.user_image[self.number-1])
        self.canvas.update()
        if self.timer == self.number_random+1: #whether the player have taken the number of steps the dice has rolled
            return 
        else:
            self.timer+=1
            p = Timer(0.5,self.change_position)
            p.start()
            
    #####when encounter the obstacles, change the sum and position 
    def snake_and_ladder(self):
        for i in range(len(self.list_orig)):
            if self.sum == self.list_orig[i]: #when the player encounter the snakes and ladders
                self.sum = self.list_final[i] #reach the final position after encountering the obstacles
                listx = (self.sum-1) % 10  #substract 1, because the list starts from 0
                listy = (self.sum-1) / 10
                #change the current position
                self.canvas.delete(self.block) 
                self.block = self.canvas.create_image(self.axis.listx[int(listx)],self.axis.listy[int(listy)],image = self.user_image[self.number-1])
                self.canvas.update()
    #####When the current player finishes rolling the dice
    def next(self): 
        if self.number == len(userlist) or len(userlist) == 1:#whether the last player is computer
            if self.number == 1:
                user_com.rolling_dice()
            else:
                messagebox.showinfo("rolling your dice", "please, "+username_sum[0]+" roll your dice")
                image_dice = PhotoImage(file = pathP+"1/random.png")
                self.image_next = image_dice
                userlist['user1'].rolling.config(image=image_dice)
        else :
            messagebox.showinfo("rolling your dice", "please, "+username_sum[self.number]+" roll your dice")
            image_dice = PhotoImage(file = pathP+str(self.number+1)+"/random.png")
            self.image_next = image_dice
            userlist['user'+str(self.number+1)].rolling.config(image=image_dice)
        

########################1-100 coordinates on the background image
class axis(): 
    def __init__(self,number):
        self.number = number
        self.listx = []
        self.listy = []
        for i in range(10):#The abscissa(X-aris), each player stagger a bit
            self.listx.append(125+60*i+(number-1)*4)
        
        self.listy = [575,515,455,395,335,275,215,155,95,35] #the ordinate(Y-aris)
        

########################create a computer player Inherit the instance user's method and parameters
class create_computer(create_user):
    def __init__(self,root,rootR,number,position):
        super(create_computer,self).__init__(root,rootR,number,position)#inherit create_user's parameter, the order of paramter should be the same as above
        #override the button of computer's rolling
        self.rolling = Label(self.frame, image = self.image)
        self.rolling.grid(row = self.row, column = self.column)

        
########################mention the rule of the game   
class Menu():
    def __init__(self,master,master2):
        global num1,num2,num3,num4
        num1=PhotoImage(file = pathP+str(1)+'/dice1.png')
        num2=PhotoImage(file = pathP+str(2)+'/dice2.png')
        num3=PhotoImage(file = pathP+str(3)+'/dice3.png')
        num4=PhotoImage(file = pathP+str(4)+'/dice4.png')
        #rules of the game
        Label(master,text='Welcome snakes and ladders\nThe game is going to start!\n', font=('Arial', 40)).pack(pady = 30)
        Label(master,text='Rolling a 6 will give the players an extra dice\nLADDER : YOU GO UP\nSNAKE: YOU GO DOWN', font=('Arial', 30)).pack()
        Label(master,text='Are you ready? please select number of players', font=('Arial', 30)).pack(pady = 30)
        #the button of choosing player's number
        self.button = Button(master,image = num1,command=lambda: background(1,master,master2)).pack(side = LEFT,padx = 40,pady = 40)
        self.button = Button(master,image = num2,command=lambda: background(2,master,master2)).pack(side = LEFT,padx = 40,pady = 40)
        self.button = Button(master,image = num3,command=lambda: background(3,master,master2)).pack(side = LEFT,padx = 40,pady = 40)
        self.button = Button(master,image = num4,command=lambda: background(4,master,master2)).pack(side = LEFT,padx = 40,pady = 40)
        self.button = Button(master,text = 'quit this game',command=quit_game).pack(side = BOTTOM)


########################close the GUI page   
def quit_game():
    root.quit()

########################delete the frame of game
def deletein(root,master2,rootR):
    root.destroy()
    rootR.destroy()#destroy the game's page
    global initface
    initface = Frame(master2)#create a new page for instance menu
    initface.pack()
    Menu(initface,master2)

root = Tk()
root.geometry('1150x800')
root.title('snake and ladder')
initface = Frame(root)
initface.pack()
pathP = 'picture/dice/user'
pathU = 'picture/user/'
menu = Menu(initface,root)
root.mainloop()



    

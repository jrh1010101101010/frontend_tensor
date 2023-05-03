
# my first experiments with mnist!

My first initial tests with tensorflow are here (in the front end) and in the backend are ([here](https://github.com/jrh1010101101010/backend_mnist)).

# Links
trello board => https://trello.com/invite/b/lgiVo13K/ATTI3b34a62a7d7779838e365692c889e908447F9EBC/ga-final-project 
wireframes => https://whimsical.com/8jN8aSMRyLoneLubEhiCGv

# The first experiments
the first experiments with tensor flow come from the numbers component. Its a simple experiment with tensorflow that mainly come from experiments with simple data, creating correlations with that data and then training the data based off those correlations. The data here has no relationship with anything in the real world. Just a simple linear graph thats learning the relationship between the two numbers and then learning the linear relationship they share with each other. This relationship is shown in a chart to be better visual the relationship between the two numbers that the web browser is learning everytime the page is loaded

# the mnist dataset
The second component is using tensor flow to learn the relationship between the two sets of data. The first step was to create a model in python to test. This part was fairly straight forward. The model was then refined, made to learn the learn the relationship more and put more paramters to learn the relationship more.

The second part was making the frontend and backend. Lets start with the front end. A feature i didnt know existed came in the form of a canvas. The canvas allows the user to send a 'hand drawn' number. This is then stored and can be send in the form of a base64 link that is send to the server. When the server has finished processing the number it then sends back the drawing based off the canvas. 

On the server side. The single route then takes the data, decodes that data and creates an array of values from 0 (meaning black) and 255 (meaning white). Based off this array the system calculates what it thinks is the most likely chance of the number it is. 
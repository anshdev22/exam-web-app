const questionsData = {
  "Quantitative Aptitude": [
    {
      question: "What is 12% of 150?",
      options: ["18", "12", "20", "15"],
      correct: "18"
    },
    {
      question: "Simplify: (3 + 5) × 2",
      options: ["10", "12", "18", "16"],
      correct: "16"
    },
    {
      question: "Find the next number in the sequence: 2, 4, 8, 16, ?",
      options: ["20", "30", "24", "32"],
      correct: "32"
    },
    {
      question: "What is the square root of 81?",
      options: ["9", "8", "7", "6"],
      correct: "9"
    },
    {
      question: "Solve: 5x = 20",
      options: ["2", "5", "4", "6"],
      correct: "4"
    },
    {
      question: "What is 15% of 200?",
      options: ["30", "25", "20", "35"],
      correct: "30"
    },
    {
      question: "Which is a prime number?",
      options: ["4", "6", "8", "7"],
      correct: "7"
    },
    {
      question: "Find the LCM of 4 and 6",
      options: ["10", "8", "12", "6"],
      correct: "12"
    },
    {
      question: "What is 25 × 4?",
      options: ["50", "100", "75", "90"],
      correct: "100"
    },
    {
      question: "Solve: 12 + 15 - 7",
      options: ["20", "22", "18", "19"],
      correct: "20"
    }
  ],
  "Logical Reasoning": [
    {
      question: "If A = B and B = C, then A = ?",
      options: ["C", "D", "A", "B"],
      correct: "C"
    },
    {
      question: "Which shape has 4 equal sides?",
      options: ["Rectangle", "Triangle", "Square", "Circle"],
      correct: "Square"
    },
    {
      question: "Find the odd one out: Cat, Dog, Cow, Car",
      options: ["Cat", "Dog", "Cow", "Car"],
      correct: "Car"
    },
    {
      question: "Which number is even?",
      options: ["3", "7", "5", "4"],
      correct: "4"
    },
    {
      question: "Which comes next? A, B, C, ?",
      options: ["F", "G", "E", "D"],
      correct: "D"
    },
    {
      question: "Which direction is opposite to East?",
      options: ["North", "West", "South", "South-East"],
      correct: "West"
    },
    {
      question: "What is the mirror image of 123?",
      options: ["321", "132", "213", "231"],
      correct: "321"
    },
    {
      question: "Identify the pattern: 1, 3, 5, 7, ?",
      options: ["9", "8", "6", "10"],
      correct: "9"
    },
    {
      question: "Which is the different one: Apple, Mango, Carrot, Banana",
      options: ["Apple", "Mango", "Carrot", "Banana"],
      correct: "Carrot"
    },
    {
      question: "Which does not belong: Circle, Triangle, Square, Apple",
      options: ["Circle", "Triangle", "Square", "Apple"],
      correct: "Apple"
    }
  ],
  "General Knowledge": [
    {
      question: "Who is the Prime Minister of India?",
      options: ["Narendra Modi", "Rahul Gandhi", "Amit Shah", "Arvind Kejriwal"],
      correct: "Narendra Modi"
    },
    {
      question: "Capital of France?",
      options: ["Berlin", "Paris", "London", "Madrid"],
      correct: "Paris"
    },
    {
      question: "Which is the largest ocean?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      correct: "Pacific"
    },
    {
      question: "Taj Mahal is located in?",
      options: ["Agra", "Delhi", "Mumbai", "Kolkata"],
      correct: "Agra"
    },
    {
      question: "Fastest land animal?",
      options: ["Lion", "Horse", "Tiger", "Cheetah"],
      correct: "Cheetah"
    },
    {
      question: "How many states in India?",
      options: ["27", "28", "29", "26"],
      correct: "28"
    },
    {
      question: "Sun rises in the?",
      options: ["North", "West", "East", "South"],
      correct: "East"
    },
    {
      question: "National animal of India?",
      options: ["Lion", "Tiger", "Elephant", "Peacock"],
      correct: "Tiger"
    },
    {
      question: "Currency of Japan?",
      options: ["Rupee", "Yen", "Dollar", "Won"],
      correct: "Yen"
    },
    {
      question: "Where is Eiffel Tower?",
      options: ["Rome", "Berlin", "London", "Paris"],
      correct: "Paris"
    }
  ],
  "English Language": [
    {
      question: "Choose the correct spelling:",
      options: ["Recieve", "Receive", "Receeve", "Receve"],
      correct: "Receive"
    },
    {
      question: "Synonym of Happy?",
      options: ["Joyful", "Angry", "Sad", "Tired"],
      correct: "Joyful"
    },
    {
      question: "Antonym of Cold?",
      options: ["Cool", "Chilly", "Freeze", "Hot"],
      correct: "Hot"
    },
    {
      question: "Fill in the blank: She ____ to school.",
      options: ["go", "gone", "goes", "going"],
      correct: "goes"
    },
    {
      question: "Choose the correct article: ___ apple",
      options: ["An", "A", "The", "None"],
      correct: "An"
    },
    {
      question: "Identify the noun in: The boy ran fast",
      options: ["ran", "boy", "fast", "the"],
      correct: "boy"
    },
    {
      question: "What is the past tense of run?",
      options: ["runs", "runned", "running", "ran"],
      correct: "ran"
    },
    {
      question: "What is the plural of child?",
      options: ["childs", "children", "childes", "childen"],
      correct: "children"
    },
    {
      question: "Which word is an adjective?",
      options: ["apple", "quickly", "beautiful", "run"],
      correct: "beautiful"
    },
    {
      question: "Identify the verb: They dance well",
      options: ["They", "dance", "well", "none"],
      correct: "dance"
    }
  ],
 
  "Coding": [
  {
    question: `<pre><code>count = 0
FOR i = 1 TO 4
  FOR j = 1 TO i
    count = count + 1
  END FOR
END FOR</code></pre>
What is the final value of count?`,
    options: ["6", "8", "10", "12"],
    correct: "10"
  },
  {
    question: `<pre><code>x = 3
y = 2
IF x &gt; y THEN
  IF y &gt; 0 THEN
    x = x + y
  ELSE
    x = x - y
  END IF
END IF
PRINT x</code></pre>
What is printed?`,
    options: ["1", "3", "5", "6"],
    correct: "5"
  },
  {
    question: `<pre><code>n = 5
fact = 1
FOR i = 1 TO n
  fact = fact * i
END FOR
PRINT fact</code></pre>
What is the output?`,
    options: ["15", "60", "120", "720"],
    correct: "120"
  },
  {
    question: `<pre><code>sum = 0
FOR i = 1 TO 5
  IF i MOD 2 = 0 THEN
    sum = sum + i
  END IF
END FOR
PRINT sum</code></pre>
What is printed?`,
    options: ["6", "8", "10", "12"],
    correct: "6"
  },
  {
    question: `<pre><code>FUNCTION recur(n)
  IF n = 0 THEN
    RETURN 0
  ELSE
    RETURN n + recur(n - 1)
  END IF
END FUNCTION
PRINT recur(4)</code></pre>
What is printed?`,
    options: ["4", "6", "8", "10"],
    correct: "10"
  }
]


  , "Essay": [
    {
      question: "Write an essay on the importance of discipline in student life.",
      options: [],
      correct: null
    }
  ]
};

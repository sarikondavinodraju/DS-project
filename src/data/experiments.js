import modules from './modules'
const stages = [
  { id: 'A', title: 'Data Collection', aim: (d) => `To load the ${d} dataset into Python and inspect its structure.`, steps: ['Import the required libraries', 'Load the dataset from file', 'Inspect the first rows and the shape', 'Check column data types'], code: (d) => `import pandas as pd\n\ndf = pd.read_csv("${d}")\n\nprint(df.head())\nprint(df.shape)`, out: `   Name  Age  Score\n0  Rahul   20     85\n1   Anu    21     91\n2  John    20     88\n3  Meera   22     79\n4  Ravi    21     94\n(150, 3)` },
  { id: 'B', title: 'Data Cleaning', aim: () => 'To detect and fix missing values and duplicate records.', steps: ['Count missing values per column', 'Remove duplicate rows', 'Fill missing numbers with the median', 'Confirm the data is clean'], code: () => `df = df.drop_duplicates()\ndf = df.fillna(df.median(numeric_only=True))\n\nprint(df.isnull().sum())`, out: `Name     0\nAge      0\nScore    0\ndtype: int64` },
  { id: 'C', title: 'Exploratory Data Analysis', aim: () => 'To summarise the data and study relationships between variables.', steps: ['Generate descriptive statistics', 'Check the correlation matrix', 'Note unusual values'], code: () => `print(df.describe())\nprint(df.corr(numeric_only=True))`, out: `             Age      Score\ncount  150.00000  150.00000\nmean    20.90000   86.40000\nstd      1.10000    6.20000\nmin     19.00000   70.00000\nmax     23.00000   98.00000` },
  { id: 'D', title: 'Data Visualization', aim: () => 'To visualise distributions and relationships with charts.', steps: ['Import Matplotlib', 'Plot histograms of numeric columns', 'Label the axes', 'Display the figure'], code: () => `import matplotlib.pyplot as plt\n\ndf.hist(figsize=(8, 5))\nplt.tight_layout()\nplt.show()`, out: 'A figure with one histogram per numeric column is displayed.' },
  { id: 'E', title: 'Model Building', aim: () => 'To train a simple model on the prepared data.', steps: ['Select features and target', 'Split into train and test sets', 'Fit the model', 'Predict on the test set'], code: () => `from sklearn.model_selection import train_test_split\nfrom sklearn.linear_model import LinearRegression\n\nX = df[["Age"]]\ny = df["Score"]\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)\n\nmodel = LinearRegression().fit(X_train, y_train)\nprint("Coefficient:", model.coef_)`, out: 'Coefficient: [0.84]' },
  { id: 'F', title: 'Result Analysis', aim: () => 'To evaluate the results and draw conclusions.', steps: ['Predict on the test set', 'Compute evaluation metrics', 'Interpret the results'], code: () => `from sklearn.metrics import r2_score\n\npred = model.predict(X_test)\nprint("R2 score:", round(r2_score(y_test, pred), 3))`, out: 'R2 score: 0.742' }
]
const arch = ['Dataset', 'Data Collection', 'Preprocessing', 'Data Cleaning', 'Exploratory Analysis', 'Visualization', 'Model / Analysis', 'Evaluation', 'Final Output']
const archInfo = ['Raw data from files, APIs or databases.', 'Loading data into Python.', 'Formatting types and columns.', 'Fixing missing and duplicate values.', 'Statistics and patterns.', 'Charts for insight.', 'Applying the technique.', 'Measuring quality.', 'Conclusions and report.']
// [title, moduleId, difficulty, tools, description, dataset]
const raw = [
  ['Python Data Analysis', 1, 'Beginner', ['Python', 'Pandas', 'NumPy'], 'Learn Python techniques for loading, manipulating, analyzing and visualizing real-world datasets with confidence.', 'students.csv'],
  ['NumPy Array Operations', 1, 'Beginner', ['Python', 'NumPy'], 'Create, reshape and combine NumPy arrays, then apply fast vectorised mathematical operations on them.', 'numbers.csv'],
  ['Data Manipulation using Pandas', 1, 'Beginner', ['Python', 'Pandas'], 'Filter, sort, group and merge DataFrames to answer questions hidden inside tabular datasets.', 'sales.csv'],
  ['Data Collection and Web Scraping', 2, 'Beginner', ['Python', 'Pandas'], 'Collect data from CSV files, JSON APIs and web pages and combine it into one dataset.', 'products.csv'],
  ['Data Cleaning and Preprocessing', 2, 'Intermediate', ['Python', 'Pandas', 'NumPy'], 'Detect missing values, duplicates and wrong types, then prepare messy data for reliable analysis.', 'customers.csv'],
  ['Feature Engineering', 2, 'Intermediate', ['Python', 'Pandas', 'Scikit-learn'], 'Encode categories, scale numbers and create new features that improve model performance and insight.', 'housing.csv'],
  ['Exploratory Data Analysis', 3, 'Intermediate', ['Python', 'Pandas', 'Seaborn'], 'Summarise distributions, spot patterns and ask better questions before building any model.', 'titanic.csv'],
  ['Statistical Analysis and Hypothesis Testing', 3, 'Intermediate', ['Python', 'SciPy', 'Statistics'], 'Apply t-tests and chi-square tests to decide whether observed differences are statistically meaningful.', 'survey.csv'],
  ['Correlation and Outlier Detection', 3, 'Intermediate', ['Python', 'Pandas', 'Statistics'], 'Measure relationships between variables and detect unusual values using z-scores and the IQR method.', 'sensors.csv'],
  ['Data Visualization with Matplotlib', 4, 'Beginner', ['Python', 'Matplotlib'], 'Build line, bar, scatter and histogram plots and customise them for clear communication.', 'weather.csv'],
  ['Statistical Plots with Seaborn', 4, 'Intermediate', ['Python', 'Seaborn', 'Pandas'], 'Create heatmaps, box plots and pair plots that reveal statistical structure in your data.', 'iris.csv'],
  ['Interactive Dashboards with Plotly', 4, 'Intermediate', ['Python', 'Plotly', 'Pandas'], 'Design interactive charts with hover, zoom and filters, and combine them into a dashboard.', 'covid.csv'],
  ['Regression Modelling with Scikit-learn', 5, 'Intermediate', ['Python', 'Scikit-learn', 'Machine Learning'], 'Train linear regression models, predict continuous values and measure error with standard metrics.', 'housing.csv'],
  ['Classification and Model Evaluation', 5, 'Advanced', ['Python', 'Scikit-learn', 'XGBoost', 'Machine Learning'], 'Build classifiers and evaluate them with confusion matrices, precision, recall and cross-validation.', 'diabetes.csv'],
  ['Neural Networks with Keras', 5, 'Advanced', ['Python', 'Keras', 'TensorFlow', 'Deep Learning'], 'Design, train and evaluate a feed-forward neural network on a real classification problem.', 'mnist.csv']
]
const experiments = raw.map(([title, moduleId, difficulty, tools, description, ds], i) => ({
  id: i + 1, number: String(i + 1).padStart(2, '0'), title, description, moduleId,
  module: modules.find((m) => m.id === moduleId).title, difficulty, tools,
  overview: { summary: `${description} You will work through six guided stages, from collecting the data to analysing the final results, running code at every step.`, architecture: arch, archInfo },
  subExperiments: stages.map((s) => ({ id: s.id, title: s.title, aim: s.aim(ds), procedure: s.steps, code: s.code(ds), output: s.out }))
}))
export default experiments

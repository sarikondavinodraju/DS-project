const names = [
  ['Introduction to Python', 'NumPy Basics', 'Pandas Fundamentals', 'Python Practice Sheet', 'Jupyter Quick Guide'],
  ['Data Sources and Formats', 'Web Scraping Notes', 'Data Cleaning Handbook', 'Handling Missing Data', 'Feature Engineering Notes'],
  ['EDA Playbook', 'Descriptive Statistics', 'Correlation and Outliers', 'Hypothesis Testing Notes', 'Probability Refresher'],
  ['Data Visualization', 'Matplotlib Cheatsheet', 'Seaborn Guide', 'Plotly Interactive Charts', 'Dashboard Design Notes'],
  ['Machine Learning Notes', 'Regression Models', 'Classification Models', 'Model Evaluation', 'Neural Network Basics']
]
// Put real files in public/pdfs/<id>.pdf  (for example public/pdfs/m1-1.pdf)
const materials = names.flatMap((list, m) => list.map((t, i) => ({
  id: `m${m + 1}-${i + 1}`, moduleId: m + 1, title: `${t}.pdf`, name: t, url: `/pdfs/m${m + 1}-${i + 1}.pdf`
})))
export default materials

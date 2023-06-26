import nltk
nltk.download('stopwords')

from pyresparser import ResumeParser
import os

skills = 'skills.pdf'
resume = 'resume.pdf'

data = ResumeParser(skills).get_extracted_data()
data2 = ResumeParser(resume).get_extracted_data()

required_skills = str(data['skills'])
candidate_skills = str(data2['skills'])


content = [required_skills,candidate_skills]

from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer()
matrix = cv.fit_transform(content)

from sklearn.metrics.pairwise import cosine_similarity
similarity_matrix = cosine_similarity(matrix)

#print(similarity_matrix)
print("Matching to job_criteria",similarity_matrix[1][0]*100)
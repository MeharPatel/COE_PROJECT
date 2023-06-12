import nltk
nltk.download('stopwords')

from pyresparser import ResumeParser
import os
import nltk

skills = 'skills.pdf'
resume = 'Jeet.pdf'

data = ResumeParser(skills).get_extracted_data()
data2 = ResumeParser(resume).get_extracted_data()

required_skills = str(data['skills'])
candidate_skills = str(data2['skills'])
candiadte_name = str(data2['name'])
candiadte_number = str(data2['mobile_number'])
candidate_email = str(data2['email'])

content = [required_skills,candidate_skills]

from sklearn.feature_extraction.text import CountVectorizer
cv = CountVectorizer()
matrix = cv.fit_transform(content)

from sklearn.metrics.pairwise import cosine_similarity
similarity_matrix = cosine_similarity(matrix)

#print(similarity_matrix)
print("Matching to job_criteria",similarity_matrix[1][0]*100)
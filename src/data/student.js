// Replace the placeholders. Nothing else in the app hard-codes personal details.
const student = {
  studentId: 'YOUR_STUDENT_ID',
  name: 'Vinod Raju',
  rollNumber: '24102A030109',
  branch: 'Data Science',
  section: 'DS-2',
  // Photo shown on the ID card (header avatar + profile card).
  // Drop your own image in "public/" and point this at it, e.g. '/student-photo.jpg'.
  photo: '/student-photo.svg',
  faculty: { name: 'S Bosu Babu', designation: 'FACULTY DESIGNATION' },
  github: 'YOUR_GITHUB_URL',
  linkedin: 'YOUR_LINKEDIN_URL'
}
export default student

import { getFirestore, Firestore, collection, query, addDoc, updateDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';
import firebaseApp from '../firebase';

class FirebaseApiService {
  private _db: Firestore;

  constructor() {
    this._db = getFirestore(firebaseApp);
  }

  public async getAllCourses() {
    const q = query(collection(this._db, 'Courses'));
    const querySnapshot = await getDocs(q);
    let courses: any[] = [];
    querySnapshot.forEach(doc => {
      courses.push({ id: doc.id, data: doc.data() });
    });

    return courses;
  }

  public async getSubjectsByCourse(specificCourse: string) {
    const q = query(collection(this._db, `Courses/${specificCourse}/Subjects`));
    const querySnapshot = await getDocs(q);
    let subjects: any[] = [];
    querySnapshot.forEach(doc => {
      subjects.push({ id: doc.id, data: doc.data() });
    });
    return subjects;
  }

  public async getTrainingsByCourse(specificCourse: string, specificSubject: string) {
    const q = query(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings`));
    const querySnapshot = await getDocs(q);
    let trainings: any[] = [];
    querySnapshot.forEach(doc => {
      trainings.push({ id: doc.id, data: doc.data() });
    });
    return trainings;
  }

  public async getTestsByCourse(specificCourse: string, specificSubject: string) {
    const q = query(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Tests`));
    const querySnapshot = await getDocs(q);
    let tests: any[] = [];
    querySnapshot.forEach(doc => {
      tests.push({ id: doc.id, data: doc.data() });
    });
    return tests;
  }

  public async getLessonsBySubject(specificCourse: string, specificSubject: string) {
    const q = query(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Lessons`));
    const querySnapshot = await getDocs(q);
    let lessons: any[] = [];
    querySnapshot.forEach(doc => {
      lessons.push({ id: doc.id, data: doc.data() });
    });
    return lessons;
  }

  public async getQuestionsByTraining(specificCourse: string, specificSubject: string, specificTraining: string) {
    const q = query(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings/${specificTraining}/Questions`));
    const querySnapshot = await getDocs(q);
    let questions: any[] = [];
    querySnapshot.forEach(doc => {
      questions.push({ id: doc.id, data: doc.data() });
    });
    return questions.sort((item1, item2) => item2.trainingNumber - item1.trainingNumber);
  }

  public async getQuestionsByTest(specificCourse: string, specificSubject: string, specificTest: string) {
    const q = query(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Tests/${specificTest}/Questions`));
    const querySnapshot = await getDocs(q);
    let questions: any[] = [];
    querySnapshot.forEach(doc => {
      questions.push({ id: doc.id, data: doc.data() });
    });
    return questions.sort((item1, item2) => item2.trainingNumber - item1.trainingNumber);
  }

  public async addSubjectandLesson(specificCourse: string, subjectName: string, lessonData: any) {
    const subjectDocRef = await addDoc(collection(this._db, `Courses/${specificCourse}/Subjects`), {
      image: '',
      subjectName,
    });
    console.log('Document written with ID: ', subjectDocRef.id);
    const LessonDocRef = await addDoc(collection(this._db, `Courses/${specificCourse}/Subjects/${subjectDocRef.id}/Lessons`), lessonData);
    console.log('Document written with ID: ', LessonDocRef.id);
  }

  public async addLesson(specificCourse: string, specificSubject: string, lessonData: any) {
    const LessonDocRef = await addDoc(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Lessons`), lessonData);
    console.log('Document written with ID: ', LessonDocRef.id);
  }

  public async updateLesson(specificCourse: string, specificSubject: string, specificLesson: string, lessonData: any) {
    const lessonDocRef = doc(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Lessons`, `${specificLesson}`);
    await updateDoc(lessonDocRef, lessonData);
  }

  public async deleteLesson(specificCourse: string, specificSubject: string, specificLesson: string) {
    const lessonDocRef = doc(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Lessons`, `${specificLesson}`);
    await deleteDoc(lessonDocRef);
  }

  public async createTraining(specificCourse: string, specificSubject: string, trainingData: any, questionData: any) {
    const trainingDocRef = await addDoc(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings`), trainingData);
    console.log('Document written with ID: ', trainingDocRef.id);
    const questionDocRef = await addDoc(
      collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings/${trainingDocRef.id}/Questions`),
      questionData,
    );
    console.log('Document written with ID: ', questionDocRef.id);
  }

  public async addTraining(specificCourse: string, specificSubject: string, specificTraining: String, trainingData: any, questionData: any) {
    const trainingDocRef = doc(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings`, `${specificTraining}`);
    await updateDoc(trainingDocRef, trainingData);
    const questionDocRef = await addDoc(
      collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings/${trainingDocRef.id}/Questions`),
      questionData,
    );
    console.log('Document written with ID: ', questionDocRef.id);
  }

  public async updateTraining(
    specificCourse: string,
    specificSubject: string,
    specificTraining: string,
    specificQuestion: string,
    trainingData: any,
    questionData: any,
  ) {
    const trainingDocRef = doc(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings`, `${specificTraining}`);
    await updateDoc(trainingDocRef, trainingData);
    const questionDocRef = doc(
      this._db,
      `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings/${specificTraining}/Questions`,
      `${specificQuestion}`,
    );
    await updateDoc(questionDocRef, questionData);
  }

  public async deleteQuestionByTraining(specificCourse: string, specificSubject: string, specificTraining: string, specificQuestion: string) {
    const questionDocRef = doc(
      this._db,
      `Courses/${specificCourse}/Subjects/${specificSubject}/Trainings/${specificTraining}/Questions`,
      `${specificQuestion}`,
    );
    await deleteDoc(questionDocRef);
  }

  public async createTest(specificCourse: string, specificSubject: string, testData: any, questionData: any) {
    const testDocRef = await addDoc(collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Tests`), testData);
    console.log('Document written with ID: ', testDocRef.id);
    const questionDocRef = await addDoc(
      collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Tests/${testDocRef.id}/Questions`),
      questionData,
    );
    console.log('Document written with ID: ', questionDocRef.id);
  }

  public async addTest(specificCourse: string, specificSubject: string, specificTest: String, testData: any, questionData: any) {
    const testDocRef = doc(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Tests`, `${specificTest}`);
    await updateDoc(testDocRef, testData);
    const questionDocRef = await addDoc(
      collection(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Tests/${testDocRef.id}/Questions`),
      questionData,
    );
    console.log('Document written with ID: ', questionDocRef.id);
  }

  public async updateTest(
    specificCourse: string,
    specificSubject: string,
    specificTest: string,
    specificQuestion: string,
    testData: any,
    questionData: any,
  ) {
    const testDocRef = doc(this._db, `Courses/${specificCourse}/Subjects/${specificSubject}/Tests`, `${specificTest}`);
    await updateDoc(testDocRef, testData);
    const questionDocRef = doc(
      this._db,
      `Courses/${specificCourse}/Subjects/${specificSubject}/Tests/${specificTest}/Questions`,
      `${specificQuestion}`,
    );
    await updateDoc(questionDocRef, questionData);
  }

  public async deleteQuestionByTest(specificCourse: string, specificSubject: string, specificTest: string, specificQuestion: string) {
    const questionDocRef = doc(
      this._db,
      `Courses/${specificCourse}/Subjects/${specificSubject}/Tests/${specificTest}/Questions`,
      `${specificQuestion}`,
    );
    await deleteDoc(questionDocRef);
  }
}

export default FirebaseApiService;

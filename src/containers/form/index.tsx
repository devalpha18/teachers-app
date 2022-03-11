import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { toast } from 'react-toastify';
import { Timestamp } from 'firebase/firestore';

import { FormGroupV, FormGroupH } from '../../components/form-group';
import FormLabel from '../../components/form-label';
import Switch from '../../components/switch';
import Select from '../../components/select';
import Tab from '../../components/tab';
import Input from '../../components/input';
import TextArea from '../../components/textarea';
import DragDropFile from '../../components/drag-drop-file';
import Button from '../../components/button';
import Radio from '../../components/radio';
import Divider from '../../components/divider';

import FirebaseApiService from '../../services/firebase-api-service';
import isEmpty from '../../validation/is-empty';

const unitTypes: string[] = ['Unidad existente', 'Nueva unidad'];
const contentTypes: string[] = ['Lección', 'Entrenamiento', 'Prueba'];
const sectionTypes: string[] = ['Texto', 'Imagen', 'Video'];
const trainingTypes: string[] = ['Agregar', 'Crear'];
const testTypes: string[] = ['Agregar', 'Crear'];

const Form: React.FC = () => {
  const firebaseApiService = new FirebaseApiService();
  const [allCourses, setAllCourses] = useState<any[]>([]);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [courses, setCourses] = useState<string[]>([]);
  const [branches, setBranches] = useState<string[]>([]);
  const [units, setUnits] = useState<string[]>([]);
  const [entrenamientos, setEntrenamientos] = useState<any[]>([]);
  const [trainings, setTrainings] = useState<string[]>([]);
  const [pruebas, setPruebas] = useState<any[]>([]);
  const [tests, setTests] = useState<string[]>([]);
  const [lessonIDandTitles, setLessonIDandTitles] = useState<string[]>([]);
  const [lessons, setLessons] = useState<any[]>([]);
  const [trainingQuestions, setTrainingQuestions] = useState<any[]>([]);
  const [trainingNumbers, setTrainingNumbers] = useState<number[]>([]);
  const [testQuestions, setTestQuestions] = useState<any[]>([]);
  const [testNumbers, setTestNumbers] = useState<number[]>([]);
  /*---------------  contentTypeIndex = * ------------------- */
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [courseIndex, setCourseIndex] = useState<number>(0);
  const [branchIndex, setBranchIndex] = useState<number>(0);
  const [unitTypeIndex, setUnitTypeIndex] = useState<number>(0);
  const [unitIndex, setUnitIndex] = useState<number>(0);
  const [newUnit, setNewUnit] = useState<string>('');
  const [contentTypeIndex, setContentTypeIndex] = useState<number>(0);
  const [advanceXP, setAdvanceXP] = useState<number>(0);

  /*---------------  contentTypeIndex = 0  ------------------- */
  const [lessonID, setLessonID] = useState<number>(1);
  const [lessonTitle, setLessonTitle] = useState<string>('');
  const [lessonIDandTitleIndex, setLessonIDandTitleIndex] = useState<number>(0);
  const [firstSectionTypeIndex, setFirstSectionTypeIndex] = useState<number>(0);
  const [firstSectionText, setFirstSectionText] = useState<string>('');
  const [firstSectionFile, setFirstSectionFile] = useState<File | null>(null);
  const [secondSectionTypeIndex, setSecondSectionTypeIndex] = useState<number>(0);
  const [secondSectionText, setSecondSectionText] = useState<string>('');
  const [secondSectionFile, setSecondSectionFile] = useState<File | null>(null);
  const [thirdSectionTypeIndex, setThirdSectionTypeIndex] = useState<number>(0);
  const [thirdSectionText, setThirdSectionText] = useState<string>('');
  const [thirdSectionFile, setThirdSectionFile] = useState<File | null>(null);

  /*---------------  contentTypeIndex = 1 || contentTypeIndex = 2 ------------------- */
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState<any>({
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
  });
  const [isCorrectAnswer, setIsCorrectAnswer] = useState<string>('answer1');

  /*---------------  contentTypeIndex = 1 ------------------- */
  const [clue, setClue] = useState<string>('');
  const [trainingTypeIndex, setTrainingTypeIndex] = useState<number>(0);
  const [trainingIndex, setTrainingIndex] = useState<number>(0);
  const [trainingNumber, setTrainingNumber] = useState<number>(1);
  const [trainingID, setTrainingID] = useState<number>(1);
  const [trainingTitle, setTrainingTitle] = useState<string>('');

  /*---------------  contentTypeIndex = 2 ------------------- */
  const [score, setScore] = useState<number>(0);
  const [testTypeIndex, setTestTypeIndex] = useState<number>(0);
  const [testIndex, setTestIndex] = useState<number>(0);
  const [testNumber, setTestNumber] = useState<number>(1);
  const [testOrder, setTestOrder] = useState<number>(1);
  const [testName, setTestName] = useState<string>('');

  /*---------------  contentTypeIndex = *  ------------------- */

  const handleSwitch = (switchValue: boolean) => {
    setIsEditMode(switchValue);
  };

  const handleSelectCourse = async (selectedIndex: number) => {
    setInitialState();
    setCourseIndex(selectedIndex);
    setBranchIndex(selectedIndex);

    const t_subjects = await firebaseApiService.getSubjectsByCourse(allCourses[selectedIndex].id as string);
    setSubjects(t_subjects);
    setUnits(t_subjects.map(item => item.data.subjectName));
    if (!isEmpty(t_subjects)) {
      const t_trainings = await firebaseApiService.getTrainingsByCourse(allCourses[selectedIndex].id as string, t_subjects[0].id as string);
      setEntrenamientos(t_trainings);
      setTrainings(t_trainings.map(item => item.data.title));

      const t_tests = await firebaseApiService.getTestsByCourse(allCourses[selectedIndex].id as string, t_subjects[0].id as string);
      setPruebas(t_tests);
      setTests(t_tests.map(item => item.data.title));

      const t_lessons = await firebaseApiService.getLessonsBySubject(allCourses[selectedIndex].id as string, t_subjects[0].id as string);
      setLessons(t_lessons);
      setLessonIDandTitles(t_lessons.map(item => item.data.lessonName));

      if (!isEmpty(t_lessons) && isEditMode) {
        setLessonIDandTitleIndex(0);
        setLessonData(t_lessons[0].data);
      }

      if (!isEmpty(t_trainings) && isEditMode) {
        const t_questions = await firebaseApiService.getQuestionsByTraining(
          allCourses[selectedIndex].id as string,
          t_subjects[0].id as string,
          t_trainings[0].id as string,
        );
        setTrainingQuestions(t_questions);
        setTrainingNumbers(t_questions.map(item => item.data.trainingNumber));

        if (!isEmpty(t_questions) && contentTypeIndex === 1) {
          setTrainingNumber(1);
          setTrainingIndex(0);
          setQuestionData(t_questions[0].data);
          setClue(t_questions[0].data.clue);
          setAdvanceXP(t_trainings[0].data.xp);
        }
      }

      if (!isEmpty(t_tests) && isEditMode) {
        const t_questions = await firebaseApiService.getQuestionsByTest(
          allCourses[selectedIndex].id as string,
          t_subjects[0].id as string,
          t_tests[0].id as string,
        );
        setTestQuestions(t_questions);
        setTestNumbers(t_questions.map(item => item.data.testNumber));

        if (!isEmpty(t_questions) && contentTypeIndex === 2) {
          setTestNumber(1);
          setTestIndex(0);
          setQuestionData(t_questions[0].data);
          setScore(t_tests[0].data.score);
          setAdvanceXP(t_tests[0].data.xp);
        }
      }
    }
  };

  const handleClickUnitType = (selectedIndex: number) => {
    setUnitTypeIndex(selectedIndex);
  };

  const handleSelectUnit = async (selectedIndex: number) => {
    setInitialState();
    setUnitIndex(selectedIndex);
    const t_trainings = await firebaseApiService.getTrainingsByCourse(allCourses[courseIndex].id as string, subjects[selectedIndex].id as string);
    setEntrenamientos(t_trainings);
    setTrainings(t_trainings.map(item => item.data.title));

    const t_tests = await firebaseApiService.getTestsByCourse(allCourses[courseIndex].id as string, subjects[selectedIndex].id as string);
    setPruebas(t_tests);
    setTests(t_tests.map(item => item.data.title));

    const t_lessons = await firebaseApiService.getLessonsBySubject(allCourses[courseIndex].id as string, subjects[selectedIndex].id as string);
    setLessons(t_lessons);
    setLessonIDandTitles(t_lessons.map(item => item.data.lessonName));

    if (!isEmpty(t_lessons) && isEditMode) {
      setLessonIDandTitleIndex(0);
      setLessonData(t_lessons[0].data);
    }

    if (!isEmpty(t_trainings) && isEditMode) {
      const t_questions = await firebaseApiService.getQuestionsByTraining(
        allCourses[courseIndex].id as string,
        subjects[selectedIndex].id as string,
        t_trainings[0].id as string,
      );
      setTrainingQuestions(t_questions);
      setTrainingNumbers(t_questions.map(item => item.data.trainingNumber));

      if (!isEmpty(t_questions) && contentTypeIndex === 1) {
        setTrainingNumber(1);
        setTrainingIndex(0);
        setQuestionData(t_questions[0].data);
        setClue(t_questions[0].data.clue);
        setAdvanceXP(t_trainings[0].data.xp);
      }
    }

    if (!isEmpty(t_tests) && isEditMode) {
      const t_questions = await firebaseApiService.getQuestionsByTest(
        allCourses[courseIndex].id as string,
        subjects[selectedIndex].id as string,
        t_tests[0].id as string,
      );
      setTestQuestions(t_questions);
      setTestNumbers(t_questions.map(item => item.data.testNumber));

      if (!isEmpty(t_questions) && contentTypeIndex === 2) {
        setTestNumber(1);
        setTestIndex(0);
        setQuestionData(t_questions[0].data);
        setScore(t_tests[0].data.score);
        setAdvanceXP(t_tests[0].data.xp);
      }
    }
  };

  const handleChangeNewUnit = (input: string) => {
    setNewUnit(input);
  };

  const handleClickContentType = (selectedIndex: number) => {
    setContentTypeIndex(selectedIndex);
  };

  const handleChangeAdvanceXP = (xp: number) => {
    setAdvanceXP(xp);
  };

  /*---------------  contentTypeIndex = 0  ------------------- */
  const handleChangeLessonID = (t_lessonID: number) => {
    setLessonID(t_lessonID);
  };

  const handleChangeLessonTitle = (input: string) => {
    setLessonTitle(input);
  };

  const handleSelectLessonIDandTitle = (selectedIndex: number) => {
    setInitialState();
    setLessonIDandTitleIndex(selectedIndex);

    if (!isEmpty(lessons)) {
      setLessonData(lessons[selectedIndex].data);
    }
  };

  const handleClickFirstSectionType = (selectedIndex: number) => {
    setFirstSectionTypeIndex(selectedIndex);
  };

  const handleChangeFirstSectionText = (input: string) => {
    setFirstSectionText(input);
  };

  const handleClickSecondSectionType = (selectedIndex: number) => {
    setSecondSectionTypeIndex(selectedIndex);
  };

  const handleChangeSecondSectionText = (input: string) => {
    setSecondSectionText(input);
  };

  const handleClickThirdSectionType = (selectedIndex: number) => {
    setThirdSectionTypeIndex(selectedIndex);
  };

  const handleChangeThirdSectionText = (input: string) => {
    setThirdSectionText(input);
  };

  /*---------------  contentTypeIndex = 1 ------------------- */
  const handleClickTrainingType = (selectedIndex: number) => {
    setTrainingTypeIndex(selectedIndex);
  };

  const handleSelectTraining = async (selectedIndex: number) => {
    setTrainingIndex(selectedIndex);
    if (isEditMode) {
      const t_questions = await firebaseApiService.getQuestionsByTraining(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        entrenamientos[selectedIndex].id as string,
      );
      setTrainingQuestions(t_questions);
      setTrainingNumbers(t_questions.map(item => item.data.trainingNumber));

      if (!isEmpty(t_questions) && contentTypeIndex === 1) {
        setTrainingNumber(1);
        setQuestionData(t_questions[0].data);
        setClue(t_questions[0].data.clue);
        setAdvanceXP(entrenamientos[selectedIndex].data.xp);
      }
    }
  };

  const handleSelectTest = async (selectedIndex: number) => {
    setTestIndex(selectedIndex);
    if (isEditMode) {
      const t_questions = await firebaseApiService.getQuestionsByTest(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        pruebas[selectedIndex].id as string,
      );
      setTestQuestions(t_questions);
      setTestNumbers(t_questions.map(item => item.data.testNumber));

      if (!isEmpty(t_questions) && contentTypeIndex === 2) {
        setTestNumber(1);
        setQuestionData(t_questions[0].data);
        setScore(pruebas[selectedIndex].data.score);
        setAdvanceXP(pruebas[selectedIndex].data.xp);
      }
    }
  };

  /*---------------  contentTypeIndex = 1 || contentTypeIndex = 2 ------------------- */
  const handleChangeQuestion = (input: string) => {
    setQuestion(input);
  };

  const handleChangeAnswer = (input: string, key: string) => {
    setAnswers({ ...answers, [key]: input });
  };

  /*---------------  edit mode is enabled ------------------- */
  const setLessonData = (t_lesson: any) => {
    setAdvanceXP(t_lesson.xp);
    if (t_lesson.firstSection === 'para') {
      setFirstSectionText(t_lesson.firstPara);
      setFirstSectionTypeIndex(0);
    } else if (t_lesson.firstSection === 'image') {
      setFirstSectionFile(t_lesson.firstImg);
      setFirstSectionTypeIndex(1);
    } else {
      setFirstSectionFile(t_lesson.firstVideo);
      setFirstSectionTypeIndex(2);
    }

    if (t_lesson.secondSection === 'para') {
      setSecondSectionText(t_lesson.secondPara);
      setSecondSectionTypeIndex(0);
    } else if (t_lesson.secondSection === 'image') {
      setSecondSectionFile(t_lesson.secondImg);
      setSecondSectionTypeIndex(1);
    } else {
      setSecondSectionFile(t_lesson.secondVideo);
      setSecondSectionTypeIndex(2);
    }

    if (t_lesson.thirdSection === 'para') {
      setThirdSectionText(t_lesson.thirdPara);
      setThirdSectionTypeIndex(0);
    } else if (t_lesson.thirdSection === 'image') {
      setThirdSectionFile(t_lesson.thirdImg);
      setThirdSectionTypeIndex(1);
    } else {
      setThirdSectionFile(t_lesson.thirdVideo);
      setThirdSectionTypeIndex(2);
    }
  };

  const setQuestionData = (questionData: any) => {
    setQuestion(questionData.question);
    setAnswers({
      answer1: questionData.options[0],
      answer2: questionData.options[1],
      answer3: questionData.options[2],
      answer4: questionData.options[3],
    });
    if (questionData.correctAnswer === questionData.options[0]) setIsCorrectAnswer('answer1');
    if (questionData.correctAnswer === questionData.options[1]) setIsCorrectAnswer('answer2');
    if (questionData.correctAnswer === questionData.options[2]) setIsCorrectAnswer('answer3');
    if (questionData.correctAnswer === questionData.options[3]) setIsCorrectAnswer('answer4');
  };

  useEffect(() => {
    (async () => {
      const t_allCourses = await firebaseApiService.getAllCourses();
      setAllCourses(t_allCourses);
      setCourses(t_allCourses.map(item => item.data.level));
      setBranches(t_allCourses.map(item => item.data.courseName));
      const t_subjects = await firebaseApiService.getSubjectsByCourse(t_allCourses[0].id as string);
      setSubjects(t_subjects);
      setUnits(t_subjects.map(item => item.data.subjectName));

      if (!isEmpty(t_subjects)) {
        const t_trainings = await firebaseApiService.getTrainingsByCourse(t_allCourses[0].id as string, t_subjects[0].id as string);
        setEntrenamientos(t_trainings);
        setTrainings(t_trainings.map(item => item.data.title));

        const t_tests = await firebaseApiService.getTestsByCourse(t_allCourses[0].id as string, t_subjects[0].id as string);
        setPruebas(t_tests);
        setTests(t_tests.map(item => item.data.title));
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setInitialState();

      if (isEditMode) {
        setUnitTypeIndex(0);

        if (!isEmpty(subjects)) {
          const t_lessons = await firebaseApiService.getLessonsBySubject(allCourses[courseIndex].id as string, subjects[unitIndex].id);
          setLessons(t_lessons);
          setLessonIDandTitles(t_lessons.map(item => item.data.lessonName));

          if (!isEmpty(t_lessons) && contentTypeIndex === 0) {
            setLessonData(t_lessons[0].data);
            setLessonIDandTitleIndex(0);
          }

          if (!isEmpty(trainings) && contentTypeIndex === 1) {
            const t_questions = await firebaseApiService.getQuestionsByTraining(
              allCourses[courseIndex].id as string,
              subjects[unitIndex].id as string,
              entrenamientos[0].id as string,
            );
            setTrainingQuestions(t_questions);
            setTrainingNumbers(t_questions.map(item => item.data.trainingNumber));

            if (!isEmpty(t_questions) && contentTypeIndex === 1) {
              setTrainingNumber(1);
              setTrainingIndex(0);
              setQuestionData(t_questions[0].data);
              setClue(t_questions[0].data.clue);
              setAdvanceXP(entrenamientos[0].data.xp);
            }
          }

          if (!isEmpty(tests) && contentTypeIndex === 2) {
            const t_questions = await firebaseApiService.getQuestionsByTest(
              allCourses[courseIndex].id as string,
              subjects[unitIndex].id as string,
              pruebas[0].id as string,
            );
            setTestQuestions(t_questions);
            setTestNumbers(t_questions.map(item => item.data.testNumber));

            if (!isEmpty(t_questions) && contentTypeIndex === 2) {
              setTestNumber(1);
              setTestIndex(0);
              setQuestionData(t_questions[0].data);
              setScore(pruebas[0].data.score);
              setAdvanceXP(pruebas[0].data.xp);
            }
          }
        }
      }
    })();
  }, [isEditMode, contentTypeIndex]);

  const getLessonData = () => {
    let firstImg, firstPara, firstVideo, firstSection;
    let secondImg, secondPara, secondVideo, secondSection;
    let thirdImg, thirdPara, thirdVideo, thirdSection;
    if (firstSectionTypeIndex === 0) {
      firstImg = '';
      firstVideo = '';
      firstPara = firstSectionText;
      firstSection = 'para';
    } else {
      firstImg = '';
      firstVideo = firstSectionFile?.name;
      firstPara = '';
      firstSection = firstSectionTypeIndex === 1 ? 'image' : 'video';
    }

    if (secondSectionTypeIndex === 0) {
      secondImg = '';
      secondVideo = '';
      secondPara = secondSectionText;
      secondSection = 'para';
    } else {
      secondImg = '';
      secondVideo = secondSectionFile?.name;
      secondPara = '';
      secondSection = secondSectionTypeIndex === 1 ? 'image' : 'video';
    }

    if (thirdSectionTypeIndex === 0) {
      thirdImg = '';
      thirdVideo = '';
      thirdPara = thirdSectionText;
      thirdSection = 'para';
    } else {
      thirdImg = '';
      thirdVideo = thirdSectionFile?.name;
      thirdPara = '';
      thirdSection = thirdSectionTypeIndex === 1 ? 'image' : 'video';
    }
    if (!isEditMode)
      return {
        firstImg,
        firstVideo,
        firstPara,
        firstSection,
        image: '',
        isCompleted: false,
        lessonName: lessonTitle,
        lessonNumber: lessonID,
        order: 0,
        secondImg,
        secondPara,
        secondVideo,
        secondSection,
        text: '',
        thirdImg,
        thirdPara,
        thirdVideo,
        thirdSection,
        title: '',
        xp: advanceXP,
      };
    else
      return {
        firstImg,
        firstVideo,
        firstPara,
        firstSection,
        secondImg,
        secondPara,
        secondVideo,
        secondSection,
        thirdImg,
        thirdPara,
        thirdVideo,
        thirdSection,
        xp: advanceXP,
      };
  };

  const getQuestionByTraining = () => {
    if (!isEditMode)
      return {
        question,
        options: [answers.answer1, answers.answer2, answers.answer3, answers.answer4],
        correctAnswer: answers[isCorrectAnswer],
        points: 0,
        clue,
        trainingNumber: trainingID,
      };
    else
      return {
        question,
        options: [answers.answer1, answers.answer2, answers.answer3, answers.answer4],
        correctAnswer: answers[isCorrectAnswer],
        clue,
      };
  };

  const getQuestionByTest = () => {
    if (!isEditMode)
      return {
        question,
        options: [answers.answer1, answers.answer2, answers.answer3, answers.answer4],
        correctAnswer: answers[isCorrectAnswer],
        points: 0,
        testNumber: testOrder,
      };
    else
      return {
        question,
        options: [answers.answer1, answers.answer2, answers.answer3, answers.answer4],
        correctAnswer: answers[isCorrectAnswer],
      };
  };

  const addSubjectandLesson = async () => {
    try {
      await firebaseApiService.addSubjectandLesson(allCourses[courseIndex].id as string, newUnit, getLessonData());
      toast.success('Fue presentado correctamente.');
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const addLesson = async () => {
    try {
      await firebaseApiService.addLesson(allCourses[courseIndex].id as string, subjects[unitIndex].id as string, getLessonData());
      toast.success('Fue presentado correctamente.');
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const updateLesson = async () => {
    try {
      await firebaseApiService.updateLesson(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        lessons[lessonIDandTitleIndex].id as string,
        getLessonData(),
      );
      toast.success('Fue presentado correctamente.');
      const t_lessons = await firebaseApiService.getLessonsBySubject(allCourses[courseIndex].id as string, subjects[unitIndex].id);
      setLessons(t_lessons);
      setLessonIDandTitles(t_lessons.map(item => item.data.lessonName));
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const deleteLesson = async () => {
    try {
      await firebaseApiService.deleteLesson(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        lessons[lessonIDandTitleIndex].id as string,
      );
      toast.success('Se borró correctamente.');
      const t_lessons = await firebaseApiService.getLessonsBySubject(allCourses[courseIndex].id as string, subjects[unitIndex].id);
      setLessons(t_lessons);
      setLessonIDandTitles(t_lessons.map(item => item.data.lessonName));
      setLessonIDandTitleIndex(0);
      setLessonData(t_lessons[0].data);
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const createTraining = async () => {
    try {
      const trainingData = {
        attempt: 0,
        isCompleted: false,
        isTest: false,
        lastAttempt: Timestamp.now(),
        order: 0,
        subTitle: '',
        title: trainingTitle,
        xp: advanceXP,
      };
      await firebaseApiService.createTraining(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        trainingData,
        getQuestionByTraining(),
      );
      toast.success('Fue presentado correctamente.');
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const addTraining = async () => {
    try {
      const trainingData = {
        lastAttempt: Timestamp.now(),
        xp: advanceXP,
      };
      await firebaseApiService.addTraining(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        entrenamientos[trainingIndex].id as string,
        trainingData,
        getQuestionByTraining(),
      );
      toast.success('Fue presentado correctamente.');
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const updateTraining = async () => {
    try {
      const trainingData = {
        lastAttempt: Timestamp.now(),
        xp: advanceXP,
      };
      await firebaseApiService.updateTraining(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        entrenamientos[trainingIndex].id as string,
        trainingQuestions[trainingNumber - 1].id as string,
        trainingData,
        getQuestionByTraining(),
      );
      toast.success('Fue presentado correctamente.');

      const t_questions = await firebaseApiService.getQuestionsByTraining(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        entrenamientos[trainingIndex].id as string,
      );
      setTrainingQuestions(t_questions);
      setQuestionData(t_questions[trainingNumber - 1].data);
      setClue(t_questions[trainingNumber - 1].data.clue);
      // setAdvanceXP(entrenamientos[trainingIndex].data.xp);
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const deleteQuestionByTraining = async () => {
    try {
      await firebaseApiService.deleteQuestionByTraining(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        entrenamientos[trainingIndex].id as string,
        trainingQuestions[trainingNumber - 1].id as string,
      );
      toast.success('Se borró correctamente.');

      const t_questions = await firebaseApiService.getQuestionsByTraining(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        entrenamientos[trainingIndex].id as string,
      );
      setTrainingQuestions(t_questions);
      setTrainingNumbers(t_questions.map(item => item.data.trainingNumber));
      if (!isEmpty(t_questions) && contentTypeIndex === 1) {
        setTrainingNumber(1);
        setQuestionData(t_questions[0].data);
        setClue(t_questions[0].data.clue);
        setAdvanceXP(entrenamientos[trainingIndex].data.xp);
      }
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const createTest = async () => {
    try {
      const testData = {
        attempt: 0,
        isCompleted: false,
        isTest: true,
        lastAttempt: Timestamp.now(),
        maxScore: 0,
        order: 0,
        score,
        scoreList: [],
        subTitle: '',
        title: testName,
        xp: advanceXP,
      };
      await firebaseApiService.createTest(allCourses[courseIndex].id as string, subjects[unitIndex].id as string, testData, getQuestionByTest());
      toast.success('Fue presentado correctamente.');
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const addTest = async () => {
    try {
      const testData = {
        lastAttempt: Timestamp.now(),
        xp: advanceXP,
        score,
      };
      await firebaseApiService.addTest(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        pruebas[testIndex].id as string,
        testData,
        getQuestionByTest(),
      );
      toast.success('Fue presentado correctamente.');
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const updateTest = async () => {
    try {
      const testData = {
        lastAttempt: Timestamp.now(),
        xp: advanceXP,
        score,
      };
      await firebaseApiService.updateTest(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        pruebas[testIndex].id as string,
        testQuestions[testNumber - 1].id as string,
        testData,
        getQuestionByTest(),
      );
      toast.success('Fue presentado correctamente.');

      const t_questions = await firebaseApiService.getQuestionsByTest(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        pruebas[testIndex].id as string,
      );
      console.log('pruebas:', pruebas);
      setTestQuestions(t_questions);
      setQuestionData(t_questions[testNumber - 1].data);
      // setScore(pruebas[testIndex].data.score);
      // setAdvanceXP(pruebas[testIndex].data.xp);
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const deleteQuestionByTest = async () => {
    try {
      await firebaseApiService.deleteQuestionByTest(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        pruebas[testIndex].id as string,
        testQuestions[testNumber - 1].id as string,
      );
      toast.success('Se borró correctamente.');

      const t_questions = await firebaseApiService.getQuestionsByTest(
        allCourses[courseIndex].id as string,
        subjects[unitIndex].id as string,
        pruebas[testIndex].id as string,
      );
      setTestQuestions(t_questions);
      setTestNumbers(t_questions.map(item => item.data.testNumber));
      if (!isEmpty(t_questions) && contentTypeIndex === 1) {
        setTestNumber(1);
        setQuestionData(t_questions[0].data);
        setScore(pruebas[testIndex].data.score);
        setAdvanceXP(pruebas[testIndex].data.xp);
      }
    } catch (err) {
      toast.error('Algo salió mal.');
    }
  };

  const handleSubmit = async () => {
    if (!isEditMode) {
      if (unitTypeIndex === 1 && contentTypeIndex === 0) addSubjectandLesson();
      if (unitTypeIndex === 0 && contentTypeIndex === 0) addLesson();
      if (contentTypeIndex === 1 && trainingTypeIndex === 1) createTraining();
      if (contentTypeIndex === 1 && trainingTypeIndex === 0) addTraining();
      if (contentTypeIndex === 2 && testTypeIndex === 1) createTest();
      if (contentTypeIndex === 2 && testTypeIndex === 0) addTest();
    } else {
      if (contentTypeIndex === 0) updateLesson();
      if (contentTypeIndex === 1) updateTraining();
      if (contentTypeIndex === 2) updateTest();
    }
  };

  const handleDelete = () => {
    if (contentTypeIndex === 0) deleteLesson();
    if (contentTypeIndex === 1) deleteQuestionByTraining();
    if (contentTypeIndex === 2) deleteQuestionByTest();
    setInitialState();
  };

  const setInitialState = () => {
    setNewUnit('');
    setLessonID(1);
    setLessonTitle('');
    setFirstSectionText('');
    setFirstSectionFile(null);
    setSecondSectionText('');
    setSecondSectionFile(null);
    setThirdSectionText('');
    setThirdSectionFile(null);
    setAdvanceXP(0);
    setTrainingID(1);
    setTrainingTitle('');
    setQuestion('');
    setAnswers({
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
    });
    setClue('');
    setTestName('');
    setTestOrder(1);
    setScore(0);
  };

  return (
    <>
      <FormGroupV>
        <FormLabel>Modo edición</FormLabel>
        <Switch onSwitch={handleSwitch} />
      </FormGroupV>
      <FormGroupV>
        <FormLabel>Curso</FormLabel>
        <Select selectionData={courses} onSelect={handleSelectCourse} selectedIndex={courseIndex} />
      </FormGroupV>
      <FormGroupV>
        <FormLabel>Ramo</FormLabel>
        <Select selectionData={branches} onSelect={handleSelectCourse} selectedIndex={branchIndex} />
      </FormGroupV>
      {!isEditMode && contentTypeIndex === 0 && (
        <FormGroupV>
          <FormLabel>Crear unidad o unidad existente</FormLabel>
          <Tab tabItems={unitTypes} onClick={handleClickUnitType} selectedIndex={unitTypeIndex} />
        </FormGroupV>
      )}
      <FormGroupV>
        <FormLabel>Unidad</FormLabel>
        {unitTypeIndex === 1 && contentTypeIndex === 0 ? (
          <Input type="text" value={newUnit} width={493} onChange={e => handleChangeNewUnit(e.target.value)} placeholder="Nombre de la unidad" />
        ) : (
          <Select selectionData={units} onSelect={handleSelectUnit} selectedIndex={unitIndex} />
        )}
      </FormGroupV>
      <FormGroupV>
        <FormLabel>Tipo de contenido</FormLabel>
        <Tab tabItems={contentTypes} onClick={handleClickContentType} selectedIndex={contentTypeIndex} />
      </FormGroupV>
      {!isEditMode && contentTypeIndex === 0 && (
        <FormGroupH>
          <FormGroupV>
            <FormLabel>ID</FormLabel>
            <Input type="text" value={lessonID} width={56} onChange={e => handleChangeLessonID(Number(e.target.value))} placeholder="1.2" />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Título de la lección</FormLabel>
            <Input type="text" value={lessonTitle} width={417} onChange={e => handleChangeLessonTitle(e.target.value)} placeholder="Nombre" />
          </FormGroupV>
        </FormGroupH>
      )}
      {isEditMode && contentTypeIndex === 0 && (
        <FormGroupV>
          <FormLabel>ID y título de la lección</FormLabel>
          <Select width={350} selectionData={lessonIDandTitles} onSelect={handleSelectLessonIDandTitle} selectedIndex={lessonIDandTitleIndex} />
        </FormGroupV>
      )}
      {contentTypeIndex === 0 && (
        <>
          <FormGroupV>
            <FormLabel>Primera sección</FormLabel>
            <Tab tabItems={sectionTypes} onClick={handleClickFirstSectionType} selectedIndex={firstSectionTypeIndex} />
            {firstSectionTypeIndex === 0 ? (
              <TextArea value={firstSectionText} onChange={e => handleChangeFirstSectionText(e.target.value)} placeholder="Máximo 384 caracteres" />
            ) : (
              <DragDropFile selectedFile={firstSectionFile} handleSelectFile={(file: File | null) => setFirstSectionFile(file)} />
            )}
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Segunda sección</FormLabel>
            <Tab tabItems={sectionTypes} onClick={handleClickSecondSectionType} selectedIndex={secondSectionTypeIndex} />
            {secondSectionTypeIndex === 0 ? (
              <TextArea value={secondSectionText} onChange={e => handleChangeSecondSectionText(e.target.value)} placeholder="Máximo 384 caracteres" />
            ) : (
              <DragDropFile selectedFile={secondSectionFile} handleSelectFile={(file: File | null) => setSecondSectionFile(file)} />
            )}
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Tercera sección</FormLabel>
            <Tab tabItems={sectionTypes} onClick={handleClickThirdSectionType} selectedIndex={thirdSectionTypeIndex} />
            {thirdSectionTypeIndex === 0 ? (
              <TextArea value={thirdSectionText} onChange={e => handleChangeThirdSectionText(e.target.value)} placeholder="Máximo 384 caracteres" />
            ) : (
              <DragDropFile selectedFile={thirdSectionFile} handleSelectFile={(file: File | null) => setThirdSectionFile(file)} />
            )}
          </FormGroupV>
        </>
      )}
      {contentTypeIndex === 1 && (
        <>
          {!isEditMode ? (
            <>
              <FormGroupV>
                <FormLabel>Agregar preguntas a entrenamiento existente o crear nuevo entrenamiento</FormLabel>
                <Tab tabItems={trainingTypes} onClick={handleClickTrainingType} selectedIndex={trainingTypeIndex} />
              </FormGroupV>
              {trainingTypeIndex === 1 ? (
                <FormGroupH>
                  <FormGroupV>
                    <FormLabel>ID</FormLabel>
                    <Input value={trainingID} type="text" width={56} onChange={e => setTrainingID(Number(e.target.value))} placeholder="1.2" />
                  </FormGroupV>
                  <FormGroupV>
                    <FormLabel>Título del entrenamiento</FormLabel>
                    <Input value={trainingTitle} type="text" width={417} onChange={e => setTrainingTitle(e.target.value)} placeholder="Título" />
                  </FormGroupV>
                </FormGroupH>
              ) : (
                <FormGroupH>
                  <FormGroupV>
                    <FormLabel>ID</FormLabel>
                    <Input value={trainingID} type="text" width={56} onChange={e => setTrainingID(Number(e.target.value))} placeholder="1.2" />
                  </FormGroupV>
                  <FormGroupV>
                    <FormLabel>Nombre del entrenamiento</FormLabel>
                    <Select selectionData={trainings} onSelect={handleSelectTraining} selectedIndex={trainingIndex} width={300} />
                  </FormGroupV>
                </FormGroupH>
              )}
            </>
          ) : (
            <>
              <FormGroupH>
                <FormGroupV>
                  <FormLabel>Nombre del entrenamiento</FormLabel>
                  <Select selectionData={trainings} onSelect={handleSelectTraining} selectedIndex={trainingIndex} width={300} />
                </FormGroupV>
                <FormGroupV>
                  <FormLabel>Número</FormLabel>
                  <Select
                    selectionData={trainingNumbers}
                    onSelect={async (selectedIndex: number) => {
                      setTrainingNumber(selectedIndex + 1);
                      setQuestionData(trainingQuestions[selectedIndex].data);
                      setClue(trainingQuestions[selectedIndex].data.clue);
                    }}
                    selectedIndex={trainingNumber - 1}
                    width={50}
                  />
                </FormGroupV>
              </FormGroupH>
            </>
          )}
        </>
      )}
      {contentTypeIndex === 2 && (
        <>
          {!isEditMode ? (
            <>
              <FormGroupV>
                <FormLabel>Agregar preguntas a prueba existente o crear nueva prueba</FormLabel>
                <Tab tabItems={testTypes} onClick={(selectedIndex: number) => setTestTypeIndex(selectedIndex)} selectedIndex={testTypeIndex} />
              </FormGroupV>
              {testTypeIndex === 1 ? (
                <FormGroupH>
                  <FormGroupV>
                    <FormLabel>Orden</FormLabel>
                    <Input value={testOrder} type="text" width={56} onChange={e => setTestOrder(Number(e.target.value))} placeholder="1" />
                  </FormGroupV>
                  <FormGroupV>
                    <FormLabel>Nombre de la prueba</FormLabel>
                    <Input value={testName} type="text" width={417} onChange={e => setTestName(e.target.value)} placeholder="Título" />
                  </FormGroupV>
                </FormGroupH>
              ) : (
                <FormGroupH>
                  <FormGroupV>
                    <FormLabel>Orden</FormLabel>
                    <Input value={testOrder} type="text" width={56} onChange={e => setTestOrder(Number(e.target.value))} placeholder="1" />
                  </FormGroupV>
                  <FormGroupV>
                    <FormLabel>Nombre de la prueba</FormLabel>
                    <Select selectionData={tests} onSelect={handleSelectTest} selectedIndex={testIndex} width={300} />
                  </FormGroupV>
                </FormGroupH>
              )}
            </>
          ) : (
            <>
              <FormGroupH>
                <FormGroupV>
                  <FormLabel>Nombre de la prueba</FormLabel>
                  <Select selectionData={tests} onSelect={handleSelectTest} selectedIndex={testIndex} width={300} />
                </FormGroupV>
                <FormGroupV>
                  <FormLabel>Número</FormLabel>
                  <Select
                    selectionData={testNumbers}
                    onSelect={(selectedIndex: number) => {
                      setTestNumber(selectedIndex + 1);
                      setQuestionData(testQuestions[selectedIndex].data);
                    }}
                    selectedIndex={testNumber - 1}
                    width={50}
                  />
                </FormGroupV>
              </FormGroupH>
            </>
          )}
        </>
      )}
      {contentTypeIndex !== 0 && (
        <>
          <FormGroupV>
            <Divider />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Pregunta</FormLabel>
            <Input value={question} type="text" width={491} onChange={e => handleChangeQuestion(e.target.value)} placeholder="¿Cuánto es 10+10?" />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 1</FormLabel>
            <Input
              value={answers.answer1}
              type="text"
              width={491}
              onChange={e => handleChangeAnswer(e.target.value, 'answer1')}
              placeholder="Respuesta 1"
            />
            <Radio
              value="answer1"
              name="radio-group"
              checked={isCorrectAnswer === 'answer1'}
              handleChange={(input: string) => setIsCorrectAnswer(input)}
            />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 2</FormLabel>
            <Input
              value={answers.answer2}
              type="text"
              width={491}
              onChange={e => handleChangeAnswer(e.target.value, 'answer2')}
              placeholder="Respuesta 2"
            />
            <Radio
              value="answer2"
              name="radio-group"
              checked={isCorrectAnswer === 'answer2'}
              handleChange={(input: string) => setIsCorrectAnswer(input)}
            />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 3</FormLabel>
            <Input
              value={answers.answer3}
              type="text"
              width={491}
              onChange={e => handleChangeAnswer(e.target.value, 'answer3')}
              placeholder="Respuesta 3"
            />
            <Radio
              value="answer3"
              name="radio-group"
              checked={isCorrectAnswer === 'answer3'}
              handleChange={(input: string) => setIsCorrectAnswer(input)}
            />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 4</FormLabel>
            <Input
              value={answers.answer4}
              type="text"
              width={491}
              onChange={e => handleChangeAnswer(e.target.value, 'answer4')}
              placeholder="Respuesta 4"
            />
            <Radio
              value="answer4"
              name="radio-group"
              checked={isCorrectAnswer === 'answer4'}
              handleChange={(input: string) => setIsCorrectAnswer(input)}
            />
          </FormGroupV>
        </>
      )}
      {contentTypeIndex === 1 && (
        <FormGroupV>
          <FormLabel>Pista (opcional)</FormLabel>
          <Input value={clue} type="text" width={120} onChange={e => setClue(e.target.value)} placeholder="Pista" />
        </FormGroupV>
      )}
      {contentTypeIndex === 2 && (
        <>
          <FormGroupV>
            <FormLabel>Puntaje de la pregunta</FormLabel>
            <Input
              type="text"
              width={120}
              value={score}
              onChange={e => setScore(Number(e.target.value))}
              placeholder="Número"
              data-tip="La nota será calculada como la suma de todas las puntuaciones<br> de las preguntas respondidas correctamente dividido por la suma<br>de todas las preguntas. "
            />
          </FormGroupV>
          <ReactTooltip multiline backgroundColor="#333333" />
        </>
      )}
      <FormGroupV>
        <FormLabel>XP por avanzar</FormLabel>
        <Input type="text" value={advanceXP} width={120} onChange={e => handleChangeAdvanceXP(Number(e.target.value))} placeholder="Número" />
      </FormGroupV>
      <FormGroupV>
        {isEditMode ? (
          <FormGroupH>
            <Button type="button" theme="dark" onClick={handleSubmit}>
              Enviar
            </Button>
            <Button type="button" theme="light" onClick={handleDelete}>
              Eliminar
            </Button>
          </FormGroupH>
        ) : (
          <Button type="button" theme="dark" onClick={handleSubmit}>
            Enviar
          </Button>
        )}
      </FormGroupV>
    </>
  );
};

export default Form;

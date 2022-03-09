import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';

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

const courses: string[] = ['Primero básico', 'Segundo básico', 'Tercero básico', 'Cuarto básico'];
const branches: string[] = ['Matemática'];
const unitTypes: string[] = ['Unidad existente', 'Nueva unidad'];
const units: string[] = ['Operaciones matemáticas'];
const contentTypes: string[] = ['Lección', 'Entrenamiento', 'Prueba'];
const sectionTypes: string[] = ['Texto', 'Imagen', 'Video'];
const lessonIDandTitles: string[] = ['Operaciones matemáticas', 'Operaciones matemáticas1'];
const trainingTypes: string[] = ['Agregar', 'Crear'];
const trainings: string[] = ['Operaciones matemáticas'];
const trainingNumbers: number[] = [1, 2, 3, 4, 5];
const testTypes: string[] = ['Agregar', 'Crear'];
const tests: string[] = ['Operaciones matemáticas'];
const testNumbers: number[] = [1, 2, 3, 4, 5];

const Form: React.FC = () => {
  const firebaseApiService = new FirebaseApiService();
  /*---------------  contentTypeIndex = * ------------------- */
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [courseIndex, setCourseIndex] = useState<number>(3);
  const [branchIndex, setBranchIndex] = useState<number>(0);
  const [unitTypeIndex, setUnitTypeIndex] = useState<number>(0);
  const [unitIndex, setUnitIndex] = useState<number>(0);
  const [newUnit, setNewUnit] = useState<string>('');
  const [contentTypeIndex, setContentTypeIndex] = useState<number>(0);
  const [advanceXP, setAdvanceXP] = useState<string>('');

  /*---------------  contentTypeIndex = 0  ------------------- */
  const [lessonID, setLessonID] = useState<string>('');
  const [lessonTitle, setLessonTitle] = useState<string>('');
  const [lessonIDandTitleIndex, setLessonIDandTitleIndex] = useState<number>(0);
  const [firstSectionTypeIndex, setFirstSectionTypeIndex] = useState<number>(0);
  const [firstSectionText, setFirstSectionText] = useState<string>('');
  const [secondSectionTypeIndex, setSecondSectionTypeIndex] = useState<number>(0);
  const [secondSectionText, setSecondSectionText] = useState<string>('');
  const [thirdSectionTypeIndex, setThirdSectionTypeIndex] = useState<number>(0);
  const [thirdSectionText, setThirdSectionText] = useState<string>('');

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
  const [trainingID, setTrainingID] = useState<string>('');
  const [trainingTitle, setTrainingTitle] = useState<string>('');

  /*---------------  contentTypeIndex = 2 ------------------- */
  const [score, setScore] = useState<string>('');
  const [testTypeIndex, setTestTypeIndex] = useState<number>(0);
  const [testIndex, setTestIndex] = useState<number>(0);
  const [testNumber, setTestNumber] = useState<number>(1);
  const [testOrder, setTestOrder] = useState<string>('');
  const [testName, setTestName] = useState<string>('');

  /*---------------  contentTypeIndex = *  ------------------- */

  const handleSwitch = (switchValue: boolean) => {
    setIsEditMode(switchValue);
  };

  const handleSelectCourse = (selectedIndex: number) => {
    setCourseIndex(selectedIndex);
  };

  const handleSelectBranch = (selectedIndex: number) => {
    setBranchIndex(selectedIndex);
  };

  const handleClickUnitType = (selectedIndex: number) => {
    setUnitTypeIndex(selectedIndex);
  };

  const handleSelectUnit = (selectedIndex: number) => {
    setUnitIndex(selectedIndex);
  };

  const handleChangeNewUnit = (input: string) => {
    setNewUnit(input);
  };

  const handleClickContentType = (selectedIndex: number) => {
    setContentTypeIndex(selectedIndex);
  };

  const handleChangeAdvanceXP = (input: string) => {
    setAdvanceXP(input);
  };

  /*---------------  contentTypeIndex = 0  ------------------- */
  const handleChangeLessonID = (input: string) => {
    setLessonID(input);
  };

  const handleChangeLessonTitle = (input: string) => {
    setLessonTitle(input);
  };

  const handleSelectLessonIDandTitle = (selectedIndex: number) => {
    setLessonIDandTitleIndex(selectedIndex);
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

  const handleSelectTraining = (selectedIndex: number) => {
    setTrainingIndex(selectedIndex);
  };

  /*---------------  contentTypeIndex = 1 || contentTypeIndex = 2 ------------------- */
  const handleChangeQuestion = (input: string) => {
    setQuestion(input);
  };

  const handleChangeAnswer = (input: string, key: string) => {
    setAnswers({ ...answers, [key]: input });
  };

  useEffect(() => {
    if (isEditMode) setUnitTypeIndex(0);
  }, [isEditMode]);

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
        <Select selectionData={branches} onSelect={handleSelectBranch} selectedIndex={branchIndex} />
      </FormGroupV>
      {!isEditMode && contentTypeIndex === 0 && (
        <FormGroupV>
          <FormLabel>Crear unidad o unidad existente</FormLabel>
          <Tab tabItems={unitTypes} onClick={handleClickUnitType} selectedIndex={unitTypeIndex} />
        </FormGroupV>
      )}
      <FormGroupV>
        <FormLabel>Unidad</FormLabel>
        {unitTypeIndex === 0 ? (
          <Select selectionData={units} onSelect={handleSelectUnit} selectedIndex={unitIndex} width={300} />
        ) : (
          <Input type="text" width={493} onChange={e => handleChangeNewUnit(e.target.value)} placeholder="Nombre de la unidad" />
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
            <Input type="text" width={56} onChange={e => handleChangeLessonID(e.target.value)} placeholder="1.2" />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Título de la lección</FormLabel>
            <Input type="text" width={417} onChange={e => handleChangeLessonTitle(e.target.value)} placeholder="Nombre" />
          </FormGroupV>
        </FormGroupH>
      )}
      {isEditMode && contentTypeIndex === 0 && (
        <FormGroupV>
          <FormLabel>ID y título de la lección</FormLabel>
          <Select selectionData={lessonIDandTitles} onSelect={handleSelectLessonIDandTitle} selectedIndex={lessonIDandTitleIndex} />
        </FormGroupV>
      )}
      {contentTypeIndex === 0 && (
        <>
          <FormGroupV>
            <FormLabel>Primera sección</FormLabel>
            <Tab tabItems={sectionTypes} onClick={handleClickFirstSectionType} selectedIndex={firstSectionTypeIndex} />
            {firstSectionTypeIndex === 0 ? (
              <TextArea onChange={e => handleChangeFirstSectionText(e.target.value)} placeholder="Máximo 384 caracteres" />
            ) : (
              <DragDropFile />
            )}
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Segunda sección</FormLabel>
            <Tab tabItems={sectionTypes} onClick={handleClickSecondSectionType} selectedIndex={secondSectionTypeIndex} />
            {secondSectionTypeIndex === 0 ? (
              <TextArea onChange={e => handleChangeSecondSectionText(e.target.value)} placeholder="Máximo 384 caracteres" />
            ) : (
              <DragDropFile />
            )}
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Tercera sección</FormLabel>
            <Tab tabItems={sectionTypes} onClick={handleClickThirdSectionType} selectedIndex={thirdSectionTypeIndex} />
            {thirdSectionTypeIndex === 0 ? (
              <TextArea onChange={e => handleChangeThirdSectionText(e.target.value)} placeholder="Máximo 384 caracteres" />
            ) : (
              <DragDropFile />
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
                    <Input type="text" width={56} onChange={e => setTrainingID(e.target.value)} placeholder="1.2" />
                  </FormGroupV>
                  <FormGroupV>
                    <FormLabel>Título del entrenamiento</FormLabel>
                    <Input type="text" width={417} onChange={e => setTrainingTitle(e.target.value)} placeholder="Título" />
                  </FormGroupV>
                </FormGroupH>
              ) : (
                <FormGroupV>
                  <FormLabel>Nombre del entrenamiento</FormLabel>
                  <Select selectionData={trainings} onSelect={handleSelectTraining} selectedIndex={trainingIndex} width={300} />
                </FormGroupV>
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
                    onSelect={(selectedIndex: number) => setTrainingNumber(selectedIndex + 1)}
                    selectedIndex={trainingNumber - 1}
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
                    <Input type="text" width={56} onChange={e => setTestOrder(e.target.value)} placeholder="1" />
                  </FormGroupV>
                  <FormGroupV>
                    <FormLabel>Nombre de la prueba</FormLabel>
                    <Input type="text" width={417} onChange={e => setTestName(e.target.value)} placeholder="Título" />
                  </FormGroupV>
                </FormGroupH>
              ) : (
                <FormGroupV>
                  <FormLabel>Nombre de la prueba</FormLabel>
                  <Select
                    selectionData={tests}
                    onSelect={(selectedIndex: number) => setTestIndex(selectedIndex)}
                    selectedIndex={testIndex}
                    width={300}
                  />
                </FormGroupV>
              )}
            </>
          ) : (
            <>
              <FormGroupH>
                <FormGroupV>
                  <FormLabel>Nombre de la prueba</FormLabel>
                  <Select
                    selectionData={tests}
                    onSelect={(selectedIndex: number) => setTestIndex(selectedIndex)}
                    selectedIndex={testIndex}
                    width={300}
                  />
                </FormGroupV>
                <FormGroupV>
                  <FormLabel>Número</FormLabel>
                  <Select
                    selectionData={testNumbers}
                    onSelect={(selectedIndex: number) => setTestNumber(selectedIndex + 1)}
                    selectedIndex={testNumber - 1}
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
            <Input type="text" width={491} onChange={e => handleChangeQuestion(e.target.value)} placeholder="¿Cuánto es 10+10?" />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 1</FormLabel>
            <Input type="text" width={491} onChange={e => handleChangeAnswer(e.target.value, 'answer1')} placeholder="Respuesta 1" />
            <Radio
              value="answer1"
              name="radio-group"
              checked={isCorrectAnswer === 'answer1'}
              handleChange={(input: string) => setIsCorrectAnswer(input)}
            />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 2</FormLabel>
            <Input type="text" width={491} onChange={e => handleChangeAnswer(e.target.value, 'answer2')} placeholder="Respuesta 2" />
            <Radio
              value="answer2"
              name="radio-group"
              checked={isCorrectAnswer === 'answer2'}
              handleChange={(input: string) => setIsCorrectAnswer(input)}
            />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 3</FormLabel>
            <Input type="text" width={491} onChange={e => handleChangeAnswer(e.target.value, 'answer3')} placeholder="Respuesta 3" />
            <Radio
              value="answer3"
              name="radio-group"
              checked={isCorrectAnswer === 'answer3'}
              handleChange={(input: string) => setIsCorrectAnswer(input)}
            />
          </FormGroupV>
          <FormGroupV>
            <FormLabel>Respuesta 4</FormLabel>
            <Input type="text" width={491} onChange={e => handleChangeAnswer(e.target.value, 'answer4')} placeholder="Respuesta 4" />
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
          <Input type="text" width={120} onChange={e => setClue(e.target.value)} placeholder="Pista" />
        </FormGroupV>
      )}
      {contentTypeIndex === 2 && (
        <>
          <FormGroupV>
            <FormLabel>Puntaje de la pregunta</FormLabel>
            <Input
              type="text"
              width={120}
              onChange={e => setScore(e.target.value)}
              placeholder="Número"
              data-tip="La nota será calculada como la suma de todas las puntuaciones<br> de las preguntas respondidas correctamente dividido por la suma<br>de todas las preguntas. "
            />
          </FormGroupV>
          <ReactTooltip multiline backgroundColor="#333333" />
        </>
      )}
      <FormGroupV>
        <FormLabel>XP por avanzar</FormLabel>
        <Input type="text" width={120} onChange={e => handleChangeAdvanceXP(e.target.value)} placeholder="Número" />
      </FormGroupV>
      <FormGroupV>
        {isEditMode ? (
          <FormGroupH>
            <Button type="button" theme="dark">
              Enviar
            </Button>
            <Button type="button" theme="light">
              Eliminar
            </Button>
          </FormGroupH>
        ) : (
          <Button type="button" theme="dark">
            Enviar
          </Button>
        )}
      </FormGroupV>
    </>
  );
};

export default Form;

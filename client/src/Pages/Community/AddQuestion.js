import React, { useState, useEffect, useRef } from "react";
import { Grid, Radio,  Typography, TextField, Button, Box, CssBaseline } from "@mui/material";

import { useAuth, useLoading } from '../../Context';
import { Axios } from '../../Api';
import { DatabaseRequest } from '../../Classes';
import { useTranslation } from '../../Hooks';

export default function AddQuestionPopup({mapSelectedCountry, handleClose, /*openPopup, handleCloseAddQuestionPopup,*/ setAlternativeContent}){
  const { t } = useTranslation();
  const { setAxiosLoading, setAlert } = useLoading();
  const [setErrMsg] = useState(''); //to delete
  const yourQuestionRef = useRef( null );
  const addQuestionButtonRef = useRef( null );

  const { auth } = useAuth();
  const selectedAreaName = mapSelectedCountry?.area;
  const selectedAreaId = mapSelectedCountry?._id;

  useEffect(() => { yourQuestionRef.current?.focus(); }, []);

  const [selectedValue, setSelectedValue] = useState(0);
  const handleChange = (event) => { setSelectedValue(Number(event.target.value)); };
  const formRef = useRef();

return (<>
{/*<PopUp open={openPopup} handleClose={handleCloseAddQuestionPopup, t} title="Add Question" handleSubmit={ () => { addQuestionButtonRef.current.click(); } } submitText="+Add Question">*/}
<CssBaseline />
<Box sx={{minHeight: '300px', marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}} >
  <Typography component="h1" variant="h5"> {t("Add Question")} </Typography>
  <Box component="form" ref={formRef} noValidate onSubmit={(e) => handleSubmit(e, auth, Axios, selectedAreaId, setErrMsg, handleClose, setAxiosLoading, setAlert, setAlternativeContent, t)} sx={{ mt: 3 }}>
      <TextField label={t("The Question")} inputRef={yourQuestionRef} id="question" name="question" autoComplete={false} helperText={t("set your question")} fullWidth />
      <Typography component="h5" variant="body"> {t("Your Location:")} {" "} {selectedAreaName || t("No Area!")} </Typography>
      <Grid container>
        <Answer i={0} selectedValue={selectedValue} handleChange={handleChange} />
        <Answer i={1} selectedValue={selectedValue} handleChange={handleChange} />
        <Answer i={2} selectedValue={selectedValue} handleChange={handleChange} />
        <Answer i={3} selectedValue={selectedValue} handleChange={handleChange} />
      </Grid>
      <Typography component="h5" variant="body"> {t("Your Language:")} {t('Language')} </Typography>
      {/*the button accept submit, will not display */}
      <Box sx={{ textAlign: 'center', width: '100%'/*, display: 'none'*/}}>
        <Button ref={addQuestionButtonRef} type="submit" variant="contained"> {t("+ Add Question")} </Button>
      </Box>
  </Box>
</Box>
{/*</PopUp>*/}
</>);
};

function Answer({i ,selectedValue, handleChange}){
  const { t } = useTranslation();
return (<>
  <Grid item container xs={1}> <Radio checked={selectedValue === i} onChange={handleChange} value={i} name="rightAnswer" inputProps={{ 'aria-label': i }}/> </Grid>
  <Grid item xs={11} pl={1}> <TextField label={`${t("Answer")}${i+1}`} id={`answer${i+1}`} name={`answer[${i}]`} autoComplete={false} fullWidth /> </Grid>
</>); }

const handleSubmit = (event, auth, Axios, selectedAreaId, setErrMsg, handleClose, setAxiosLoading, setAlert, setAlternativeContent, t) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const area = selectedAreaId;
  const question = data.get('question');
  if(question.trim() === ''){setAlert(t("no question set"));return;}

  const answers = [];
  let i = 0;
  while(data.get(`answer[${i}]`) !== null && i <= 20){
    const answer = data.get(`answer[${i}]`);
    if( answer.trim() === '' ){setAlert(`${t("answer number")} ${i+1} ${t("is empty")}`);return;}
    answers.push( answer );
    i++; }
  if(answers.length === 0) return;

  const rightAnswer = data.get('rightAnswer');
  const SendingQuestion = { question: question, answers: answers, location: area , rightAnswer: rightAnswer };

  new DatabaseRequest( () => Axios('POST', '/api/question', SendingQuestion, {'authorization':  auth.accessToken}) )
  .GoodResult( (result) => {
    setAlternativeContent(<>{t("Thanks For Sending a Question!")}<br /> {t("Your Question is sent to area expert approval.")}</>);
    } )
  .BadResult( (error) => { setAlert(error); } )
  .Build(setAxiosLoading);
};

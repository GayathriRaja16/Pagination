import { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Pagination,
  Button,
  Toolbar,
  AppBar,
} from "@mui/material";
import { QuestionData } from "../seeddata/Questions";
import { IQuestion } from "../types/Type";

const QuizCards: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [displayText, setDisplayText] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [showWorkspacePlaceholder, setShowWorkspacePlaceholder] =
    useState<boolean>(false);
  const data: IQuestion= QuestionData[currentQuestion];

  const handleChange = (value: number) => {
    setCurrentQuestion(value - 1);
    setShowAnswer(false);
    setDisplayText("");
    setShowWorkspacePlaceholder(false);
  };

 const handleToggleAnswer = () => {
  setShowAnswer(!showAnswer);
  
  if (!showAnswer) {
    console.log("Answer:", data?.answer); 
    setDisplayText(data?.answer);
    setShowWorkspacePlaceholder(true);
  } else {
    setDisplayText("");
    setShowWorkspacePlaceholder(false); 
  }
};


const handleWorkspace = () => {
  setShowAnswer(false);
  setShowWorkspacePlaceholder((prev) => !prev); 
  setDisplayText("");
};


  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (showWorkspacePlaceholder) {
      setDisplayText(event.target.value);
    }
  };

  return (
    <Box>
      <AppBar position="sticky" sx={{ top: 0 }}>
        <Toolbar>
          <Stack
            spacing={2}
            direction="row"
            sx={{
              flexGrow: 1,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box sx={{ marginRight: "10px" }}>
              <img
                src="https://media.istockphoto.com/id/1337475990/photo/q-and-a-question-and-answer-shot-form-on-wooden-block.jpg?s=612x612&w=0&k=20&c=LrALcokTfC-1-1SD3WM1rgVYFIFu4TL7u47xlEeh2VQ="
                alt="Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                }}
              />
            </Box>
            <Typography
              variant="h4"
              style={{ margin: "0", marginLeft: "15px" }}
            >
              REACT QUESTION AND ANSWER
            </Typography>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        width="100%"
        padding={2}
        boxSizing="border-box"
      >
        {data && (
          <Box
            sx={{
              height: "300px",
              width: "800px",
              display: "flex",
              flexDirection: "column",
              padding: 3,
            }}
          >
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" sx={{ padding: 1 }}>
                {data.question}
              </Typography>
              {data.options.map((option: string, optionIndex: number) => (
                <Typography key={optionIndex}>{option}</Typography>
              ))}

              <Stack spacing={2} direction="row" mt={2}>
                <Button
                  variant="contained"
                  onClick={handleToggleAnswer}
                  sx={{ marginRight: 2 }}
                >
                  {showAnswer ? "Hide Answer" : "Show Answer"}
                </Button>
                <Button variant="contained" onClick={handleWorkspace}>
                  Workspace
                </Button>
              </Stack>
              {showWorkspacePlaceholder && (
  <Box sx={{ paddingTop: 2 }}>
 {showWorkspacePlaceholder && (
  <Box sx={{ paddingTop: 2 }}>
    <textarea
      rows={4}
      cols={50}
      placeholder="Write something..."
                        value={displayText}
                         readOnly={showAnswer}
      onChange={handleTextAreaChange}
      style={{
        width: "100%",
        resize: "vertical",
        backgroundColor: "white",
        color: "#000000",
      }}
    />
  </Box>
)}


  </Box>
)}

            </Box>
          </Box>
        )}
        <Stack spacing={2} mt={20} direction="row">
          <Button
            variant="outlined"
            disabled={currentQuestion === 0}
            onClick={() => handleChange(1)}
          >
            First
          </Button>
          <Pagination
            count={QuestionData.length}
            page={currentQuestion + 1}
            onChange={(_event, value) => handleChange(value)}
            shape="rounded"
            boundaryCount={0}
          />
          <Button
            variant="outlined"
            disabled={currentQuestion === QuestionData.length - 1}
            onClick={() => handleChange(QuestionData.length)}
          >
            Last
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default QuizCards;

import React, { useState, useEffect, useContext } from "react";
import {
  View,
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import CustomModal from "../../Components/CustomModal/CustomModal";
import BodyChart from "./BodyChart/bodyChart";
import CustomButton from "../../Components/CustomButton/CustomButton";
import CustomSlider from "../../Components/CustomSlider/CustomSlider";
import { SurveyContext } from "../../Context/SurveyContext";
import { apiService } from "../../Services/ApiService";
import { styles } from "../FocusScreen/FocusScreen_Style";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../Navigation/navigationTypes";

type Answer = string | number;
type AnswerMap = Record<string, Answer>;

type DiagnosisResult = {
  diagnosis: string;
  description: string;
  exercises: string[];
};

const FocusScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<AnswerMap>({});
  const [bodySide, setBodySide] = useState<"front" | "back">("front");
  const [selectedFocusArea, setSelectedFocusArea] = useState<string | null>(null);
  const { state: surveyState, dispatch: surveyDispatch } = useContext(SurveyContext);
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null);
  const [unansweredHighlight, setUnansweredHighlight] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    if (selectedFocusArea) {
      apiService.getSurvey(selectedFocusArea).then((data) => {
        surveyDispatch({
          type: "LOAD_SURVEY",
          surveyId: selectedFocusArea,
          questions: data.questions,
        });
      });
    }
  }, [selectedFocusArea, surveyDispatch]);

  const handleAreaPress = (area: string) => {
    setSelectedFocusArea(area);
    setIsModalVisible(true);
    setCurrentPage(0);
    setUnansweredHighlight(false);
  };

  const handleAnswerChange = (questionId: string, answer: Answer) => {
    setSelectedAnswers(prev => ({ ...prev, [questionId]: answer }));
    if (unansweredHighlight) {
      setUnansweredHighlight(false);
    }
    surveyDispatch({
      type: "ANSWER_QUESTION",
      questionId,
      answer: { questionId, answer },
    });
  };

const handleContactProvider = () => {
	console.log("Contact provider action here");
};

  const handleSubmitAnswers = async () => {
    try {
      const response = await apiService.submitSurvey(
        selectedFocusArea ?? "",
        selectedAnswers,
      );
      setDiagnosisResult({
        diagnosis: response.diagnosis,
        description: response.description,
        exercises: response.exercises,
      });
      setIsModalVisible(false);
    } catch (error) {
      console.error("Error submitting answers: ", error);
    }
  };

  const handleNext = () => {
    const questionsForPage = surveyState.questions.slice(
      currentPage * 5,
      (currentPage + 1) * 5,
    );
    const allAnswered = questionsForPage.every(
      (question) => selectedAnswers[question.id] !== undefined,
    );

    if (!allAnswered) {
      Alert.alert(
        "Advarsel",
        "Vennligst svar på alle spørsmålene før du går videre.",
      );
      setUnansweredHighlight(true);
      return;
    }

    const nextPage = currentPage + 1;
    if (nextPage < Math.ceil(surveyState.questions.length / 5)) {
      setCurrentPage(nextPage);
    } else {
      handleSubmitAnswers();
    }
  };

  const renderQuestionsForPage = () => {
    const questionsForPage = surveyState.questions.slice(
      currentPage * 5,
      (currentPage + 1) * 5,
    );
    return questionsForPage.map((question) => (
      <View
        key={question.id}
        style={[
          styles.questionContainer,
          unansweredHighlight && selectedAnswers[question.id] === undefined && styles.unansweredQuestion,
        ]}
      >
        <Text style={styles.questionText}>{question.question}</Text>
        {question.type === "singleChoice" && (
          <View
            style={
              question.options.length === 2
                ? styles.horizontalOptionsContainer
                : styles.verticalOptionsContainer
            }
          >
            {question.options.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.optionButton,
                  selectedAnswers[question.id] === option && styles.selectedOption,
                ]}
                onPress={() => handleAnswerChange(question.id, option)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAnswers[question.id] === option && styles.selectedOptionText,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {question.type === "slider" && (
          <CustomSlider
            value={Number(selectedAnswers[question.id]) || question.minValue}
            onValueChange={(value) => handleAnswerChange(question.id, value)}
            maximumValue={question.maxValue}
            minimumValue={question.minValue}
            title={question.title}
          />
        )}
      </View>
    ));
  };

return (
	<View style={styles.container}>
	  <BodyChart
		bodySide={bodySide}
		onAreaPress={handleAreaPress}
		toggleBodySide={() => setBodySide(bodySide === "front" ? "back" : "front")}
	  />
	  <CustomModal
		visible={isModalVisible}
		onClose={() => setIsModalVisible(false)}
		style={styles.modalView}
	  >
		<View style={styles.modalHeader}>
		  <Text style={styles.modalTitle}>{selectedFocusArea || "Velg område"}</Text>
		  <Text style={styles.pageInfo}>Side {currentPage + 1} av {Math.ceil(surveyState.questions.length / 5)}</Text>
		</View>
		<ScrollView>
		  <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
			{renderQuestionsForPage()}
		  </KeyboardAvoidingView>
		</ScrollView>
		<CustomButton
		  title={currentPage === Math.ceil(surveyState.questions.length / 5) - 1 ? "Bekreft" : "Neste"}
		  onPress={handleNext}
		/>
	  </CustomModal>
	  {diagnosisResult && (
		<CustomModal
		  visible={true}
		  onClose={() => setDiagnosisResult(null)}
		  style={styles.modalView}
		>
		  <Text style={styles.diagnosisTitle}>{diagnosisResult.diagnosis}</Text>
		  <Text style={styles.diagnosisText}>
			{diagnosisResult.description}
		  </Text>
		  <CustomButton
			title="Kontakt behandler"
			onPress={handleContactProvider}
		  />
		  <CustomButton
			title="Vis anbefalte øvelser"
			onPress={() => navigation.navigate("ExerciseScreen", {
			  recommendedExercises: diagnosisResult.exercises,
			})}
		  />
		</CustomModal>
	  )}
	</View>
	
  );
};

export default FocusScreen;

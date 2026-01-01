import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Platform,
  StatusBar,
  Image,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from './PracticeQuizScreen.style';
import { 
  fetchPracticeQuestions, 
  submitNodeCompletion,
} from '../services/practiceService';

const INITIAL_HEARTS = 5; // Hearts per session, bukan dari database

export default function PracticeQuizScreen({ navigation, route }) {
  const { userId, sectionId, nodeId, xpReward } = route.params;

  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedWords, setSelectedWords] = useState([]);
  const [availableWords, setAvailableWords] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [hearts, setHearts] = useState(INITIAL_HEARTS);

  const shakeAnimation = useState(new Animated.Value(0))[0];

  useEffect(() => {
    loadData();
  }, [nodeId]);

  const loadData = async () => {
    try {
      setLoading(true);
      const questionsData = await fetchPracticeQuestions(nodeId);
      
      setQuestions(questionsData);
      setHearts(INITIAL_HEARTS); // Reset hearts setiap mulai quiz baru
      
      if (questionsData.length > 0) {
        loadQuestion(questionsData[0]);
      }
    } catch (error) {
      console.error('Error loading questions:', error);
      Alert.alert('Error', error?.message || 'Gagal memuat soal');
      navigation.goBack();
    } finally {
      setLoading(false);
    }
  };

  const loadQuestion = (question) => {
    // Parse available_words as array
    const words = question.available_words || [];
    const shuffled = [...words].sort(() => Math.random() - 0.5);
    setAvailableWords(shuffled);
    setSelectedWords([]);
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;

  const handleWordPress = (word, fromSelected = false) => {
    if (showResult) return;

    if (fromSelected) {
      // Remove from selected, add back to available
      setSelectedWords(prev => prev.filter(w => w !== word));
      setAvailableWords(prev => [...prev, word]);
    } else {
      // Add to selected, remove from available
      setSelectedWords(prev => [...prev, word]);
      setAvailableWords(prev => prev.filter(w => w !== word));
    }
  };

  const triggerShake = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver: true }),
    ]).start();
  };

  const handleCheck = () => {
    if (selectedWords.length === 0) return;

    const userAnswer = selectedWords.join(' ');
    const correctAnswer = Array.isArray(currentQuestion.correct_answer) 
      ? currentQuestion.correct_answer.join(' ')
      : currentQuestion.correct_answer;
    
    const correct = userAnswer.toLowerCase().trim() === correctAnswer.toLowerCase().trim();

    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCorrectCount(prev => prev + 1);
    } else {
      triggerShake();
      
      // Decrease hearts (per-session logic)
      const newHearts = hearts - 1;
      setHearts(newHearts);

      if (newHearts <= 0) {
        // No more hearts - end practice, NO XP
        setTimeout(() => {
          Alert.alert(
            '😢 No more hearts!',
            'Practice ended. You need to restart this stage.',
            [
              {
                text: 'OK',
                onPress: () => navigation.goBack(),
              },
            ]
          );
        }, 1500);
        return;
      }
    }
  };

  const handleNext = () => {
    setShowResult(false);
    setSelectedWords([]);
    
    if (isCorrect) {
      // Jika benar, lanjut ke soal berikutnya
      if (currentIndex < questions.length - 1) {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        loadQuestion(questions[nextIndex]);
      } else {
        // Sudah soal terakhir, submit results
        handleSubmit();
      }
    } else {
      // Jika salah, ulangi soal yang sama (shuffle ulang words)
      loadQuestion(currentQuestion);
    }
  };

  const handleSubmit = async () => {
    try {
      // Hanya submit jika semua benar (correctCount === questions.length)
      if (correctCount !== questions.length) {
        Alert.alert('Incomplete', 'You must answer all questions correctly to complete this stage.');
        return;
      }

      const score = 100; // Perfect score karena semua benar
      
      const result = await submitNodeCompletion(
        userId,
        sectionId,
        nodeId,
        score,
        xpReward
      );

      let message = `Perfect! You got all ${questions.length} questions correct!`;
      
      if (result.xpGained > 0) {
        message += `\n\n✨ +${result.xpGained} XP earned!`;
      }

      if (result.currentStreak > 0) {
        message += `\n🔥 Current Streak: ${result.currentStreak} days!`;
      }
      
      if (result.leveledUp) {
        message += `\n\n🎉 Level Up! You are now level ${result.newLevel}!`;
      }

      Alert.alert('Stage Complete! 🎉', message, [
        {
          text: 'Continue',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error submitting practice:', error);
      Alert.alert('Error', error?.message || 'Gagal submit hasil');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0B3C5D" />
        </View>
      </SafeAreaView>
    );
  }

  if (!currentQuestion) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loadingContainer}>
          <Text style={styles.errorText}>No questions available</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.backLink}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const STATUSBAR_HEIGHT = Platform.OS === 'android' ? StatusBar.currentHeight || 24 : 20;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.container, { paddingTop: STATUSBAR_HEIGHT }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={28} color="#0B3C5D" />
          </TouchableOpacity>

          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          <View style={styles.heartsContainer}>
            <Ionicons name="heart" size={20} color="#ef4444" />
            <Text style={styles.heartsText}>{hearts}</Text>
          </View>
        </View>

        {/* Question */}
        <View style={styles.content}>
          <View style={styles.questionContainer}>
            <Text style={styles.questionTitle}>{currentQuestion.instruction || 'Translate to English'}</Text>
            
            <View style={styles.beeSection}>
              <Image 
                source={require('../assets/bee2.png')} 
                style={styles.beeImageLarge}
                resizeMode="contain"
              />
              <View style={styles.speechBubble}>
                {currentQuestion.audio_url && (
                  <View style={styles.audioIcon}>
                    <Ionicons name="volume-medium" size={20} color="#0ea5e9" />
                  </View>
                )}
                <Text style={styles.questionText}>{currentQuestion.sentence}</Text>
              </View>
            </View>
          </View>

          <Text style={styles.instructionText}>Drag words here to translate:</Text>

          {/* Selected Words Area */}
          <Animated.View style={[
            styles.selectedWordsContainer,
            { transform: [{ translateX: shakeAnimation }] }
          ]}>
            {selectedWords.length > 0 ? (
              selectedWords.map((word, index) => (
                <TouchableOpacity
                  key={`selected-${index}`}
                  style={styles.wordButton}
                  onPress={() => handleWordPress(word, true)}
                  disabled={showResult}
                >
                  <Text style={styles.wordButtonText}>{word}</Text>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptySelectedArea} />
            )}
          </Animated.View>

          {/* Available Words */}
          <View style={styles.availableWordsContainer}>
            {availableWords.map((word, index) => (
              <TouchableOpacity
                key={`available-${index}`}
                style={[styles.wordButton, styles.wordButtonAvailable]}
                onPress={() => handleWordPress(word, false)}
                disabled={showResult}
              >
                <Text style={styles.wordButtonText}>{word}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Result Feedback */}
        {showResult && (
          <View style={[styles.resultBar, isCorrect ? styles.resultBarCorrect : styles.resultBarIncorrect]}>
            <View style={styles.resultContent}>
              <Ionicons 
                name={isCorrect ? "checkmark-circle" : "close-circle"} 
                size={32} 
                color="#ffffff" 
              />
              <Text style={styles.resultText}>
                {isCorrect 
                  ? 'Correct! Great job!' 
                  : `Incorrect. Try again! Correct answer: ${
                      Array.isArray(currentQuestion.correct_answer) 
                        ? currentQuestion.correct_answer.join(' ')
                        : currentQuestion.correct_answer
                    }`
                }
              </Text>
            </View>
          </View>
        )}

        {/* Footer Buttons */}
        {!showResult ? (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.skipButton}
              onPress={() => {
                Alert.alert('Skip', 'Skip is not allowed in this mode');
              }}
              disabled
            >
              <Text style={[styles.skipButtonText, { opacity: 0.3 }]}>Skip</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.checkButton, selectedWords.length === 0 && styles.checkButtonDisabled]}
              onPress={handleCheck}
              disabled={selectedWords.length === 0 || hearts <= 0}
            >
              <Text style={styles.checkButtonText}>Check</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleNext}
            >
              <Text style={styles.continueButtonText}>
                {isCorrect ? 'Continue' : 'Try Again'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

import Lodash from 'lodash'
import AppStatus from '../services/appStatus'

class StepController {
  constructor() {

  }



    getQuizzCompletedIndex(quizzes, json) {
    var step = 0;
    if (json != null) {
      var quiz_id = json[0].quiz_id;
      quizzes.map((quiz, i) => {
        if (Lodash.isEqual(quiz_id, quiz.quiz_id)) {
          step = i + 1;
        }
      });
    }
    var appStatus = (new AppStatus).get();
    appStatus.step = step;
    (new AppStatus).set(appStatus);
    return step;
  }
}

export default StepController

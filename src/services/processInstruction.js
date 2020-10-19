const pbsToExercises = {
  snatch: [
    "Snatch",
    "Power Snatch",
    "Hang Snatch",
    "High Hang Snatch",
    "Hang Snatch Below Knee",
    "Hang Power Snatch Below Knee",
    "Hang Snatch Just Off the Floor",
    "Hang Power Snatch",
    "Block Snatch",
    "Low Block Snatch",
    "Block Power Snatch",
    "Low Block Power Snatch",
    "Muscle Snatch",
    "Deficit Snatch",
    "Snatch Balance",
    "Overhead Squat",
    "Snatch Pull",
    "Snatch Deadlift",
    "Block Snatch Pull",
    "Snatch Romanian Deadlift",
    "Snatch Push Press",
    "3 Position Snatch",
    "3 position snatch (High Hang, Below Knee, Floor)",
    "2 Position Snatch",
    "Pause Snatch",
    "Snatch Pull + Snatch",
    "Snatch + Overhead Squat",
    "Snatch Push Press + Overhead Squat",
    "Deficit Snatch Pull",
    "Snatch Panda Pull",
  ],
  clean: [
    "Clean",
    "Power Clean",
    "Hang Clean",
    "High Hang Clean",
    "Hang Snatch Below Knee",
    "Hang Clean Just Off the Floor",
    "Hang Power Clean",
    "Hang Power Clean Below Knee",
    "Block Clean",
    "Low Block Clean",
    "Block Power Clean",
    "Low Block Power Clean",
    "Muscle Clean",
    "Deficit Clean",
    "Clean Pull",
    "Clean Deadlift",
    "Block Clean Pull",
    "Clean Romanian Deadlift",
    "3 Position Clean",
    "2 Position Snatch",
    "Pause Clean",
    "Clean Pull + Clean",
    "Clean + Front Squat",
    "Deficit Clean Pull",
    "Power Clean + Push Press",
  ],
  jerk: [
    "Jerk",
    "Split Jerk",
    "Power Jerk",
    "Front Squat + Jerk",
    "Power Jerk + Split Jerk", //FIXME: how to deal with "+", some exercises are combos, some are not on the standard list. Maybe he should be able to update the list/add remove items from the list
  ],
  cleanAndJerk: [
    "Clean + Jerk",
    "Clean + Front Squat + Jerk",
    "Power Clean + Split Jerk",
    "Power Clean + Power Jerk",
    "Clean and Jerk",
  ],
  backSquat: [
    "Back Squat",
    "Pause Back Squat",
    "Good Morning",
    "Barbell Back Squat Jumps",
  ],
  frontSquat: ["Front Squat", "Pause Front Squat"],
  pushPress: ["Push Press"],
  RPEorRIR: [
    "Pushups",
    "Pullups",
    "Back Extension",
    "Situps",
    "Cable Row",
    "Bench Press",
    "Box Jumps",
    "Bent Over Barbell Row",
    "Pendlay Row",
    "Barbell Bicep Curl",
    "Dips",
    "Barbell Strict Press",
    "Lu Xiaojun Raise",
    "Bent Over Plate Rear Delt Flye",
    "Abs (your choice)",
    "Hanging Knee/Leg Raise",
    "Calf Raise",
    "1-Arm Dumbbell Row",
    "Bulgarian Split Squat",
    "Seated Barbell Press",
    "Seated Dumbbell Press",
  ],
}

function getMatchedPbValue(exerciseName, pbs) {
  const matchedPb = Object.keys(pbsToExercises).filter((k) => {
    //console.log(exercise)
    return pbsToExercises[k]
      .map((exerciseName) => exerciseName.toLowerCase())
      .includes(exerciseName.toLowerCase().replace("optional: ", ""))
  })[0]
  return pbs[matchedPb]
}

function calculateRealWeight(str, pb) {
  function parsePercent(str, pb) {
    const elements = str.split("-").filter((str) => str !== "")
    const result = elements
      .map((str) => {
        const percent = Math.abs(parseInt(str))
        return ((percent * pb) / 100).toFixed() + "kg"
      })
      .join("-")
    return `${result} (${str})`
  }

  const result = str
    .split(" ")
    .map((part) => {
      if (part.indexOf("%") > -1) {
        return parsePercent(part, pb)
      } else {
        return part
      }
    })
    .join(" ")

  console.log(result)
  return result
}

export function processInstruction({ exerciseName, instruction }, pbs) {
  const matchedPbValue = getMatchedPbValue(exerciseName, pbs)
  //convert to % if there's a matched PB, otherwise return the instruction
  return matchedPbValue
    ? calculateRealWeight(instruction, matchedPbValue)
    : instruction
}

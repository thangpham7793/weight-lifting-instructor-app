import XLSX from "xlsx"

function parseRows(buffer) {
  const workbook = XLSX.read(buffer, {
    type: "buffer",
  })

  const rows = []

  workbook.SheetNames.forEach(function (sheetName) {
    //which is actually an array of rows
    const XL_row_object = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName])
    rows.push(...XL_row_object)
  })

  return { rows, weekCount: workbook.SheetNames.length }
}

function makeTimeTable(exercisesArr) {
  const aggregate = {}

  function getWeekDayPair(exercisesArr) {
    let prevPair = [0, 0]
    return exercisesArr.reduce((pairs, { week, day }) => {
      if (prevPair[0] !== week || prevPair[1] !== day) {
        prevPair = [week, day]
        pairs.push([week, day])
      }
      return pairs
    }, [])
  }

  function extractDailyExercises(w, d) {
    exercisesArr
      .filter(({ week, day }) => week === w && day === d)
      .reduce((acc, { exerciseName, instruction }) => {
        //initialise prop week if not exist
        if (acc[`week ${w}`] === undefined) {
          acc[`week ${w}`] = {}
        }

        //initialise prop day of week if not exist
        if (acc[`week ${w}`][`day ${d}`] === undefined) {
          acc[`week ${w}`][`day ${d}`] = []
        }

        //push obj to proper week and day
        acc[`week ${w}`][`day ${d}`].push({ exerciseName, instruction })

        return acc
      }, aggregate)
  }

  getWeekDayPair(exercisesArr).forEach((dayInWeek) =>
    extractDailyExercises(dayInWeek[0], dayInWeek[1])
  )
  return aggregate
}

export function makeSchedulePayload(
  buffer,
  programmeIds,
  scheduleName,
  isNew = true,
  scheduleId = null
) {
  //if a file is uploaded
  if (buffer) {
    const { rows, weekCount } = parseRows(buffer)
    const timetable = makeTimeTable(rows)
    //a new schedule
    if (isNew) {
      return {
        timetable,
        weekCount,
        scheduleName,
        programmeIds,
      }
      //reposting the schedule
    } else {
      return {
        scheduleId,
        scheduleName,
        weekCount,
        timetable,
      }
    }
    //if no file is uploaded, meaning there's a name change
  } else {
    return {
      scheduleId,
      scheduleName,
    }
  }
}

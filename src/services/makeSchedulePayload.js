import XLSX from "xlsx"

function parseRows(data) {
  const workbook = XLSX.read(data, {
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
  data,
  programmeIds,
  scheduleName,
  isNew = true,
  scheduleId = null
) {
  const { rows, weekCount } = parseRows(data)
  const timetable = makeTimeTable(rows)
  let payload
  if (isNew) {
    payload = {
      timetable,
      weekCount,
      scheduleName,
      programmeIds,
    }
  } else {
    payload = {
      timetable,
      weekCount,
      scheduleId,
    }
  }
  return payload
}

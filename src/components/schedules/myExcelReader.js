import XLSX from "xlsx"
import fetchService from "../../services/http"

export class myExcelReader {
  constructor(programmeId) {
    this.reader = new FileReader()
    this.reader.makeTimeTable = function (exercisesArr) {
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
          .reduce((acc, { exercise, instruction }) => {
            //initialise prop week if not exist
            if (acc[`week ${w}`] === undefined) {
              acc[`week ${w}`] = {}
            }

            //initialise prop day of week if not exist
            if (acc[`week ${w}`][`day ${d}`] === undefined) {
              acc[`week ${w}`][`day ${d}`] = []
            }

            //push obj to proper week and day
            acc[`week ${w}`][`day ${d}`].push({ exercise, instruction })

            return acc
          }, aggregate)
      }

      getWeekDayPair(exercisesArr).forEach((dayInWeek) =>
        extractDailyExercises(dayInWeek[0], dayInWeek[1])
      )
      return aggregate
    }
    this.reader.programmeId = programmeId
    this.reader.onload = async function (event) {
      //console.log(this.programmeId)
      const data = event.target.result
      const workbook = XLSX.read(data, {
        type: "binary",
      })

      const payload = {
        scheduleName: "",
        timetable: "",
        programmeId: this.programmeId,
        weekCount: 0,
      }

      const rows = []

      workbook.SheetNames.forEach(function (sheetName) {
        //which is actually an array of rows
        const XL_row_object = XLSX.utils.sheet_to_json(
          workbook.Sheets[sheetName]
        )

        //programmeName here
        payload.scheduleName = sheetName
        rows.push(...XL_row_object)
      })

      payload.timetable = this.makeTimeTable(rows)

      document.getElementById("jsonObject").innerHTML = JSON.stringify(
        payload,
        null,
        4
      )

      payload.weekCount = Math.max.apply(
        null,
        Object.keys(payload.timetable).map((week) => {
          return parseInt(week.substring(week.length - 1))
        })
      )

      //TODO: need to calculate weekCount
      //TODO: need to weed out undefined row
      const success = await fetchService.postNewSchedule(payload)
      console.log(success)
    }
    this.reader.onerror = function (event) {
      console.error("File could not be read! Code " + event.target.error.code)
    }
  }
}
